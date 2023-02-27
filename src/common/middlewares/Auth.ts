import { GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { withIronSessionSsr } from "@/middlewares/iron-session";
import { wrapper } from "@/common/redux/store";
import { setUser } from "@/common/redux/reducers/user";
import { apiConnection } from "@/common/http";

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

      switch (role) {
        case "druffler":
          const druffler = await apiConnection(context.req, context.res).get(`/drufflers/me`);
          if (druffler.status !== 200) return redirectTo(options.redirectTo);
          break;

        case "user":
          const user = await apiConnection(context.req, context.res).get(`/users/me`);
          if (user.status !== 200) return redirectTo(options.redirectTo);
          break;

        default:
          return redirectTo(options.redirectTo);
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
