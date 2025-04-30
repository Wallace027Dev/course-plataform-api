import { IJourney } from "./IJourney";
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

export interface ICourseUpdate extends Partial<ICourse> {}
