import { IContent } from "./IContent";

export interface IJourneyBase {
  name: string;
  courseId: number;
  coverUrl: string;
  contents?: IContent[];
}

export interface IJourney extends IJourneyBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
