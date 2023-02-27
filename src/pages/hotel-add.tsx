import { NextPageWithLayout } from "@/pages/_app";
import { GetServerSideProps } from "next";
import { withAuth } from "@/common/middlewares/Auth";
import HotelAdd from "@/modules/HotelAdd";

const HotelAddP: NextPageWithLayout = () => {
  return <HotelAdd />;
};

// Accounts.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps: GetServerSideProps = withAuth(async ({ req, query, res }) => {
  return {
    props: {},
  };
});

export default HotelAddP;
