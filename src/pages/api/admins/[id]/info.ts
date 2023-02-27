import type { NextApiRequest, NextApiResponse } from "next";
import { apiConnection } from "@/common/http";
import {
  makeNextApiErrorResponse,
  makeNextApiResponse,
  nextApiHttpMethodHandler,
} from "@/common/http/httpTools";
import { errorsService } from "@/common/services/errors-service";
import { withIronSessionApiRoute } from "@/common/middlewares/iron-session";
import { AxiosResponse } from 'axios';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  return nextApiHttpMethodHandler(req, res, ["GET", "PUT"], async () => {
    try {
      switch (req.method) {
        case "GET":
          const admin: AxiosResponse = await apiConnection(req, res).get(
            `/admins/${req.query.id}/info`,
          );
          makeNextApiResponse(res, admin);
          break;

        case "PUT":
          const updateAdmin: AxiosResponse = await apiConnection(req, res).put(
            `/admins/${req.query.id}/info`,
            req.body,
          );
          makeNextApiResponse(res, updateAdmin);
          break;

        default:
          throw new Error(`not implemented handler for ${req.method} method`);
      }
    } catch (error) {
      errorsService.captureException(error);
      makeNextApiErrorResponse(res, error);
    }
  });
}

export default withIronSessionApiRoute(handler);
