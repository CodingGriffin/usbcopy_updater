export type HubType = 'customer' | 'vendor';

export type TabType = 'orders' | 'contacts' | 'addresses';

export type FileItemType = {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified?: string;
  hidden?: boolean;
  aiRecommendation?: {
    type: 'rename' | 'delete';
    newName?: string;
  };
};

export interface OrderJob {
  id: string;
  version: number;
  section: 'packaging' | 'artwork' | 'data';
  type: 'setup' | 'upload' | 'view' | 'approve' | 'approve-sample' | 'approve-live';
  title: string;
  status?: 'pending' | 'approved' | 'rejected';
}

export interface Order {
  id: string;
  job_number: string;
  status: 'active' | 'completed' | 'on-hold';
  createdAt: string;
  jobs: OrderJob[];
  productName?: string;
  productConfig?: string;
  productImage?: string;
}

export type ArtworkManagerItemType = {
  id: string;
  name: string;
  type: 'file';
  size?: string;
  modified?: string;
  hidden?: boolean;
  printLocation?: string;
  comment?: string;
  aiRecommendation?: {
    type: 'rename' | 'delete';
    newName?: string;
  };
};

export type Contact = {
  contact_id: number;
  contact_name: string;
  emails: string;
  phone_numbers: string;
  enabled: boolean;
}

export type Address = {
  address_id: number;
  address_street1: string;
  address_city: string;
  address_state: string;
  address_code: string;
}

export interface VersionsContext {
  selectedOrderData: any,
  selectedSection: 'packaging' | 'artwork' | 'data' | 'shipments' | null;
  setSelectedStep: (step: number) => void;
}

export type stepStatus = {
  setup: ['v-upload-nudge'],
  upload: ['v-upload-wait', 'v-proof-rejected', 'v-proof-rejected-production'],
  proof: ['v-upload-receive', 'v-proof-sent', 'v-proof-nudge', 'v-production-photo-sample-rejected'],
  photoSample: ['v-proof-approved', 'v-sample-sent', 'v-production-live-sample-rejected'],
  liveSample: ['v-sample-sent', 'v-production-photo-sample-approved', 'v-production-live-sample-proof-sent']

    // v-production-nudge
    // v-production-live-sample-approved
    // v-production-proof-approved
    // v-proof-rejected-production
}

export const STEP_STATUS = {
  setup: ['start'],
  upload: ['v-upload-wait', 'v-proof-rejected', 'v-proof-rejected-production'],
  proof: ['v-upload-receive', 'v-upload-nudge', 'v-proof-sent', 'v-production-photo-sample-rejected'],
  photoSample: ['v-send-thanks', 'v-proof-approved', 'v-proof-nudge', 'v-sample-sent', 'v-production-live-sample-rejected'],
  liveSample: ['v-sample-sent', 'v-production-photo-sample-approved', 'v-production-live-sample-proof-sent']
} as const;

export const PHOTOSAMPLE_STATUS = {
  'v-sample-sent': 'SENT',
  'v-photo-sample-received': 'PHOTO SAMPLE RECEIVED',
  'v-production-photo-sample-approved': 'PHOTO SAMPLE APPROVED',
  'v-production-photo-sample-rejected': 'PHOTO SAMPLE REJECTED',
} as const;

export const SAMPLE_STATUS = {
  'v-production-live-sample-proof-sent': 'SENT',
  'v-live-sample-shipped': 'SHIPPED',
  'v-live-sample-received': 'RECEIVED',
  'v-production-live-sample-approved': 'APPROVED',
  'v-production-live-sample-rejected': 'REJECTED'
} as const;

export const PRODUCTION_STATUS = {
  'v-production-proof-approved': 'APPROVED',
  'v-proof-rejected-production': 'REJECTED'
} as const;
