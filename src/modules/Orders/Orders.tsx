import EmptyTable from "@/common/components/EmptyTable";
import hotelIcon from "@/images/hotel-services.svg";
import { useHotel } from "@/common/hook/useHotel";
import plusIcon from "@/images/plus-icon.svg";
import OrderDnD from "./components/OrderDnD";
import { useAppDispatch } from "@/redux/hooks";
import { toggleSettingsProfileOffcanvas } from "@/common/redux/reducers/offconvases";
import Button from "@/common/ui/Button";

const Orders = () => {
  const { id: hotelId } = useHotel();

  return (
    <div className='row'>
      <div className='mb-11 d-flex justify-content-between'>
        <h1>Заказы</h1>
      </div>
      {!hotelId ? (
        <EmptyTable
          icon={hotelIcon}
          title='Не выбран отель'
          description='Пожалуйста выберите отель.'
          onClick={() => console.log("test")}
        />
      ) : (
        <>
          <div className='col-12'>
            <OrderDnD />
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
