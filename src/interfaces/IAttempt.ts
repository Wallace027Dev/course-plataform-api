import { IResult } from "./IResult";

export interface IAttemptBase {
  userId: number;
  quizId: number;
}

export interface IAttempt extends IAttemptBase {
  id: number;
  result?: IResult;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IAttemptUpdate extends Partial<IAttempt> {}
