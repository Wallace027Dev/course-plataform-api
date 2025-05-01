export interface IAnswerBase {
  text: string;
  correct: boolean;
  questionId: number;
}

export interface IAnswer extends IAnswerBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IAnswerUpdate extends Partial<IAnswer> {}
