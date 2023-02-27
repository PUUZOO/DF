/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HotelStateTypes } from './HotelStateTypes';

export type HotelResponse = {
    is_deleted?: boolean;
    name?: string;
    description?: string;
    state?: HotelStateTypes;
    is_active?: boolean;
    account_id: string;
    code?: string;
    id: string;
};

