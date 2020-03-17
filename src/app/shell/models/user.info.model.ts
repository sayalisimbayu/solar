export class UserInfo {
  id: number;
  usid: number;
  firstname: string;
  lastname: string;
  gender: boolean;
  mobile: string;
  social: string;
  birthdate: Date;
  addresslinE1: string;
  addresslinE2: string;
  city: string;
  ustate: string;
  countrycode: string;
}

export class UserInfoPage {
  userInfos: UserInfo[];
  totalCount: number;
}