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
  const adminId = req.query.id;
  const endPoint = `/admins/${adminId}/pwd`;

  return nextApiHttpMethodHandler(req, res, ["PUT"], async () => {
    try {
      switch (req.method) {
        case "PUT":
          const updateAdmin: AxiosResponse = await apiConnection(req, res).put(
            endPoint,
            req.body,
          );

          // TODO перепроверить, когда заработает логин под админом 
          if (updateAdmin.status === 200) {
            console.log('updateAdmin.data :', updateAdmin.data)
            const {access_token, refresh_token} = updateAdmin.data

            req.session.auth.access_token = access_token
            req.session.auth.refresh_token = refresh_token
            req.session.save()
          }
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
