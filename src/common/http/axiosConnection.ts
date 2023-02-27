import axios from "axios";
import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { GetServerSidePropsContext } from "next";
import { refreshAccessToken } from "@/api/refresh-access-token";
import jwt from "jsonwebtoken";

export const createServiceConnection = (
  req: GetServerSidePropsContext["req"],
  res: GetServerSidePropsContext["res"],
  baseURL: string | undefined,
  prefix = "",
) => {
  if (!baseURL) {
    throw new Error("Missing service API URL");
  }

  const session = req.session.auth;
  const token = req.session.auth?.access_token ?? "";
  const user_agent = req.headers["user-agent"];

  const connection: AxiosInstance = axios.create({
    baseURL: `${baseURL}${prefix}`,
  });

  connection.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      // @ts-ignore
      if (!config.sent) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${token}`,
        };
      }

      config.headers = {
        ...config.headers,
        "User-Agent": user_agent ?? "",
      };

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  connection.interceptors.response.use(
    async (response: AxiosResponse) => {
      return await response;
    },
    async (error: AxiosError) => {
      const originalConfig = error?.config as AxiosRequestConfig & {
        sent: boolean;
      };
      console.error(
        "\x1b[31m%s\x1b[0m\x1b[33m%s\x1b[0m",
        `[DRUFFLE] Response - `,
        ` ${error.response?.status} - ${error.config?.baseURL}${error.config?.url} `,
      );
      const payload = jwt.decode(session.access_token as string) as TokenPayloadType;
      const experation = payload ? new Date(payload.exp * 1000) <= new Date() : false;
      // console.log("\x1b[31m%s\x1b[0m\x1b[33m%s\x1b[0m", "[DRUFFLE] Experation - ", experation);

      if (
        error.response &&
        (error.response?.status === 401 || experation) &&
        !originalConfig?.sent
      ) {
        originalConfig.sent = true;

        const refresh = await refreshAccessToken(req, res);

        originalConfig.headers = {
          ...originalConfig.headers,
          authorization: `Bearer ${refresh?.access_token}`,
        };

        return await connection(originalConfig);
      }

      // console.log(
      //   "\x1b[31m%s\x1b[0m\x1b[33m%s\x1b[0m",
      //   "[DRUFFLE] ERROR - ",
      //   `${error.response?.status} - ${error.config?.baseURL}${
      //     error.config?.url
      //     // @ts-ignore
      //   } - ${JSON.stringify(error.response?.data.error)}`,
      // );

      return Promise.reject(error);
    },
  );

  return connection;
};

export const createNextApiConnection = () => {
  const connection: AxiosInstance = axios.create({
    baseURL: process.env.BASE_URL ? `${process.env.BASE_URL}/api` : "/api",
  });

  return connection;
};
