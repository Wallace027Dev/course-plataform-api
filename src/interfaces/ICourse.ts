import { IJourney } from "./IJourney";
import { IUser } from "./IUser";
import { IUserCourse } from "./IUserCourse";

export interface ICourseBase {
  name: string;
  description: string;
  coverUrl: string;
}

export interface ICourse extends ICourseBase {
  id: number;
  journeys?: IJourney[];
  userCourses?: IUserCourse[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IUserCourseWithUser {
  user: IUser;
}

export interface ICourseWithStudents extends ICourseBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  userCourses: IUser[];
}

export interface ICourseUpdate extends Partial<ICourse> {}
