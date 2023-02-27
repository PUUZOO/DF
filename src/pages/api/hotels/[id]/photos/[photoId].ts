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
  return nextApiHttpMethodHandler(req, res, ["PUT", "DELETE"], async () => {
    try {
      switch (req.method) {
        case "PUT":
          const updatePhotos: AxiosResponse = await apiConnection(req, res).put(
            `/hotels/${req.query.id}/photos/${req.query.photoId}`,
            req.body,
          );
          makeNextApiResponse(res, updatePhotos);
          break;

        case "DELETE":
          const deletePhotos: AxiosResponse = await apiConnection(req, res).delete(
            `/hotels/${req.query.id}/photos/${req.query.photoId}`,
          );
          makeNextApiResponse(res, deletePhotos);
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
