import { IAnswer } from "./IAnswer";

export interface IQuestionBase {
  question: string;
  explication: string;
  quizId: number;
  answers: IAnswer[];
}

export interface IQuestion extends IQuestionBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IQuestionUpdate extends Partial<IQuestion> {}
