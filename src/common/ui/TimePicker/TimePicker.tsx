import { FC } from "react";
import DatePicker from "react-datepicker";

type Props = {
  value: Date;
  setFieldValue: (date: Date) => void;
};

const TimePicker: FC<Props> = ({ value, setFieldValue }) => {
  return (
    <DatePicker
      selected={value}
      onChange={(date) => date && setFieldValue(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption=''
      dateFormat='HH:mm'
      timeFormat='HH:mm'
      className='form-control'
      timeClassName={(time) => {
        return "form-control";
      }}
    />
  );
};

export default TimePicker;
