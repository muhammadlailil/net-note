import Database from "@/libs/Database";
import Response from "@/libs/Response";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
     req: NextApiRequest,
     res: NextApiResponse<any>
) {
     const DB = new Database().project()
     const { uuid } = req.query
     const project = await DB.table('projects').where('uuid', uuid).first();
     if(project)  return new Response(res).data(project)
     return new Response(res).error('not found',404)
}