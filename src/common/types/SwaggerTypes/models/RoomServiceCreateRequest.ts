/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RoomServicesTypes } from './RoomServicesTypes';

export type RoomServiceCreateRequest = {
    description?: string;
    custom_name?: string;
    price?: string;
    is_active: boolean;
    service_type: RoomServicesTypes;
    hotel_id: string;
};
