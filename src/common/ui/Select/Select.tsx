import ReactSelect from "react-select";
import { Props, GroupBase } from "react-select";
// Style
import customStyles, * as Styled from "./customStyle";

type MainOption = { label: string; value: string; [x: string]: string };

const Select = <
  Option extends MainOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: Props<Option, IsMulti, Group>,
) => {
  return <ReactSelect {...props} styles={customStyles()} />;
};

export default Select;
