import { Survey } from "../../lib/types";
import {
  getSurveyService,
  getSurveysService,
  postSurveyService,
  putSurveyService,
} from "../services/surveys";
import { Request, Response } from "express";

export async function postSurvey(req: Request, res: Response) {
  const { industry, id, old_salary, new_salary, apprenticeship_grade }: Survey =
    req.body;
  const survey = { industry, id, old_salary, new_salary, apprenticeship_grade };
  const result = await postSurveyService(survey);
  res.status(201).json(result.insertedId);
}

export async function getSurveys(req: Request, res: Response) {
  const surveys = await getSurveysService();
  res.status(200).json(surveys);
}

export async function getSurvey(req: Request, res: Response) {
  const id = req.params.id;
  const survey = await getSurveyService(id);
  res.status(200).json(survey);
}

export async function putSurvey(req: Request, res: Response) {
  const paramId = req.params.id;
  const { industry, id, old_salary, new_salary, apprenticeship_grade }: Survey =
    req.body;
  const newSurvey = {
    industry,
    id,
    old_salary,
    new_salary,
    apprenticeship_grade,
  };
  const survey = await putSurveyService(paramId, newSurvey);
  res.status(200).json(survey);
}
