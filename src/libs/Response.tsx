import { NextApiResponse } from "next"

export default class Response {
     res: NextApiResponse<any>
     constructor(res: NextApiResponse<any>) {
          this.res = res
     }
     data(data: any) {
          return this.res.json(data)
     }
     message(message: string) {
          return this.res.json({ message: message })
     }

     error(message: string, code: number = 401) {
          return this.res.status(code).json({ message: message })
     }
}