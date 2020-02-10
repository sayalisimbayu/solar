export interface ICGridConfig {
  items: ICGridComponentConfig[];
  isCheckbox?: boolean;
  isDelete?: boolean;
  functions: {
    onDelete: Function;
    onSelect: Function;
  };
}

export interface ICGridComponentConfig {
  heading: string;
  subHeading: string;
  description: string;
}
