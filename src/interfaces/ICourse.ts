import { IJourney } from "./IJourney";
import { IUserCourse } from "./IUserCourse";

export interface ICourseBase {
  name: string;
  description: string;
  coverUrl: string;
  journeys:    IJourney[];
  userCourses: IUserCourse[];
}

export interface ICourse extends ICourseBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ICourseUpdate extends Partial<ICourse> {}
