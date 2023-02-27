import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

export const errorsService = {
  captureException: (error: Error | any) => {
    console.log("######################");
    console.error("Status code -> ", error.response?.status);
    console.error("Method -> ", error?.response?.method);
    console.error("Request url -> ", error.request?.res?.responseUrl);
    console.error("Error data -> ", error.response?.data);
    console.log("######################");
  },
};

export const serverErrorOnClient = (e: any) => {
  if (e?.response?.data?.detail) toast.warn(e.response.data.detail);
};
