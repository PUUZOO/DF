import { FC } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@/common/ui/Button";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/redux/hooks";
import { setHotelId } from "@/common/redux/reducers/dynamic";

type Props = {
  show: boolean;
  onHide: () => void;
  hotelId: string | null;
};

const ModalEnd: FC<Props> = ({ show, onHide, hotelId }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <Modal show={show} onHide={onHide} size='lg' centered>
      <Modal.Header className='border-0' closeButton />

      <Modal.Body className='text-center '>
        <div className='row'>
          <div className='col-6'></div>
          <div className='col-6 px-11 py-11'>
            <div className='d-flex flex-column align-items-center '>
              <h3 style={{ marginTop: "133px" }}>Александр, поздравляю </h3>
              <p
                className='mt-4 text-secondary text-center'
                style={{ maxWidth: "317px", marginBottom: "121px" }}
              >
                Прием гостей лежит в основе нашей работы, и мы рады сделать его проще и комфортнее
                для вас и ваших гостей
              </p>
              <Button
                size='lg'
                variant='info'
                className='w-100'
                onClick={() => {
                  if (hotelId) dispatch(setHotelId(hotelId));
                  onHide();
                  router.push("/druffler/hotels");
                }}
                // style={{ marginTop: "120px" }}
              >
                Добавить услуги
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalEnd;
