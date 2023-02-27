import { FC, ReactNode } from "react";
import styled from "styled-components";
import entranceBkg from "../../images/entrance-bkg.jpg";

type Props = {
  children: ReactNode;
};

const EntranceLayout: FC<Props> = ({ children }) => {
  return (
    <EntranceLayoutStyled className='p-0 p-md-11'>
      <div className='row h-100'>
        <div className='col-md-6 col-lg-5 col-xl-4  h-100'>
          <MainBox>{children}</MainBox>
        </div>
      </div>
    </EntranceLayoutStyled>
  );
};

const EntranceLayoutStyled = styled.div`
  background: url("${entranceBkg.src}") no-repeat;
  height: 100vh;
  background-size: cover;
  background-position: center;
`;

const MainBox = styled.div`
  background: white;
  height: 100%;
  border-radius: 16px;
  padding: 32px;
`;

export default EntranceLayout;
