import EmptyTable from "@/common/components/EmptyTable";
import statisticsIcon from "@/images/statistics.svg";
import { useHotel } from "@/common/hook/useHotel";

const Statistics = () => {
  const { id: hotelId, images, mutateImages } = useHotel();

  return (
    <div className='row'>
      <div className='mb-11 d-flex'>
        <h1>Заказы</h1>
      </div>
      {/* {!hotelId ? ( */}
      <EmptyTable
        icon={statisticsIcon}
        title='Данных пока нет'
        description='Позже здесь появится статистика по заказам, услугам и сотрудникам.'
        onClick={() => console.log("test")}
      />
      {/* ) : (
        <>
          <div className='col-4'></div>
          <div className='col-8'>test</div>
        </>
      )} */}
    </div>
  );
};

export default Statistics;
