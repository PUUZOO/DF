/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdminInfoResponse } from './AdminInfoResponse';
import type { AdminTypes } from './AdminTypes';

export type AdminFullResponse = {
    role?: string;
    id: string;
    username: string;
    admin_type: AdminTypes;
    is_active: boolean;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    info: AdminInfoResponse;
    account_id: string;
    hotel_id?: string;
};
