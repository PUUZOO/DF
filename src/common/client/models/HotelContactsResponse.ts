/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ContactTypes } from './ContactTypes';

export type HotelContactsResponse = {
    contact_type: ContactTypes;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    custom_name?: string;
    hotel_id: string;
    id: string;
};
