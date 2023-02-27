import { Axios } from "axios";

declare module "axios" {
  export interface AxiosInstance extends Axios {
    delete<T = any, R = AxiosResponse<T>, D = AxiosResponse<T>, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>,
    ): Promise<R>;
  }
}
