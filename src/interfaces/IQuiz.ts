import { IAttempt } from "./IAttempt";
import { IContent } from "./IContent";
import { IQuestion } from "./IQuestion";

export interface IQuizBase {
  name: string;
  questions: IQuestion[];
}

export interface IQuiz extends IQuizBase {
  id: number;
  attempts: IAttempt[];
  content?: IContent;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IQuizUpdate extends Partial<IQuiz> {}
