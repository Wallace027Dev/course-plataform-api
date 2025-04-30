import { IUserProgress } from "./IUserProgress";

export interface IContentBase {
  journeyId: number;
  type: string;
  title: string;
  order: number;
  metadata: JSON;
  quizId?: number;
  progress: IUserProgress[];
}

export interface IContent extends IContentBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
