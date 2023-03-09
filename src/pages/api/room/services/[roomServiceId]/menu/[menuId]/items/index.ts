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
  const { roomServiceId, menuId } = req.query;
  const endPoint = `/room/services/${roomServiceId}/menu/${menuId}/items`;

  return nextApiHttpMethodHandler(req, res, ["GET"], async () => {
    try {
      const getItems: AxiosResponse = await apiConnection(req, res).get(endPoint);
      makeNextApiResponse(res, getItems);
    } catch (error) {
      errorsService.captureException(error);
      makeNextApiErrorResponse(res, error);
    }
  });
}

export default withIronSessionApiRoute(handler);
