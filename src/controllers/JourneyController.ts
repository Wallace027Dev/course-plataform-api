import { Request, Response } from "express";
import { HttpResponse } from "../helper/HttpResponse";
import { JourneyService } from "../services/JourneyService";
import { validateCreateJourney } from "../schemas/JourneySchema";

export class JourneyController {
  static async listJourneysOfCourse(req: Request, res: Response): Promise<any> {
    try {
      const name = req.query.name as string | undefined;

      const courses = await JourneyService.listJourneys(name as string);
      if (courses?.length === 0) return HttpResponse.notFound(res, "Journeys not found");

      return HttpResponse.ok(res, "Journeys found", courses);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while listing journeys",
        error.message
      );
    }
  }

  static async getJourneyById(req: Request, res: Response): Promise<any> {
    try {
      const journeyId = parseInt(req.params.journeyId, 10);
      if (!journeyId) return HttpResponse.badRequest(res, "Invalid journey ID");

      const journey = await JourneyService.getJourneyById(journeyId);
      if (!journey) return HttpResponse.notFound(res, "Journey not found");

      return HttpResponse.ok(res, "Journey found", journey);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while getting journey",
        error.message
      );
    }
  }

  static async storeJourneyOnCourse(req: Request, res: Response): Promise<any> {
    try {
      const data = req.body;

      const isInvalid = validateCreateJourney(data);
      if (isInvalid) return HttpResponse.badRequest(res, "Invalid data", isInvalid);

      const journey = await JourneyService.createJourney(data);

      return HttpResponse.created(res, "User registered", journey);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while registering journey",
        error.message
      );
    }
  }

  static async updateJourney(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.journeyId, 10);
      if (!id) return HttpResponse.badRequest(res, "Invalid ID");

      const data = req.body;

      const isInvalid = validateCreateJourney(data);
      if (isInvalid) return HttpResponse.badRequest(res, "Invalid data", isInvalid);

      const journey = await JourneyService.updateJourney(id as number, data);

      return HttpResponse.ok(res, "Journey updated", journey);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while updating journey",
        error.message
      );
    }
  }
}
