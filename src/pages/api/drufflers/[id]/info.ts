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
  const drufflerId = req.query.id;
  const endPoint = `/drufflers/${drufflerId}/info`;

  return nextApiHttpMethodHandler(req, res, ["PUT"], async () => {
    try {
      switch (req.method) {
        case "PUT":
          const updateItem: AxiosResponse = await apiConnection(req, res).put(
            endPoint,
            req.body,
          );
          makeNextApiResponse(res, updateItem);
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
