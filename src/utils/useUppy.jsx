import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus'
import Box from '@uppy/box';
import OneDrive from '@uppy/onedrive';
import GoogleDrive from '@uppy/google-drive';
import Dropbox from '@uppy/dropbox';
import actions from "../states/PhotoSamples/actions";

import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'

const endPoint= "https://everyusb.click/s3-uploads"
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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const {orderId, version_id, section} = useParams();
  
  // Get entity_name and version_name from Redux state
  const { order } = useSelector((state) => state.orders);
  const entityName = order?.data?.entities?.[0]?.entity_name || '';
  
  // Find the version name that matches the current version_id
  const versionName = order?.data?.versions?.find(
    version => version.version_id === parseInt(version_id)
  )?.version_name || '';

  const versionNumber = order?.data?.versions?.find(
    version => version.version_id === parseInt(version_id)
  )?.version_number || '';

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
        let files = [];
        const padType = section === 'data' ? 'data' : section === 'artwork' ? 'artw' : 'pack';
        const fileAddedHandler = (file) => {
          console.log("Added file name: ", file.name, file.meta.relativePath);
          
          // Replace spaces with underscores in filename, entityName and versionName
          const sanitizedFileName = file.name.replace(/\s+/g, '_');
          const sanitizedEntityName = entityName.replace(/\s+/g, '_');
          const sanitizedVersionName = versionName.replace(/\s+/g, '_');
          
          // Set metadata for the file
          uppy.setFileMeta(file.id, {
            orderId: orderId,
            versionName: sanitizedVersionName, // Use version_name instead of version_id
            section: padType,
            uploadBy: 'vendor',
            type: 'samples',
            relativePath: file.meta.relativePath,
            filename: sanitizedFileName,
            filetype: file.type,
            entityName: sanitizedEntityName
          });
        };

        const uploadSuccessHandler = (file, response) => {
          console.log('Upload successful:', file.name);
          console.log('Tus response:', response);
          const sanitizedFileName = file.name.replace(/\s+/g, '_');
          const sanitizedEntityName = entityName.replace(/\s+/g, '_');
          const sanitizedVersionName = versionName.replace(/\s+/g, '_');
          
          const fileUrl = response.uploadURL;
          files.push({
            name: file.name, 
            file_path: `${sanitizedEntityName}/${orderId}/${sanitizedVersionName}/${padType}/samples/${sanitizedFileName}`,
          });
          console.log('File URL:', fileUrl);
        };

        const completeHandler = (result) => {
          const successResults = result.successful;
          const resource_id = queryParams.get('resource_id');
          console.log("uploading completed============>", files);
          
          // Check if we're on vendor/*/samples route
          const pathParts = location.pathname.split('/');
          const isVendorRoute = pathParts[1] === 'vendor';
          const isSamplesRoute = pathParts[pathParts.length - 1] === 'samples';
          
          if (isVendorRoute && version_id) {
            dispatch({
              type: actions.ADD_SAMPLES,
              payload: {
                mode: "insertSamples",
                jobs_id: orderId, // Adjust this based on how you want to get the job number
                versions_id: version_id,
                resource_id: resource_id,
                pads_type: padType,
                files: files,
                version_number: versionNumber
              }
            });

            dispatch({
              type: actions.GET_SAMPLES,
              payload: {
                mode: "getPhotoSamples",
                jobs_id: orderId,
                versions_id: version_id,
                pads_type: padType,
              }
            });
          }
          
          files = [];
        };

        const uploadErrorHandler = (file, error, response) => {
          console.error('Upload error:', file.name, error);
          console.error('S3 response:', response);
        };
    
        uppy.on('file-added', fileAddedHandler);
        // uppy.on('file-removed', fileRemovedHandler);
        uppy.on('upload-success', uploadSuccessHandler);
        // uppy.on('upload-error', uploadErrorHandler);
        uppy.on('complete', completeHandler);
    
        return () => {
          uppy.off('upload-success', uploadSuccessHandler);
          uppy.off('file-added', fileAddedHandler);
          // uppy.off('file-removed', fileRemovedHandler);
          // uppy.off('upload-error', uploadErrorHandler);
          uppy.off('complete', completeHandler);
          uppy.clear();
        };
      }, [location, dispatch, version_id, section, entityName, versionName]); // Add versionName to dependencies

    return { uppy, files };
  // })
}
