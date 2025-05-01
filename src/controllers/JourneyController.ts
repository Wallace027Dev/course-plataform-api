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

      const validate = validateCreateJourney(data);
      if (validate) return HttpResponse.badRequest(res, "Invalid data", validate);

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
}
