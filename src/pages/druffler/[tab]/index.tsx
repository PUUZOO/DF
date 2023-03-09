import { ReactElement } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import DashboardLayout from "@/common/layouts/DashboardLayout";
import TableAccounts from "@/modules/TableAccounts";
import { GetServerSideProps } from "next";
import { withAuth } from "@/common/middlewares/Auth";
import HotelEditor from "@/modules/HotelServices";
import TableAdmins from "@/modules/TableAdmins/TableAdmins";
import Orders from "@/modules/Orders";
import Statistics from "@/modules/Statistics";
import TableHotels from '@/modules/TableHotels';

type Props = {
  type: "hotels" | "staff" | "accounts" | "orders" | "statistics" | "all-hotels";
};

const Accounts: NextPageWithLayout<Props> = ({ type }) => {
  if (type === "hotels") return <HotelEditor />;
  if (type === "staff") return <TableAdmins />;
  if (type === "accounts") return <TableAccounts />;
  if (type === "orders") return <Orders />;
  if (type === "statistics") return <Statistics />;
  if (type === "all-hotels") return <TableHotels />;

  return <TableAccounts />;
};

Accounts.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps: GetServerSideProps = withAuth(async ({ req, query, res }) => {
  return {
    props: { type: query.tab },
  };
});

export default Accounts;
