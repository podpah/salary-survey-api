import { Survey } from "../../lib/types"
import { col } from "../app"

export async function postSurveyService(survey : Survey) {
    const result = await col.insertOne({survey})
    console.log(result);
    if (!result) {
        return new Error("Oh no!")
    }
    return result
}

export async function getSurveys() {
    const result = await col.find({},{"_id":0})
    if (!result) {
        return new Error("No surveys found :(")
    }
    return result
}