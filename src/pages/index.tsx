import { ReactElement } from "react";
import TableAccounts from "@/modules/TableAccounts";
import { GetServerSideProps } from "next";
import { withAuth } from "@/common/middlewares/Auth";
import DashboardLayout from "@/common/layouts/DashboardLayout";

export default function MainPage() {
  return <TableAccounts />;
}

MainPage.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps: GetServerSideProps = withAuth(async ({ req, query, res }) => {
  return {
    props: {},
  };
});
