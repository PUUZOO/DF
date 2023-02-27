import { FC, ReactNode } from "react";
import DrufflersSidebar from "@/common/components/DrufflersSidebar";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

const DashboardLayout: FC<Props> = ({ children }) => {
  return (
    <DashboardLayoutStyled>
      <SidebarSideStyled>
        <DrufflersSidebar />
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
`;

export default DashboardLayout;
