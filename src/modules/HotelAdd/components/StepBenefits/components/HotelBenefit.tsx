import { FC } from "react";
import classNames from "classnames";
import styled from "styled-components";
import { HotelBenefitsResponse } from "@/common/fetchClient";

type Props = HotelBenefitsResponse & {
  icon: string;
  className: string;
  onClick?: () => void;
  active?: boolean;
};

const HotelBenefit: FC<Props> = ({ name, icon, className, active, onClick }) => {
  return (
    <div className={classNames(className)}>
      <HotelBenefitStyled
        active={!!active}
        className='d-flex flex-column align-items-center justify-content-center text-center'
        onClick={onClick}
      >
        <div dangerouslySetInnerHTML={{ __html: icon }} />
        <div className='mt-4 text-secondary'>{name}</div>
      </HotelBenefitStyled>
    </div>
  );
};

const HotelBenefitStyled = styled.div<{ active: boolean }>`
  height: 104px;
  color: #201d24;
  background: ${({ active }) => (active ? "#FBFAFE" : "white")};
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  border: 1px solid #ded6f9;
  border-radius: 8px;
  cursor: pointer;
`;

export default HotelBenefit;
