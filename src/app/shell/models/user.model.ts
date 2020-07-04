export interface AppPermission {
  id: number;
  appuserid: number;
  mode: string;
  alias: string;
  value: number;
  appsettingid: number;
  permission: number;
  notificationid: number;
}
export interface User {
  fullName: string;
  email: string;
  displayname: string;
  username: string;
  id: number;
  isdeleted: boolean;
  otp: string;
  password: string;
  permissions: AppPermission[];
  lastLoggin: string;
  confirmPassword: string;
  notificationid: number;
}
export interface RegisterUser {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
}

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  displayname: string;
  site: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  startProvince: string;
  permissions: AppPermission[];
  country: string;
}

export interface UserPage{
  users: User[];
  totalCount: number;
}