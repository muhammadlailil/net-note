// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Database from '@/libs/Database'
import DateTime from '@/libs/DateTime'
import Response from '@/libs/Response'

export default async function handler(
     req: NextApiRequest,
     res: NextApiResponse<any>
) {
     const response = new Response(res)
     if (req.method == 'POST') {
          try {
               const { database } = req.query
               const { title, description, tag, uuid, id } = req.body
               const DB: any = new Database().connect(database)

               if (DB) {
                    const data = {
                         title,
                         description,
                         tag,
                         project_uuid: uuid
                    }
                    if (id) {
                         await DB.table('project_notes').where('id', id).update(data)
                    } else {
                         await DB.table('project_notes').insert({
                              ...data,
                              ...{
                                   user_id: null,
                                   created_at: new DateTime().format('yyyy-MM-dd hh:mm:ss'),
                              }
                         })
                    }
               }

          } catch (errs) {
               console.log(errs)
          }
          return response.message('success');
     }
     return response.error('not found', 404);
}
