import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "@/common/middlewares/iron-session";

export const destroyToken = (req: NextApiRequest, res: NextApiResponse) => {
  req.session.destroy();
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  destroyToken(req, res);
  return res.status(200).end();
}

export default withIronSessionApiRoute(handler);
