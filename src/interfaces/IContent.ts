import { IUserProgress } from "./IUserProgress";

export interface ICourseBase {
  journeyId: number;
  type: string;
  title: string;
  order: number;
  metadata: JSON;
  quizId?: number;
  progress: IUserProgress[];
}

export interface ICourse extends ICourseBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
