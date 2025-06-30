import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus'
import Box from '@uppy/box';
import OneDrive from '@uppy/onedrive';
import GoogleDrive from '@uppy/google-drive';
import Dropbox from '@uppy/dropbox';

import actions from "../states/UsbCopyUpdates/actions";

import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'

const endPoint= "http://localhost:3000/usbcopypro-s3-uploads"
const companionUrl = "http://localhost:3020/companion";

function serializeSubPart(key, value) {
  if (typeof value !== 'object') {
    return [[key, value]]
  }
  
  if (Array.isArray(value)) {
    return value.flatMap(val => serializeSubPart(`${key}[]`, val))
  }
  
  return Object.entries(value).flatMap(([subkey, val]) => 
    serializeSubPart(key ? `${key}[${subkey}]` : subkey, val)
  )
}

function serialize(data) {
  return new URLSearchParams(serializeSubPart(null, data))
}

export default function useUppy() {
  
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orders);
  const entityName = order?.data?.entities?.[0]?.entity_name || '';
  const job = order?.data?.job;
  const url = new URL(window.location.href);
    
    // Use URLSearchParams to get the parameter value
  const osType = url.searchParams.get('os_type');
  const verNum = url.searchParams.get('ver_num');
  // Get entity_name and version_name from Redux state
  
  // Find the version name that matches the current version_id

  const uppy = new Uppy({
    id: 'uppy',
    autoProceed: false,
    debug: true,
    restrictions: {
      maxFileSize: 10 * 1024 * 1024 * 1024, // 1GB
      maxNumberOfFiles: null,
      allowedFileTypes: null // allow all file types
    }
  })

  uppy
      .use(Tus, { 
        endpoint: endPoint, 
        retryDelays: [0, 1000, 3000, 5000], 
        chunkSize: 5 * 1024 * 1024,
      })
      .use(Box, {
        companionUrl: companionUrl,
        companionAllowedHosts: ['.*'],
      })
      .use(OneDrive, {
        companionUrl: companionUrl,
        companionAllowedHosts: ['.*'],
      })
      .use(GoogleDrive, {
        companionUrl: companionUrl,
        companionAllowedHosts: ['.*'],
      })
      .use(Dropbox, {
        companionUrl: companionUrl,
        companionAllowedHosts: ['.*'],      
      })
      // .use(Webcam)
      // .use(ScreenCapture)

      useEffect(() => {
        let file_url = "";
        const fileAddedHandler = (file) => {
          console.log("Added file name: ", file.name, file.meta.relativePath);
          const sanitizedEntityName = entityName.replace(/\s+/g, '_');
          const sanitizedFileName = file.name.replace(/\s+/g, '_');
          uppy.setFileMeta(file.id, {
            entityName: sanitizedEntityName,
            osType: osType,
            verNum: verNum,
            filename: sanitizedFileName,
            filetype: file.type,
          });
        };

        const uploadSuccessHandler = (file, response) => {
          console.log('Upload successful:', file.name);
          console.log('Response:', response);
          const sanitizedEntityName = entityName.replace(/\s+/g, '_');
          const sanitizedFileName = file.name.replace(/\s+/g, '_');
          file_url = `https://usbcopypro.s3.amazonaws.com/${sanitizedEntityName}/V${verNum}/${osType}/${sanitizedFileName}`;
          object_key = `${sanitizedEntityName}/V${verNum}/${osType}/${sanitizedFileName}`       
          // const fileUrl = response.uploadURL;
          // setFiles(prev => [...prev, {name: file.name, url: fileUrl}]);
        };

        const uploadErrorHandler = (file, error, response) => {
          console.error('Upload error:', file.name, error);
          console.error('Response:', response);
        };

        const completeHandler = async(result) => {

          await dispatch({
            type: actions.ADD_UPDATE,
            payload: {
              mode: "insertUpdates",
              job_num: job?.job_number, // Adjust this based on how you want to get the job number
              ver_num: verNum,
              os_type: osType,
              object_key: object_key,
            }
          });

          await dispatch({
            type: actions.GET_UPDATES,
            payload: {
              mode: "getUpdates",
              job_num: job?.job_number,
              ver_num: verNum,
              os_type: osType,
            }
          });
          console.log('Upload complete! We have uploaded these files:', result);
        };

        uppy.on('file-added', fileAddedHandler);
        uppy.on('upload-success', uploadSuccessHandler);
        uppy.on('upload-error', uploadErrorHandler);
        uppy.on('complete', completeHandler);

        return () => {
          uppy.off('file-added', fileAddedHandler);
          uppy.off('upload-success', uploadSuccessHandler);
          uppy.off('upload-error', uploadErrorHandler);
          uppy.off('complete', completeHandler);
          uppy.clear();
        };
      }, []); // Add versionName to dependencies

    return { uppy, files };
  // })
}
