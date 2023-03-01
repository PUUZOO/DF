import { ReactElement } from "react";
import SignOut from "@/modules/SignOut";
import { NextPageWithLayout } from "@/pages/_app";
import EntranceLayout from "@/common/layouts/EntranceLayout";
import { GetServerSideProps } from "next";
import { redirectTo } from "@/common/middlewares/Auth";
import { withIronSessionSsr } from "@/common/middlewares/iron-session";

type Props = {
  token: string | undefined;
};

const RegisterPage: NextPageWithLayout<Props> = ({ token }) => {
  return <SignOut tempToken={token} />;
};

RegisterPage.getLayout = (page: ReactElement) => <EntranceLayout>{page}</EntranceLayout>;

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, query, res }) => {
    if (req.session.auth?.access_token) {
      req.session.destroy();
    }

    return {
      props: {
        token: query.token ?? undefined,
      },
    };
  },
);

export default RegisterPage;
