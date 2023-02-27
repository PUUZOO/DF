// Library
import { CSSProperties } from "react";
import { OptionProps, IndicatorsContainerProps, SingleValueProps } from "react-select";

const customStyles = (): any => {
  return {
    option: (provided: CSSProperties, state: OptionProps) => {
      return {
        ...provided,
        backgroundColor: "white",
        borderBottom: "1px dotted pink",
        color: "black",
        position: "relative",
        border: "none!important",
        fontSize: "14px",
        padding: "5px 12px",

        ":hover": {
          backgroundColor: "var(--bs-secondary)",
        },
        ":after": state.isSelected && {
          content: '""',
          display: "block",
          backgroundSize: "cover",
          position: "absolute",
          right: "13.52px",
          top: "0px",
          bottom: "0px",
          margin: "auto",
        },
      };
    },
    input: (provided: CSSProperties) => {
      return {
        ...provided,
        margin: "0",
        input: {
          opacity: "1!important",
        },
      };
    },
    indicatorSeparator: () => {
      return {};
    },
    // indicatorsContainer: (provided: IndicatorsContainerProps) => {
    //   return {
    //     ...provided,
    //   };
    // },
    valueContainer: (provided: CSSProperties, { isDisabled }: { isDisabled: boolean }) => {
      return {
        ...provided,
        padding: 0,
        paddingLeft: "10px",
        opacity: 1,

        ":after": {
          content: "''",
          diplay: "block",
          position: "absolute",
          right: "5px",
          height: "20px",
          width: "20px",
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "right",
          backgroundPositionY: "center",
          backgroundSize: `calc(0.75em + 0.3rem) calc(0.75em + 0.3rem)`,
        },
      };
    },
    placeholder: (provided: CSSProperties, { isDisabled }: { isDisabled: boolean }) => ({
      ...provided,
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "20px",
      color: "#201D24",
      opacity: isDisabled ? "0.3" : "1",
    }),
    control: (provided: CSSProperties, { isDisabled }: { isDisabled: boolean }) => {
      return {
        ...provided,
        height: "56px",
        borderColor: "var(--bs-gray-400)",
        background: isDisabled ? "#e9ecef" : "transparent",
        boxShadow: "none",
        borderRadius: "9px",
        transition: ".3s",
        minWidth: "200px",
        cursor: "text",
        overflow: "hidden",
        // ":hover": {
        //   borderColor: "var(--bs-danger)",
        //   transition: ".3s",
        // },
        ":focus": {
          borderColor: "var(--bs-danger)!important",
        },
      };
    },
    menu: (provided: CSSProperties) => {
      return { ...provided };
    },
    menuList: (provided: CSSProperties) => {
      return { ...provided };
    },
    singleValue: (provided: CSSProperties, state: SingleValueProps) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return {
        ...provided,
        opacity,
        transition,
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "20px",
        color: "#201D24",
      };
    },
  };
};
export default customStyles;
