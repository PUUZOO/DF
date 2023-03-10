/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderDatetimeSchema } from './OrderDatetimeSchema';
import type { OrderItemsSchema } from './OrderItemsSchema';
import type { PaymentTypes } from './PaymentTypes';
import type { RoomServicesTypes } from './RoomServicesTypes';

export type OrderFullResponse = {
    payment_type: PaymentTypes;
    service_type: RoomServicesTypes;
    order_items: Array<OrderItemsSchema>;
    admin_id?: string;
    room_number: string;
    hotel_id: string;
    user_id: string;
    comments?: string;
    administration_comment?: string;
    date?: Array<OrderDatetimeSchema>;
};
