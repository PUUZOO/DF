/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DrufflerInfoResponse } from './DrufflerInfoResponse';

export type DrufflerFullResponse = {
    role?: string;
    id: string;
    username: string;
    is_active: boolean;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    info?: DrufflerInfoResponse;
};
