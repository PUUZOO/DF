import { FC } from "react";
import classNames from "classnames";
import styled from "styled-components";
import { HotelBenefitsResponse } from "@/common/fetchClient";

type Props = HotelBenefitsResponse & {
  className?: string;
};

const HotelBenefit: FC<Props> = ({ name, icon, className }) => {
  const iconStr = icon?.toString();

  return (
    <div className={classNames(className, "me-6 mb-6")}>
      <HotelBenefitStyled className='d-flex'>
        {iconStr && <div dangerouslySetInnerHTML={{ __html: iconStr }} />}
        <div className='ms-3 text-secondary'>{name}</div>
      </HotelBenefitStyled>
    </div>
  );
};

const HotelBenefitStyled = styled.div`
  color: #201d24;
  font-weight: 400;
  font-size: 10.4533px;
  line-height: 13px;
  display: flex;
  align-items: center;
`;

export default HotelBenefit;
