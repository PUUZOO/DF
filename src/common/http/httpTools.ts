import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

type Responses = {
  [key: number]: () => void;
};

export const handleHttpResponse = (response: AxiosResponse | undefined) => {
  const fallbackErrorStatus = 500;

  const detail = response?.data;
  const responses: Responses = {
    200: () => response?.data,
    201: () => response?.data,
    400: () => ({ message: "Bad Request", ...(detail ?? {}) }),
    401: () => ({ message: "Unauthorized" }),
    403: () => ({ message: "Forbidden" }),
    404: () => ({ message: "Not Found" }),
    405: () => ({ message: "Method Not Allowed" }),
    406: () => ({ message: "Not Acceptable" }),
    408: () => ({ message: "Request Timeout" }),
    422: () => ({ message: "Unprocessable Entity" }),
    500: () => ({ message: "Internal Server Error" }),
  };

  const responseHandler =
    (response && responses[response?.status]) || responses[fallbackErrorStatus];

  return {
    httpResponse: responseHandler(),
    status: response?.status || fallbackErrorStatus,
  };
};

export const makeNextApiResponse = (nextResponse: NextApiResponse, response: AxiosResponse) => {
  const { httpResponse, status } = handleHttpResponse(response);

  nextResponse.status(status).json(httpResponse);
};

export const makeNextApiErrorResponse = (nextResponse: NextApiResponse, error: unknown) => {
  const { httpResponse, status } = axios.isAxiosError(error)
    ? handleHttpResponse(error.response)
    : handleHttpResponse(undefined);
  nextResponse.status(status).json(httpResponse);
};

export const nextApiHttpMethodHandler = async (
  nextRequest: NextApiRequest,
  nextResponse: NextApiResponse,
  methods: string[],
  callback: () => void,
  enableNotAllowMethodResponse = true,
) => {
  const { method } = nextRequest;

  if (method && methods.includes(method)) {
    await callback();
  } else if (enableNotAllowMethodResponse) {
    nextResponse.setHeader("Allow", methods);
    nextResponse.status(405).end(`Method ${method} Not Allowed`);
  }
};
