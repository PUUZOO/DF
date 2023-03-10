/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RoomServiceMenuItemResponse } from './RoomServiceMenuItemResponse';
import type { RoomServiceResponse } from './RoomServiceResponse';

export type OrderItemsSchema = {
    price: number;
    total_value: number;
    menu_item_id?: string;
    menu_id?: string;
    room_service_id: string;
    room_upgrade_id?: string;
    amount: number;
    order_id?: string;
    menu_item?: RoomServiceMenuItemResponse;
    room_service?: RoomServiceResponse;
};
