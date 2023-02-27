import styled from "styled-components";
import { FC, ReactNode } from "react";
import Logo from "@/common/components/Logo";

type Props = { mobileFrame: ReactNode; children: ReactNode; headers?: ReactNode };

const MobileViewLayout: FC<Props> = ({ mobileFrame, children, headers }) => {
  return (
    <div className='container-fluid' style={{ height: "100%", background: "#F3F4F5" }}>
      <div className='row h-100'>
        <div className='col-md-5 h-100 d-flex align-items-center justify-content-center position-relative'>
          <div
            className='d-flex align-items-center justify-content-center'
            style={{ height: "100vh" }}
          >
            <MobileViewLayoutStyled className='sticky-top overflow-scroll'>
              {mobileFrame}
            </MobileViewLayoutStyled>
          </div>
        </div>
        <div className='col-md-7 bg-white' style={{ minHeight: "100vh", padding: "40px" }}>
          <div className='d-flex justify-content-between align-content-center'>
            <Logo />
            {headers}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

const MobileViewLayoutStyled = styled.div`
  width: 317px;
  height: 640px;
  border: 16px solid #cdd2d8;
  border-radius: 40px;
  box-shadow: 0px 12px 24px -4px rgba(32, 29, 36, 0.1);
  overflow: hidden;
  background: white;
  position: relative;
  &:after {
    content: "";
    display: block;
    background: #000000;
    border-radius: 3.73333px;
    width: 100px;
    height: 3.73px;
    bottom: 7px;
    left: 0;
    right: 0;
    margin: auto;
    position: absolute;
  }
`;

export default MobileViewLayout;
