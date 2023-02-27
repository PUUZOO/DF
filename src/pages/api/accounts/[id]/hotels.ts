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
  return nextApiHttpMethodHandler(req, res, ["GET", "POST"], async () => {
    const { id: accountId } = req.query;

    try {
      switch (req.method) {
        case "GET":
          const getItems: AxiosResponse = await apiConnection(req, res).get(
            `/accounts/${req.query.id}/hotels?skip=${req.query.skip ?? 0}&limit=${
              req.query.limit ?? 50
            }`,
          );
          makeNextApiResponse(res, getItems);
          break;

        case "POST":
          const updateItem: AxiosResponse = await apiConnection(req, res).post(
            `/accounts/${accountId}/hotels`,
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
