import { Survey } from "../../lib/types"
import { postSurveyService } from "../services/surveys"
import { Request, Response } from "express"

export async function postSurvey(req : Request, res : Response) {
    const { industry, id, old_salary, new_salary, apprenticeship_grade } : any = req.body
    const survey = { industry, id, old_salary, new_salary, apprenticeship_grade }
    await postSurveyService(survey)
    res.status(201).send("Survey was successfully saved :)")
}