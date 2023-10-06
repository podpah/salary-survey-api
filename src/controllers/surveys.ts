import { RemoveUserOptions } from "mongodb";
import { Survey } from "../../lib/types";
import {
    deleteSurveyService,
    getSurveyService,
    getSurveysService,
    getSalaryAverageService,
    postSurveyService,
    putSurveyService,
} from "../services/surveys";
import { Request, Response } from "express";

export async function postSurvey(req: Request, res: Response) {
    const { industry, old_salary, new_salary, apprenticeship_grade }: Survey = req.body;
    const survey = { industry, old_salary, new_salary, apprenticeship_grade };
    const result = await postSurveyService(survey);
    res.status(201).json(result.insertedId);
}

export async function getSurveys(req: Request, res: Response) {
    const params = req.query
    const surveys = await getSurveysService(params);
    res.status(200).json(surveys);
}

export async function getSurvey(req: Request, res: Response) {
    const id = req.params.id;
    const survey = await getSurveyService(id);
    res.status(200).json(survey);
}

export async function getSalaryAverage(req: Request, res: Response) {
    const avg = await getSalaryAverageService(req.query)
    res.status(200).json(avg)
}

export async function putSurvey(req: Request, res: Response) {
    const paramId = req.params.id;
    const { industry, old_salary, new_salary, apprenticeship_grade }: Survey = req.body;
    const newSurvey = {
        industry,
        old_salary,
        new_salary,
        apprenticeship_grade,
    };
    const survey = await putSurveyService(paramId, newSurvey);
    res.status(200).json(survey);
}

export async function deleteSurvey(req: Request, res: Response) {
    const paramId = req.params.id;
    const survey = await deleteSurveyService(paramId);
    res.status(200).send("Survey successfully deleted")
  }