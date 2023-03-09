import { FC, ReactNode } from "react";
import DrufflersSidebar from "@/common/components/DrufflersSidebar";
import AdminsSidebar from "@/common/components/AdminsSidebar";
import styled from "styled-components";
import { useAppSelector } from "@/common/redux/hooks";
import { selectUser } from "@/common/redux/reducers/user";

type Props = {
  children: ReactNode;
};

const DashboardLayout: FC<Props> = ({ children }) => {
  const { role } = useAppSelector(selectUser);

  return (
    <DashboardLayoutStyled>
      <SidebarSideStyled>
        {role === "druffler" && <DrufflersSidebar />}
        {role === "admin" && <AdminsSidebar />}
      </SidebarSideStyled>
      <MainBlockStyled>{children}</MainBlockStyled>
    </DashboardLayoutStyled>
  );
};

const DashboardLayoutStyled = styled.div`
  display: flex;
  height: 100vh;
`;

const SidebarSideStyled = styled.div`
  width: 320px;
  background: #e6e8eb;
  height: 100%;
`;

const MainBlockStyled = styled.div`
  padding: 40px 48px;
  width: 100%;
  height: 100vh;
  overflow: auto;
`;

export default DashboardLayout;
