import { GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { withIronSessionSsr } from "@/middlewares/iron-session";
import { wrapper } from "@/common/redux/store";
import { setUser } from "@/common/redux/reducers/user";
import jwt from "jsonwebtoken";

type Options = {
  redirectTo: string;
};

export const redirectTo = (destination: string = "/login") => {
  return {
    redirect: {
      destination,
      permanent: false,
    },
  };
};

export const isAuthenticated = (ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
  return ctx?.req?.session?.auth && !!ctx.req.session.auth.access_token;
};

export function withAuth<P extends { [key: string]: unknown } = { [key: string]: unknown }>(
  handler: (
    context: GetServerSidePropsContext,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
  options: Options = { redirectTo: "/login" },
) {
  return wrapper.getServerSideProps((store) =>
    withIronSessionSsr(async function nextGetServerSidePropsHandlerWrappedWithAuth(
      context: GetServerSidePropsContext,
    ) {
      const role = context.req.session?.user?.role;

      if (context.req.session.auth?.refresh_token) {
        const refreshData = jwt.decode(
          context.req.session.auth.refresh_token as string,
        ) as TokenPayloadType;
        const experationRefresh = refreshData
          ? new Date(refreshData.exp * 1000) <= new Date()
          : false;

        if (experationRefresh) {
          context.req.session.destroy();
          return redirectTo(options.redirectTo);
        }
      }

      if (!isAuthenticated(context)) {
        return redirectTo(options.redirectTo);
      }

      await store.dispatch(
        setUser({
          id: context.req.session.user.user,
          accountId: null,
          role,
        }),
      );

      return handler(context);
    }),
  );
}
