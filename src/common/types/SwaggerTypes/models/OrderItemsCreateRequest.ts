/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type OrderItemsCreateRequest = {
    menu_item_id?: string;
    menu_id?: string;
    room_service_id: string;
    room_upgrade_id?: string;
    amount: number;
};
