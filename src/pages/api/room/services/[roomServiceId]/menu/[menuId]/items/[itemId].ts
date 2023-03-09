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
  const { roomServiceId, menuId, itemId } = req.query;
  const endPoint = `/room/services/${roomServiceId}/menu/${menuId}/items/${itemId}`;

  return nextApiHttpMethodHandler(req, res, ["PUT", "DELETE"], async () => {
    try {
      switch (req.method) {
        case "PUT":
          const updateItems: AxiosResponse = await apiConnection(req, res).put(endPoint, req.body);
          makeNextApiResponse(res, updateItems);
          break;

        case "DELETE":
          const removeItems: AxiosResponse = await apiConnection(req, res).delete(
            endPoint,
            req.body,
          );

          makeNextApiResponse(res, removeItems);
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
