import Uppy from '@uppy/core';

interface ReferenceJob {
  _id: string;
  job_num: string;
  ver_num: string;
}

interface UppyHookResult {
  uppy: Uppy;
  files: Array<{name: string, url: string}>;
}

declare function useUppy(referenceJobs?: ReferenceJob[]): UppyHookResult;

export default useUppy;