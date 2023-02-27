/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HotelStateTypes } from './HotelStateTypes';

export type HotelUpdateRequest = {
    name?: string;
    description?: string;
    state?: HotelStateTypes;
    is_active?: boolean;
};

