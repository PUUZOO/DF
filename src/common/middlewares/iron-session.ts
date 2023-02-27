import {
  NextApiHandler,
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiRequest,
  NextApiResponse,
} from "next";

import {
  withIronSessionSsr as withIronSessionSsrNative,
  withIronSessionApiRoute as withIronSessionApiRouteNative,
} from "iron-session/next";
// import type { IronSession } from "iron-session";
import { getIronSession as getIronSessionNative } from "iron-session";
import * as http from "http";

export const sessionOptions = {
  cookieName: "druffle",
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// withIronSessionSsr
export const withIronSessionSsr = <
  P extends {
    [key: string]: unknown;
  } = {
    [key: string]: unknown;
  },
>(
  handler: (
    context: GetServerSidePropsContext,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) => withIronSessionSsrNative(handler, sessionOptions);

// withIronSessionApiRoute
export const withIronSessionApiRoute = (handler: NextApiHandler) =>
  withIronSessionApiRouteNative(handler, sessionOptions);

// getIronSession
export const getIronSession = (
  req: http.IncomingMessage | Request,
  res: http.ServerResponse | Response,
) => getIronSessionNative(req, res, sessionOptions);

declare module "iron-session" {
  interface IronSessionData {
    auth: {
      access_token?: string;
      refresh_token?: string;
    };
    user: {
      role: RoleType;
      user: string;
    };
  }
}
