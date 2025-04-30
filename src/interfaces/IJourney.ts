import { IContent } from "./IContent";

export interface IJourneyBase {
  name: string;
  courseId: number;
  coverUrl: string;
}

export interface IJourney extends IJourneyBase {
  id: number;
  contents?: IContent[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IJourneyUpdate extends Partial<IJourney> {}
