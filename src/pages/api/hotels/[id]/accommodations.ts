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
  return nextApiHttpMethodHandler(req, res, ["GET", "POST", "PUT"], async () => {
    try {
      switch (req.method) {
        case "GET":
          const accommodation: AxiosResponse = await apiConnection(req, res).get(
            `/hotels/${req.query.id}/accommodations`,
          );
          makeNextApiResponse(res, accommodation);
          break;

        case "POST":
          const createdAccommodation: AxiosResponse = await apiConnection(req, res).post(
            `/hotels/${req.query.id}/accommodations`,
            req.body,
          );
          makeNextApiResponse(res, createdAccommodation);
          break;

        case "PUT":
          const updateAccommodation: AxiosResponse = await apiConnection(req, res).put(
            `/hotels/${req.query.id}/accommodations`,
            req.body,
          );
          makeNextApiResponse(res, updateAccommodation);
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
