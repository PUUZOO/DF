/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserInfoResponse } from './UserInfoResponse';

export type UserFullResponse = {
    id: string;
    username: string;
    is_active: boolean;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    info: UserInfoResponse;
};

