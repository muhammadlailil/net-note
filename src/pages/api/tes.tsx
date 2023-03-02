import Database from "@/libs/Database";
import DateTime from "@/libs/DateTime";
import String from "@/libs/String";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
     req: NextApiRequest,
     res: NextApiResponse<any>
) {
     // const date = new DateTime().format('yyyy-MMM-dd hh:mm:ss')
     // const date = new DateTime('2022-01-03').indo()
     const date = new String().uuid()
     res.send(date)
}