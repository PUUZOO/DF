import { ReactElement, useMemo } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import DashboardLayout from "@/common/layouts/DashboardLayout";
import HotelEditor from "@/modules/HotelServices";
import { GetServerSideProps } from "next";
import { withAuth } from "@/common/middlewares/Auth";
import TableAdmins from "../../../modules/TableAdmins/TableAdmins";

type Props = {
  type: "hotels" | "staff";
};

const Accounts: NextPageWithLayout<Props> = ({ type }) => {
  if (type === "hotels") return <HotelEditor />;
  if (type === "staff") return <TableAdmins />;

  return <>TODO</>;
};

Accounts.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps: GetServerSideProps = withAuth(async ({ req, query, res }) => {
  return {
    props: {
      type: query.tab,
    },
  };
});

export default Accounts;
