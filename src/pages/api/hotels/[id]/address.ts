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
  return nextApiHttpMethodHandler(req, res, ["GET", "POST", "PUT"], async () => {
    try {
      switch (req.method) {
        case "GET":
          const address: AxiosResponse = await apiConnection(req, res).get(
            `/hotels/${req.query.id}/address`,
          );
          makeNextApiResponse(res, address);
          break;

        case "POST":
          const createdAddress: AxiosResponse = await apiConnection(req, res).post(
            `/hotels/${req.query.id}/address`,
            req.body,
          );
          makeNextApiResponse(res, createdAddress);
          break;

        case "PUT":
          const updateAddress: AxiosResponse = await apiConnection(req, res).put(
            `/hotels/${req.query.id}/address`,
            req.body,
          );
          makeNextApiResponse(res, updateAddress);
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
