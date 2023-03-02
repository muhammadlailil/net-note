import Database from "@/libs/Database";
import Response from "@/libs/Response";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
     req: NextApiRequest,
     res: NextApiResponse<any>
) {
     const { search } = req.query
     const DB = new Database().project()
     const result = await DB.table('projects').where(function (q) {
          q.where('title', 'like', `%${search || ''}%`)
               .where('description', 'like', `%${search || ''}%`)
     }).orderBy('id', 'desc');

     return new Response(res).data(result)
}