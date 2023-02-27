import MobileViewLayout from "@/common/layouts/MobileViewLayout";
import Link from "next/link";
import AddService from "./components/AddService";

const ServiceAdd = () => {
  const onSubmit = () => {
    console.log("submit");
  };

  return (
    <MobileViewLayout
      mobileFrame={<div>123</div>}
      headers={
        <Link href='/' className='text-secondary'>
          Сохранить и закрыть
        </Link>
      }
    >
      <AddService />
    </MobileViewLayout>
  );
};

export default ServiceAdd;
