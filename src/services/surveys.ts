import { ObjectId } from "mongodb";
import { Survey } from "../../lib/types";
import { col } from "../app";

export async function postSurveyService(survey: Survey) {
    const result = await col.insertOne( survey );
    if (!result) {
        return new Error("Oh no!");
    }
    return result;
}

export async function getSurveysService(params : any) {
    let result;
    if (params.grade && params.industry) {
        result = (await col.find({apprenticeship_grade : params.grade, industry: params.industry}, { projection: { _id: 0}}).toArray()) as Survey[];
    }
    else if (params.grade) {
        result = (await col.find({apprenticeship_grade : params.grade}, { projection: { _id: 0}}).toArray()) as Survey[];
    }
    else if (params.industry){
        result = (await col.find({industry: params.industry}, { projection: { _id: 0}}).toArray()) as Survey[];
    }
    else {
        result = (await col.find({}, { projection: { _id: 0}}).toArray()) as Survey[];
    }
    if (!result) {
        return new Error("No surveys found :(");
    }
    return result;
}

export async function getSalaryAverageService(query: any) {
    let pipeline = new Array;
    if (query.industry) {
        pipeline = [
            {
                $match: {
                    industry: query.industry
                }
            },
            {
                $group: {
                    _id: null,
                    average_new_salary: { $avg: '$new_salary' },
                },
            },
            {
                $project: {
                    _id: 0, 
                    average_new_salary: { $round: ['$average_new_salary', 2] },
                },
            },
        ];
    }
    else {
        pipeline = [
            {
                $group: {
                    _id: null,
                    average_new_salary: { $avg: '$new_salary' },
                },
            },
            {
                $project: {
                    _id: 0, 
                    average_new_salary: { $round: ['$average_new_salary', 2] },
                },
            },
        ];
    }


    let result = await col.aggregate(pipeline).next();
    result = result.average_new_salary
    return result;
}

export async function getSurveyService(id: string) {
    const query = { _id: new ObjectId(id)  };
    const result = (await col.findOne(query, { projection: { _id: 0}})) as Survey;
    console.log(result)
    if (result === null) {
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

export async function deleteSurveyService(id: string) {
    const query = { _id: new ObjectId(id) };
    const result = await col.deleteOne(query);
    if (!result) {
        return new Error(`Delete request failed :(`);
    }
    return result;
}