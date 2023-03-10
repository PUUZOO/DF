/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderItemsCreateRequest } from './OrderItemsCreateRequest';
import type { PaymentTypes } from './PaymentTypes';
import type { RoomServicesTypes } from './RoomServicesTypes';

export type OrderCreateRequest = {
    payment_type: PaymentTypes;
    service_type: RoomServicesTypes;
    order_items: Array<OrderItemsCreateRequest>;
    admin_id?: string;
    room_number: string;
    hotel_id: string;
    user_id: string;
    comments?: string;
    administration_comment?: string;
};
