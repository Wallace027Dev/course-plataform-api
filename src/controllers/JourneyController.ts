import { Request, Response } from "express";
import { HttpResponse } from "../helper/HttpResponse";
import { JourneyService } from "../services/JourneyService";
import { validateCreateJourney } from "../schemas/JourneySchema";

export class JourneyController {
  static async listAllJourneys(req: Request, res: Response): Promise<any> {
    const name = req.query.name as string | undefined;

    const courses = await JourneyService.listJourneys(name as string);
    if (courses?.length === 0) return HttpResponse.notFound(res, "Journeys not found");

    return HttpResponse.ok(res, "Journeys found", courses);
  }

  static async listJourneysOfCourse(req: Request, res: Response): Promise<any> {
    const courseId = parseInt(req.params.courseId, 10);
    if (!courseId) return HttpResponse.badRequest(res, "Invalid course ID");

    const journeys = await JourneyService.listJourneysOfCourse(courseId as number);
    if (journeys?.length === 0) return HttpResponse.notFound(res, "Journeys not found");

    return HttpResponse.ok(res, "Journeys found", journeys);
  }

  static async getJourneyById(req: Request, res: Response): Promise<any> {
    const journeyId = parseInt(req.params.id, 10);
    if (!journeyId) return HttpResponse.badRequest(res, "Invalid journey ID");

    const journey = await JourneyService.getJourneyById(journeyId);
    if (!journey) return HttpResponse.notFound(res, "Journey not found");

    return HttpResponse.ok(res, "Journey found", journey);
  }

  static async storeJourneyOnCourse(req: Request, res: Response): Promise<any> {
    const data = req.body;

    const isInvalid = validateCreateJourney(data);
    if (isInvalid) return HttpResponse.badRequest(res, "Invalid data", isInvalid);

    const journey = await JourneyService.createJourney(data);

    return HttpResponse.created(res, "User registered", journey);
  }

  static async updateJourney(req: Request, res: Response): Promise<any> {
    const id = parseInt(req.params.id, 10);
    if (!id) return HttpResponse.badRequest(res, "Invalid ID");

    const data = req.body;

    const isInvalid = validateCreateJourney(data);
    if (isInvalid) return HttpResponse.badRequest(res, "Invalid data", isInvalid);

    const journey = await JourneyService.updateJourney(id as number, data);

    return HttpResponse.ok(res, "Journey updated", journey);
  }

  static deleteJourney(req: Request, res: Response) {
    throw new Error("Method not implemented.");
  }
}
