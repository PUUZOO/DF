import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosResponse } from "axios";
import jwt from "jsonwebtoken";
import { withIronSessionApiRoute } from "@/common/middlewares/iron-session";
import { errorsService } from "@/common/services/errors-service";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = req.body.token;
    console.log("token -> ", token);
    const response = await axios.post(
      process.env.NEXT_PUBLIC_HOST_DRUFFLE_API + "/api/v1/admins/pwd",
      { password: req.body.password },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    console.log({ Authorization: `Bearer ${token}` });

    console.log(response);

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

// type Role = "druffler" | "admin";

// type JWTPayload = {
//   user: string;
//   role: Role;
//   exp: number;
// };

// enum Roles {
//   "DRUFFLER" = "druffler",
//   "ADMIN" = "admin",
// }

// const handler2 = (req: NextApiRequest, res: NextApiResponse) => {
//   const { body } = req;

// console.log('req.headers :', req.headers)
// console.log("req.body :", req.body);
// console.log('guestToken :', guestToken)

// console.log("api");

// try {
// const tokensResponse = await fetch(`${process.env.BASE_URL}/api/v1/admins/pwd`, {
//   body: JSON.stringify({
//     password
//   }),
//   headers: {
//     'Content-Type': 'application/json',
//     Cookie: serialize('access_token', guestToken, {
//           path: '/',
//         }),
//   },
//   credentials:'same-origin',
//   method: 'POST',
// })

// const newHeaders = {...req.headers,
//   Cookie: serialize('access_token', guestToken, {
//   path: '/',
// })}

// console.log("req.headers :", req.headers);
// console.log("BODY -> ", body);

// const response = await AdminsService.setPwdApiV1AdminsPwdPost(body, req.headers);
// console.log(response);

// const { access_token: accessToken, refresh_token: refreshToken } =
// await AdminsService.setPwdApiV1AdminsPwdPost(body, req.headers);

// console.log("api res", accessToken);
// res.setHeader("Set-Cookie", [
//   serialize("access_token", accessToken, {
//     path: "/",
//   }),
//   serialize("refresh_token", refreshToken, {
//     path: "/",
//   }),
// ]);

// const { role } = decodeJwt(accessToken) as JWTPayload

// switch (role) {
//   case Roles.DRUFFLER:
//     console.log('redirect')
//     res.redirect(301, './druffler/accounts')
//     break;
//   case Roles.ADMIN:
//     // TODO придумать куда редиректить
//     // res.redirect('./druffler/accounts')
//     break;

//   default:
//     // TODO выбрасывать ошибку, если нет такой роли
//     break;
// }

//   res.send({ setPassword: true });
// } catch (

// { response: { status, data } }
// ) {
// Send status (probably 401) so the axios interceptor can run.
//     console.error("error", e);
//     res.status(500).send(e);
//   }
// };
