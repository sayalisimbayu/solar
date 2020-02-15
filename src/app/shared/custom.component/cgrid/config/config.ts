export interface ICGridConfig {
  itemMap: ICGridComponentConfig;
  itemMapDescription: ICGridComponentConfig;
  items: any[];
  page: ICPageConfig;
  isCheckbox?: boolean;
  isDelete?: boolean;
  gridHeight?: string;
  functions?: {
    onDelete?: Function;
    onSelect?: Function;
    onScroll?: Function;
  };
}

export interface ICGridComponentConfig {
  heading: string;
  subHeading: string;
  description: string;
}

export interface ICPageConfig {
  pagesize: number;
  currentPage: number;
  throttle: number;
  scrollDistance: number;
  scrollUpDistance: number;
}
