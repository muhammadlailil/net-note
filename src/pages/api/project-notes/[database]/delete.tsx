import Database from "@/libs/Database";
import Response from "@/libs/Response";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
     req: NextApiRequest,
     res: NextApiResponse<any>
) {
     const response = new Response(res)
     if (req.method == 'POST') {
          try {
               const { database } = req.query
               const { id } = req.body
               const DB: any = new Database().connect(database)
               if (DB) {
                    await DB.table('project_notes').where('id', id).delete();
                    return response.message('success')
               }
          } catch (err) {
               return response.message('error');
          }
     }
     return response.error('not found', 404)
}