/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type OrderItemsCreateSchema = {
    price: number;
    total_value: number;
    menu_item_id?: string;
    menu_id?: string;
    room_service_id: string;
    room_upgrade_id?: string;
    amount: number;
    order_id?: string;
};

