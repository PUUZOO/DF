import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "@/common/middlewares/iron-session";
import { apiConnection } from "@/common/http";
import { errorsService } from "@/common/services/errors-service";
import jwt from "jsonwebtoken";

// type Role = "druffler" | "admin";

// type JWTPayload = {
//   user: string;
//   role: Role;
//   exp: number;
// };

// enum Roles {
//   "DRUFFLER" = "druffler",
//   "ADMIN" = "admin",
//   "USER" = "user"
// }

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await apiConnection(req, res).post("/token/administrative/exchange", req.body);

    if (response.status === 200) {
      const payload = jwt.decode(response.data.access_token as string) as TokenPayloadType;

      req.session.auth = {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
      };

      req.session.user = {
        role: payload.role,
        user: payload.user,
      };
      await req.session.save();
    } else {
      throw false;
    }

    res.send({ isLogin: true });
  } catch (error: any) {
    console.log(error);
    errorsService.captureException(error);
    res.send({ isLogin: false });
  }
};

export default withIronSessionApiRoute(handler);
