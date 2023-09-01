import { PageInfo } from "../globals";

export interface ContactAddressDetails {
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  country: string;
  zipcode: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  active: boolean;
  address: ContactAddressDetails;
}

export interface GetAllContactParams {
  limit?: number;
  offset?: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  gender?: string;
  dateOfBirth?: string;
  active?: boolean;
}

export type GetAllContactArguments = {
  params?: Partial<GetAllContactParams>;
};

export interface ContactState {
  data: Contact[];
  editData: Contact | null;
  pageInfo: PageInfo;
  params: GetAllContactParams;
  loading: string;
  message: string | null;
  currentRequestId: string | null;
}

export interface GetAllContactsResponse {
  data: Contact[];
  count: number;
  error: any;
}

export interface ContactFormData {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  active: boolean;
  addressLineOne: string;
  addressLineTwo?: string;
  city: string;
  country: string;
  zipcode: string;
}

export interface CreateContactResponse {
  status: number;
  message: string;
  data: Contact & { address: ContactAddressDetails };
}

export interface UpdateContactResponse {
  error: null;
  message: string;
  data: Contact & { address: ContactAddressDetails };
}

export interface DeleteContactResponse {
  error: null;
  message: string;
  data?: {};
}
