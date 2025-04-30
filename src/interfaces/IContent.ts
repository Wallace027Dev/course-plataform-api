import { JsonValue } from '@prisma/client/runtime/library';
import { IUserProgress } from "./IUserProgress";

export interface IContentBase {
  journeyId: number;
  type: string;
  title: string;
  order: number;
  metadata: JsonValue;
  quizId: number | null;
}

export interface IContent extends IContentBase {
  id: number;
  progress?: IUserProgress[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
