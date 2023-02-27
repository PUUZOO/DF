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
import FormDataCustom from "form-data";
import { IncomingForm } from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const endPoint = `/hotels/${req.query.id}/photos`;

  return nextApiHttpMethodHandler(req, res, ["GET", "POST"], async () => {
    try {
      switch (req.method) {
        case "GET":
          const photos: AxiosResponse = await apiConnection(req, res).get(endPoint);
          makeNextApiResponse(res, photos);
          break;

        case "POST":
          const data: any = await new Promise((resolve, reject) => {
            const form = new IncomingForm();

            form.parse(req, (err, fields, files) => {
              if (err) return reject(err);
              resolve({ fields, files });
            });
          });

          const formdata = new FormDataCustom();
          const file = data.files.file;
          formdata.append("file", fs.createReadStream(file.filepath), file.originalFilename);

          const response = await apiConnection(req, res).post(endPoint, formdata, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          makeNextApiResponse(res, response);
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
