import { nextApiConnection } from "../http";

export const authService = {
  logout: async () => {
    return nextApiConnection.get(`/logout`);
  },
};
