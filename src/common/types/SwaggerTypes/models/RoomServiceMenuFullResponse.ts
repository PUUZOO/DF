/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RoomServiceMenuItemResponse } from './RoomServiceMenuItemResponse';

export type RoomServiceMenuFullResponse = {
    is_deleted?: boolean;
    name: string;
    description?: string;
    is_active: boolean;
    room_service_id: string;
    id: string;
    items?: Array<RoomServiceMenuItemResponse>;
};
