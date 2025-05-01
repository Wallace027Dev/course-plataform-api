import { IUser } from "./IUser";

export interface IUserCourseBase {
  userId: number;
  courseId: number;
}

export interface IUserCourse {
  user: IUser;
}
