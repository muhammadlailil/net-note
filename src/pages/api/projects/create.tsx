// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Database from '@/libs/Database'
import DateTime from '@/libs/DateTime'
import String from '@/libs/String'
import Response from '@/libs/Response'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const response = new Response(res)
  if (req.method == 'POST') {
    let result: any = null
    try {
      const { title, description, id } = req.body
      const DB = new Database().project()

      const data = {
        title,
        description,
      }
      if (id) {
        await DB.table('projects').where('id', id).update(data)
      } else {
        const database = new String().slug(`${title}-notes`)
        const uuid = new String().uuid()
        new Database().createNotesDb(database)
        await DB.table('projects').insert({
          ...data,
          ...{
            user_id: null,
            created_at: new DateTime().format('yyyy-MM-dd hh:mm:ss'),
            uuid: uuid,
            database: database
          }
        })
        result = {
          uuid
        }
      }

    } catch (errs) {
      console.log(errs)
    }
    return response.data(result);
  }
  return response.error('not found', 404);
}
