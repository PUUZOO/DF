import { FC, useState } from "react";
import Offcanvas from "@/common/ui/Offcanvas";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { selectOffconvases, toggleAddOrderOffcanvas } from "@/common/redux/reducers/offconvases";
import Step1 from "./steps/Step1/Step1";
import Step2 from "./steps/Step2/Step2";

const AddOrderOffcanvas: FC = () => {
  const { addOrderOffcanvas } = useAppSelector(selectOffconvases);
  const dispatch = useAppDispatch();
  const onToggleCanvas = () => dispatch(toggleAddOrderOffcanvas());

  const [step, setStep] = useState<number>(1);

  return (
    <Offcanvas
      title={"Новый заказ"}
      show={addOrderOffcanvas}
      setHide={() => {
        onToggleCanvas();
        setStep(1);
      }}
    >
      {step === 1 && <Step1 setStepPassword={() => setStep(1)} setStepEmail={() => setStep(2)} />}
      {step === 2 && <Step2 setStepInfo={() => setStep(3)} />}
    </Offcanvas>
  );
};

export default AddOrderOffcanvas;
