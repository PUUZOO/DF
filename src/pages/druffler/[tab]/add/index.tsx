import { NextPageWithLayout } from "@/pages/_app";
import { GetServerSideProps } from "next";
import { withAuth } from "@/common/middlewares/Auth";
import ServiceAdd from "@/modules/ServiceAdd";
import { redirectTo } from "@/common/middlewares/Auth";

type Props = {};

const AddPage: NextPageWithLayout<Props> = () => {
  return <ServiceAdd />;
};

export const getServerSideProps: GetServerSideProps = withAuth(async ({ req, query, res }) => {
  if (!query?.hotelId) {
    return redirectTo("/");
  }

  return {
    props: { hotelId: query?.hotelId ?? "" },
  };
});

export default AddPage;
