import { IUserProgress } from "./IUserProgress";
import { Prisma } from '@prisma/client';

export interface IContentBase {
  journeyId: number;
  type: string;
  title: string;
  order: number;
  metadata: Prisma.JsonValue;
  quizId: number | null;
}

export interface IContent extends IContentBase {
  id: number;
  progress?: IUserProgress[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IContentUpdate extends Partial<IContent> {}