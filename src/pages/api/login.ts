import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "@/common/middlewares/iron-session";
import axios, { AxiosResponse } from "axios";
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
    const response = await axios.post(
      process.env.NEXT_PUBLIC_HOST_DRUFFLE_API + "/api/v1/token/administrative/exchange",
      req.body,
    );

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
      res.send(response.data);
    }

    res.send({ isLogin: true });
  } catch (error: any) {
    console.log(error);
    errorsService.captureException(error);
    res.send({ isLogin: false });
  }
};

export default withIronSessionApiRoute(handler);
