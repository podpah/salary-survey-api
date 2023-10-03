import { ObjectId } from "mongodb";
import { Survey } from "../../lib/types";
import { col } from "../app";

export async function postSurveyService(survey: Survey) {
  const result = await col.insertOne({ survey });
  if (!result) {
    return new Error("Oh no!");
  }
  return result;
}

export async function getSurveysService() {
  const result = (await col.find({}, { _id: 0 }).toArray()) as Survey[];
  if (!result) {
    return new Error("No surveys found :(");
  }
  return result;
}

export async function getSurveyService(id: string) {
  const query = { _id: new ObjectId(id) };
  const result = (await col.findOne(query)) as Survey;
  if (!result) {
    return new Error(`No survey found with Id: ${id} :(`);
  }
  return result;
}

export async function putSurveyService(id: string, updatedSurvey: Survey) {
  const query = { _id: new ObjectId(id) };
  const result = await col.updateOne(query, {
    $set: { survey: updatedSurvey },
  });
  if (!result) {
    return new Error(`Put request failed :(`);
  }
  return result;
}
