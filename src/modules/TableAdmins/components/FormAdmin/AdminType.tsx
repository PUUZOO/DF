import { FC } from "react";

import { AdminTypes } from "@/common/types/SwaggerTypes";
import styled from "styled-components";

type Props = {
  type: AdminTypes;
  onChange: (value: string) => void;
  isDisabled: boolean;
};

const AdminType: FC<Props> = ({ type, onChange, isDisabled }) => (
  <div className='d-flex flex-column mt-9'>
    <span className='mb-5'>Роль</span>
    <input
      type='radio'
      className='btn-check'
      name='admin_type'
      id='radio1'
      autoComplete='off'
      checked={type === AdminTypes.EMPLOYEE}
      value={AdminTypes.EMPLOYEE}
      onChange={(e) => onChange(e.target.value)}
      disabled={isDisabled}
    />
    <LabelStyled className='text-start py-7 px-8 ' htmlFor='radio1' disabled={isDisabled}>
      <span>Сотрудник</span> <br />
      <span className='text-secondary'>Может отменять и завершать заявки</span>
    </LabelStyled>

    <input
      type='radio'
      className='btn-check'
      name='admin_type'
      id='radio2'
      autoComplete='off'
      checked={type === AdminTypes.ADMINISTRATOR}
      value={AdminTypes.ADMINISTRATOR}
      onChange={(e) => onChange(e.target.value)}
      disabled={isDisabled}
    />
    <LabelStyled className='text-start py-7 px-8' htmlFor='radio2' disabled={isDisabled}>
      <span>Администратор</span> <br />
      <span className='text-secondary'>
        Может добавлять и редактировать
        <br /> отели, услуги, заявки
      </span>
    </LabelStyled>
  </div>
);

const LabelStyled = styled.label<{ disabled: boolean }>`
  border-radius: 12px;
  border: 1px solid var(--bs-white);
  cursor: pointer;

  .btn-check:checked + & {
    border: 1px solid var(--bs-info);
  }

  &:hover {
    border: 1px solid var(--bs-light);
    background-color: var(--bs-light);
  }

  .btn-check:disabled + & {
    cursor: default;
    background-color: var(--bs-light);
    border: 1px solid var(--bs-light);
  }

  .btn-check:checked + & {
    border: 1px solid var(--bs-info);
  }
`;

export default AdminType;
