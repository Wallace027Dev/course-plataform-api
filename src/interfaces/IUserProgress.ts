export interface IUserProgressBase {
  userId: number;
  contentId: number;
  completedAt: Date;
}

export interface IUserProgress extends IUserProgressBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
