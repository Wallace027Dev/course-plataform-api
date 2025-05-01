export interface IResultBase {
  feedback: string;
  score: number;
  attemptId: number;
}

export interface IResult extends IResultBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IResultUpdate extends Partial<IResult> {}
