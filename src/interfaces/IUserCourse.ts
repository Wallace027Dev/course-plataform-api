import { IUser } from "./IUser";

export interface IUserCourse {
  userId: number;
  courseId: number;
  user: IUser;
}
