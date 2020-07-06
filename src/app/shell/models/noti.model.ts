export interface INotificationPaged {
  notifications: INotification[];
  totalCount: number;
}
export interface INotification {
  id: number;
  type: string;
  message: string;
  flag: boolean;
  status: string; // info, primary, warning
  userId: number;
  createdDate: string;
  updatedDate: string;
  isTemporary: boolean;
  isRead: boolean;
  isDeleted: boolean;
  // class: string;
}
