/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderDatetimeSchema } from './OrderDatetimeSchema';
import type { OrderItemsCreateSchema } from './OrderItemsCreateSchema';
import type { PaymentTypes } from './PaymentTypes';
import type { RoomServicesTypes } from './RoomServicesTypes';
import type { StatusTypes } from './StatusTypes';

export type OrderFullResponse = {
    status_type: StatusTypes;
    payment_type: PaymentTypes;
    service_type: RoomServicesTypes;
    order_items: Array<OrderItemsCreateSchema>;
    admin_id?: string;
    hotel_id: string;
    user_id: string;
    comments?: string;
    administration_comment?: string;
    date?: Array<OrderDatetimeSchema>;
};

