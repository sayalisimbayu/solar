export interface ICGridConfig {
  items: any[];
  isCheckbox: boolean;
  functions: {
    onDelete: Function;
    onSelect: Function;
  };
}
