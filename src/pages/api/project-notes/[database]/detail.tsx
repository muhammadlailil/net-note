import Database from "@/libs/Database";
import Response from "@/libs/Response";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
     req: NextApiRequest,
     res: NextApiResponse<any>
) {
     const { database, category } = req.query
     let result: any = []
     try {
          const DB: any = new Database().connect(database)
          const { id } = req.query
          result = await DB.table('project_notes').where('tag', category).where('id', id).first();
     } catch (err) { }
     return new Response(res).data(result)
}