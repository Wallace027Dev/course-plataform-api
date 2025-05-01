import { IAnswer } from "./IAnswer";

export interface IQuestionBase {
  question: string;
  explication: string;
  quizId: number;
}

export interface IQuestion extends IQuestionBase {
  id: number;
  answers: IAnswer[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IQuestionUpdate extends Partial<IQuestion> {}
