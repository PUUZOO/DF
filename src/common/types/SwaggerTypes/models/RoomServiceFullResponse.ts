/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RoomServiceMenuFullResponse } from './RoomServiceMenuFullResponse';
import type { RoomServicesTypes } from './RoomServicesTypes';

export type RoomServiceFullResponse = {
    is_deleted?: boolean;
    description?: string;
    custom_name?: string;
    price?: string;
    is_active: boolean;
    service_type: RoomServicesTypes;
    hotel_id: string;
    id: string;
    menu?: Array<RoomServiceMenuFullResponse>;
};
