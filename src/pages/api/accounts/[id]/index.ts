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
  return nextApiHttpMethodHandler(req, res, ["GET", "PUT", "DELETE"], async () => {
    const { id: accountId } = req.query

    try {
      switch (req.method) {
        case "GET":
          const getItems: AxiosResponse = await apiConnection(req, res).get(
            `/accounts/${accountId}`,
          );
          makeNextApiResponse(res, getItems);
          break;

        case "PUT":
          const updateItem: AxiosResponse = await apiConnection(req, res).put(
            `/accounts/${accountId}`,
            req.body,
          );
          makeNextApiResponse(res, updateItem);
          break;

        case "DELETE":
          const deleteItem: AxiosResponse = await apiConnection(req, res).delete(
            `/accounts/${accountId}`,
            req.body,
          );
          makeNextApiResponse(res, deleteItem);
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
