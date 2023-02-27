/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderItemsCreateRequest } from './OrderItemsCreateRequest';
import type { PaymentTypes } from './PaymentTypes';
import type { RoomServicesTypes } from './RoomServicesTypes';
import type { StatusTypes } from './StatusTypes';

export type OrderCreateRequest = {
    status_type: StatusTypes;
    payment_type: PaymentTypes;
    service_type: RoomServicesTypes;
    order_items: Array<OrderItemsCreateRequest>;
    admin_id?: string;
    hotel_id: string;
    user_id: string;
    comments?: string;
    date?: string;
    administration_comment?: string;
};

