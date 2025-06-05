import Uppy from '@uppy/core';

interface UppyHookResult {
  uppy: Uppy;
  files: Array<{name: string, url: string}>;
}

declare function fileUppy(): UppyHookResult;

export default fileUppy;