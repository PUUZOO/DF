/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RoomServicesTypes } from './RoomServicesTypes';

export type RoomServiceResponse = {
    is_deleted?: boolean;
    description?: string;
    custom_name?: string;
    price?: string;
    is_active: boolean;
    service_type: RoomServicesTypes;
    hotel_id: string;
    id: string;
};
