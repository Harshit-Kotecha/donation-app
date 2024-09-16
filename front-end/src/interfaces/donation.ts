export enum DonationStatus {
  CLOSED = 'closed',
  OPEN = 'open',
  PROCESSING = 'processing',
}

export interface Donation {
  id: number;
  name: string;
  age: number;
  description: string;
  address: string;
  category: string;
  status: DonationStatus;
  images: string;
  expires_at: string;
  email: string;
  phone_number: number;
  pin_code: number;
  postal_name: string;
  region: string;
  district: string;
  state: string;
}
