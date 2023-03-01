/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdminInfoUpdateRequest } from './AdminInfoUpdateRequest';
import type { AdminTypes } from './AdminTypes';

export type AdminUpdateRequest = {
    admin_type: AdminTypes;
    username: string;
    info: AdminInfoUpdateRequest;
    hotel_id?: string;
};

