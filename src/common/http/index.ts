import { NextApiRequest, NextApiResponse, GetServerSidePropsContext } from "next";
import { createNextApiConnection, createServiceConnection } from "./axiosConnection";

export const nextApiConnection = createNextApiConnection();

export const apiConnection = (
  req: GetServerSidePropsContext["req"],
  res: GetServerSidePropsContext["res"],
) => createServiceConnection(req, res, process.env.NEXT_PUBLIC_HOST_DRUFFLE_API, "/api/v1");
