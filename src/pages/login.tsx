import { FC, ReactElement } from "react";
import SignIn from "@/modules/SignIn";
import { NextPageWithLayout } from "@/pages/_app";
import EntranceLayout from "@/common/layouts/EntranceLayout";
import { GetServerSideProps } from "next";
import { redirectTo } from "@/common/middlewares/Auth";
import { withIronSessionSsr } from "@/common/middlewares/iron-session";

export interface LoginProps {}

const LoginPage: NextPageWithLayout = () => {
  return <SignIn />;
};

LoginPage.getLayout = (page: ReactElement) => <EntranceLayout>{page}</EntranceLayout>;

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  if (req.session.auth?.access_token) {
    return redirectTo("/");
  }

  return {
    props: {},
  };
});

export default LoginPage;
