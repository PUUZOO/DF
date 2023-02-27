import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJwt } from "jose";
import { TokenService } from "@/common/fetchClient";

const noToken = [
  "/api/v1/token/administrative/exchange",
  "/api/v1/drufflers/login",
  "/api/v1/token/refresh",
  "/api/v1/token/revoke/all",
];

export async function middleware(req: NextRequest) {
  if (noToken.includes(req.nextUrl.pathname)) {
    const response = NextResponse.next();

    return response;
  }

  let accessToken = req.cookies.get("access_token")?.value as string;

  const accessTokenExpiration = decodeJwt(accessToken)?.exp;

  // eslint-disable-next-line max-len
  const isExpired = accessTokenExpiration
    ? new Date(accessTokenExpiration * 1000) <= new Date()
    : true;

  if (isExpired) {
    const tokens = await TokenService.refreshApiV1TokenRefreshPost({
      refresh_token: req.cookies.get("refresh_token")?.value as string,
    });

    // eslint-disable-next-line max-len
    const { access_token: newAccessToken, refresh_token: refreshToken } = tokens;

    accessToken = newAccessToken;

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("Authorization", `Bearer ${accessToken}`);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    response.cookies.set({
      name: "access_token",
      value: newAccessToken,
      path: "/",
    });

    response.cookies.set({
      name: "refresh_token",
      value: refreshToken,
      path: "/",
    });

    return response;
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("Authorization", `Bearer ${accessToken}`);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}

export const config = {
  matcher: "/api/v1/:slug*",
};
