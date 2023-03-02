import Database from "@/libs/Database";
import Response from "@/libs/Response";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
     req: NextApiRequest,
     res: NextApiResponse<any>
) {
     const response = new Response(res)
     if (req.method == 'POST') {
          const { id } = req.body
          const DB = new Database().project()
          const project = await DB.table('projects').where('id', id).first()
          if (project) {
               await new Database().deleteDatabase(project.database)
               await DB.table('projects').where('id', id).delete();
          }

          return response.message('success')
     }
     return response.error('not found', 404)
}