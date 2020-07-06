import { IPageTitleConfig } from '../../page-title/model/page-title.config.interface';

export interface IPageFrameConfig {
  pageTitle: IPageTitleConfig;
  pageBodyUrl: string;
  pageHeading: string;
  showPageAction: boolean;
  showSearchBar: boolean;
  searchModel?: any[];
  newSearchKeywordEvent?: (event: any) => void;
  defaultPageAction?: IPageActionConfig;
  pageActions?: IPageActionConfig[];
}
export interface IPageActionConfig {
  title: string;
  action: (event: any) => void;
}
