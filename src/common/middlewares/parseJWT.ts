import jwt from "jsonwebtoken";

export const parseJWT = (access_token: string) =>
  jwt.decode(access_token as string) as TokenPayloadType;
