import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/common/redux/reducers/user";
import useSWR from "swr";
import { AdminFullResponse, DrufflerFullResponse } from "@/types/SwaggerTypes";

const routeByRole = {
  druffler: "/api/drufflers/me",
  admin: "/api/admins/me",
};

export const useUser = () => {
  const { role, ...userProps } = useAppSelector(selectUser);

  if (role === "") {
    throw new Error("No role");
  }

  // * Пока предполагается что этот хук будет использован для ролей druffler и admin
  if (role === "user") {
    throw new Error("user role");
  }

  const { data: user, mutate: mutateUser } = useSWR<DrufflerFullResponse | AdminFullResponse>(
    routeByRole[role],
  );

  return {
    user: {
      role,
      info: {},
      ...userProps,
      ...user,
    },
    mutateUser,
  };
};
