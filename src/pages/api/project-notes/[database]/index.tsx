import Database from "@/libs/Database";
import Response from "@/libs/Response";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
     req: NextApiRequest,
     res: NextApiResponse<any>
) {
     const { database, category, search } = req.query
     let result: any = []
     try {
          const DB: any = new Database().connect(database)
          if (DB) {
               result = await DB.table('project_notes').where('tag', category)
                    .where(function (q:any) {
                         q.where('title', 'like', `%${search || ''}%`)
                              .where('description', 'like', `%${search || ''}%`)
                    })
                    .orderBy('id', 'desc')
          }
     } catch (err) {
          console.log(err)
     }

     return new Response(res).data(result)
}