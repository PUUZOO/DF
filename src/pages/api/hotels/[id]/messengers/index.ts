import type { NextApiRequest, NextApiResponse } from "next";
import { apiConnection } from "@/common/http";
import {
  makeNextApiErrorResponse,
  makeNextApiResponse,
  nextApiHttpMethodHandler,
} from "@/common/http/httpTools";
import { errorsService } from "@/common/services/errors-service";
import { withIronSessionApiRoute } from "@/common/middlewares/iron-session";
import { AxiosResponse } from "axios";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const hotelId = req.query.id;
  const endPoint = `/hotels/${hotelId}/messengers`;

  return nextApiHttpMethodHandler(req, res, ["GET", "PUT", "POST"], async () => {
    try {
      switch (req.method) {
        case "GET":
          const getItems: AxiosResponse = await apiConnection(req, res).get(endPoint);
          makeNextApiResponse(res, getItems);
          break;

        case "PUT":
          const removeItems: AxiosResponse = await apiConnection(req, res).put(endPoint, req.body);
          makeNextApiResponse(res, removeItems);
          break;

        case "POST":
          const ceateItem: AxiosResponse = await apiConnection(req, res).post(endPoint, req.body);
          makeNextApiResponse(res, ceateItem);
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
