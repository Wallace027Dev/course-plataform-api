import { Content } from "@prisma/client";

export interface IJourneyBase {
  name  :    string;
  JourneyId:  number;
  coverUrl:  string;
  contents : Content[];
}

export interface IJourney extends IJourneyBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
