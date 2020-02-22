export interface IPageTitleConfig {
  pageTitle: string;
  breadCrumb: IBreadCrumbConfig[];
  leftComponentUrl: string;
}
export interface IBreadCrumbConfig {
  title: string;
  url: string;
  clickable: boolean;
  callback?: (event: any) => void;
}
