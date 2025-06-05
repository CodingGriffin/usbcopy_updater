import Uppy from '@uppy/core';

interface UppyHookResult {
  uppy: Uppy;
  files: Array<{name: string, url: string}>;
}

declare function useUppy(): UppyHookResult;

export default useUppy;