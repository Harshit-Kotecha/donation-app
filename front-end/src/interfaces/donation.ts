export enum DonationStatus {
  CLOSED = 'closed',
  OPEN = 'open',
  PROCESSING = 'processing',
}

export interface Donation {
  id: number;
  name: string;
  age: number;
  address: string;
  category: string;
  status: DonationStatus;
  images: string;
  expiry_time_in_hours: number;
  phone_number: number;
  pin_code: number;
}
