import { FC, useState } from "react";
import Offcanvas from "@/common/ui/Offcanvas";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  selectOffconvases,
  toggleSettingsProfileOffcanvas,
} from "@/common/redux/reducers/offconvases";
import StepInfo from "./steps/StepInfo/StepInfo";
import StepPassword from "./steps/StepPassword/StepPassword";
import Image from "next/image";

type Steps = "info" | "changePassword" | "changeEmail";

const SettingsProfileOffcanvas: FC = () => {
  const { settingsProfileOffcanvas } = useAppSelector(selectOffconvases);
  const dispatch = useAppDispatch();
  const onToggleCanvas = () => dispatch(toggleSettingsProfileOffcanvas());

  const [step, setStep] = useState<Steps>("info");

  let header = "";

  switch (step) {
    case "info":
      header = "Профиль";
      break;
    case "changePassword":
      header = "Пароль";
      break;
    case "changeEmail":
      header = "Введите новую почту";
      break;

    default:
      break;
  }

  return (
    <Offcanvas
      title={header}
      show={settingsProfileOffcanvas}
      setHide={() => {
        onToggleCanvas();
        setStep("info");
      }}
      headerLeft={
        step !== "info" && (
          <Image
            src={"/svg/chevron_left_black.svg"}
            alt=''
            width={24}
            height={24}
            style={{ cursor: "pointer" }}
            onClick={() => setStep("info")}
          />
        )
      }
    >
      {step === "info" && (
        <StepInfo
          setStepPassword={() => setStep("changePassword")}
          setStepEmail={() => setStep("changeEmail")}
        />
      )}
      {step === "changePassword" && <StepPassword setStepInfo={() => setStep("info")} />}
      {step === "changeEmail" && <div>изменение почты</div>}
    </Offcanvas>
  );
};

export default SettingsProfileOffcanvas;
