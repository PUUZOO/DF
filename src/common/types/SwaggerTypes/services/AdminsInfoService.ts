/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminInfoResponse } from '../models/AdminInfoResponse';
import type { AdminInfoUpdateRequest } from '../models/AdminInfoUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AdminsInfoService {

    /**
     * Get Info
     * Get admin info by id. Applicable only for Admin and Druffler user only
     * @param adminId
     * @returns AdminInfoResponse Successful Response
     * @throws ApiError
     */
    public static getInfoApiV1AdminsAdminIdInfoGet(
        adminId: string,
    ): CancelablePromise<AdminInfoResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/admins/{admin_id}/info',
            path: {
                'admin_id': adminId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Admin Info By Admin Id
     * Update admin info by admin id. Applicable only for Admin and Druffler user only
     * @param adminId
     * @param requestBody
     * @returns AdminInfoResponse Successful Response
     * @throws ApiError
     */
    public static updateAdminInfoByAdminIdApiV1AdminsAdminIdInfoPut(
        adminId: string,
        requestBody: AdminInfoUpdateRequest,
    ): CancelablePromise<AdminInfoResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/admins/{admin_id}/info',
            path: {
                'admin_id': adminId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
