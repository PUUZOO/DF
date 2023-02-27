import { GetServerSidePropsContext } from "next";
import { errorsService } from "@/common/services/errors-service";

export const refreshAccessToken = async (
  req: GetServerSidePropsContext["req"],
  res: GetServerSidePropsContext["res"],
) => {
  const { access_token, refresh_token } = req.session.auth;
  const user_agent = req.headers["user-agent"];

  try {
    console.log("\x1b[31m%s\x1b[0m\x1b[33m%s\x1b[0m", `[DRUFFLE] `, "Token is expired");
    console.log(
      "\x1b[31m%s\x1b[0m\x1b[33m%s\x1b[0m",
      `[DRUFFLE] Before refresh token `,
      `${JSON.stringify({ access_token, refresh_token, user_agent })}`,
    );

    const refreshResponse = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_DRUFFLE_API}/api/v1/token/refresh`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent": user_agent ?? "",
        },
        body: JSON.stringify({ refresh_token }),
      },
    );

    if (refreshResponse?.ok) {
      const refreshResponseData = await refreshResponse.json();

      if (refreshResponseData) {
        const newAccessToken = refreshResponseData.access_token;
        const newRefreshToken = refreshResponseData.refresh_token;

        req.session.auth = {
          ...req.session.auth,
          access_token: newAccessToken,
          refresh_token: newRefreshToken,
        };
        await req.session.save();

        return { access_token: newAccessToken, refresh_token: newRefreshToken };
      } else {
        console.log(
          "\x1b[31m%s\x1b[0m\x1b[33m%s\x1b[0m",
          `[DRUFFLE] ERROR - `,
          `${refreshResponse.status} - ${refreshResponse.url} - ${JSON.stringify(
            refreshResponseData.error,
          )}`,
        );

        return req.session.destroy();
      }
    } else {
      // console.log(
      //   "\x1b[31m%s\x1b[0m\x1b[33m%s\x1b[0m",
      //   `[DRUFFLE] Refresh error - `,
      //   `Status -> ${refreshResponse.status} Error -> ${JSON.stringify(
      //     await refreshResponse.json(),
      //   )}`,
      // );
      return req.session.destroy();
    }
  } catch (error) {
    errorsService.captureException(error);
    return { access_token, refresh_token };
  }
};
