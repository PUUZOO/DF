import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "@/common/middlewares/iron-session";
import { apiConnection } from "@/common/http";
import { errorsService } from "@/common/services/errors-service";

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await apiConnection(req, res).post("/token/revoke", {
      refresh_token: req.session.auth.refresh_token,
    });

    if (response.status === 200) {
      req.session.destroy();
    } else {
      throw false;
    }

    res.status(200).send({ isLogout: true });
  } catch (error: any) {
    console.log(error);
    errorsService.captureException(error);
    res.status(200).send({ isLogout: false });
  }
};

export default withIronSessionApiRoute(logout);
