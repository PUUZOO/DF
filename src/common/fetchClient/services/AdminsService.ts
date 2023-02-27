/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminFullResponse } from '../models/AdminFullResponse';
import type { AdminListResponse } from '../models/AdminListResponse';
import type { AdminResponse } from '../models/AdminResponse';
import type { ChangePasswordIn } from '../models/ChangePasswordIn';
import type { JwtToken } from '../models/JwtToken';
import type { NewPasswordIn } from '../models/NewPasswordIn';
import type { PasswordIn } from '../models/PasswordIn';
import type { StatusResponse } from '../models/StatusResponse';
import type { UsernameIn } from '../models/UsernameIn';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AdminsService {

    /**
     * Get All Admins
     * Get all admins. Applicable only for Admin user only
     * @param skip
     * @param limit
     * @returns AdminListResponse Successful Response
     * @throws ApiError
     */
    public static getAllAdminsApiV1AdminsGet(
        skip?: number,
        limit: number = 50,
    ): CancelablePromise<AdminListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/admins',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Set Pwd
     * Set password for administrator through guest token.
     * @param requestBody
     * @returns JwtToken Successful Response
     * @throws ApiError
     */
    public static setPwdApiV1AdminsPwdPost(
        requestBody: NewPasswordIn,
    ): CancelablePromise<JwtToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/admins/pwd',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Change Admin Pwd
     * Change admin pwd form. Applicable only for Admin and Druffler user only
     * @param adminId
     * @param requestBody
     * @returns JwtToken Successful Response
     * @throws ApiError
     */
    public static changeAdminPwdApiV1AdminsAdminIdPwdPut(
        adminId: string,
        requestBody: ChangePasswordIn,
    ): CancelablePromise<JwtToken> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/admins/{admin_id}/pwd',
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

    /**
     * Reset Admin Pwd
     * Send email with guest token to change pwd. Public Link
     * @param requestBody
     * @returns StatusResponse Successful Response
     * @throws ApiError
     */
    public static resetAdminPwdApiV1AdminsPwdResetGet(
        requestBody: UsernameIn,
    ): CancelablePromise<StatusResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/admins/pwd/reset',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Login Admin
     * Login to administrator account.
     * @param requestBody
     * @returns JwtToken Successful Response
     * @throws ApiError
     */
    public static loginAdminApiV1AdminsLoginPost(
        requestBody: PasswordIn,
    ): CancelablePromise<JwtToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/admins/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Me
     * Get me. Applicable only for Admin
     * @returns AdminFullResponse Successful Response
     * @throws ApiError
     */
    public static getMeApiV1AdminsMeGet(): CancelablePromise<AdminFullResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/admins/me',
        });
    }

    /**
     * Get Admin By Id
     * Get admin by id. Applicable only for Admin and Druffler user only
     * @param adminId
     * @returns AdminResponse Successful Response
     * @throws ApiError
     */
    public static getAdminByIdApiV1AdminsAdminIdGet(
        adminId: string,
    ): CancelablePromise<AdminResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/admins/{admin_id}',
            path: {
                'admin_id': adminId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Admin By Id
     * Delete admin. Set admin is_deleted=True. Applicable only for Admin and Druffler user only
     * @param adminId
     * @returns AdminResponse Successful Response
     * @throws ApiError
     */
    public static deleteAdminByIdApiV1AdminsAdminIdDelete(
        adminId: string,
    ): CancelablePromise<AdminResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/admins/{admin_id}',
            path: {
                'admin_id': adminId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Activate Admin By Id
     * Activate admin. Applicable only for Admin and Druffler user only
     * @param adminId
     * @returns AdminResponse Successful Response
     * @throws ApiError
     */
    public static activateAdminByIdApiV1AdminsAdminIdActivateGet(
        adminId: string,
    ): CancelablePromise<AdminResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/admins/{admin_id}/activate',
            path: {
                'admin_id': adminId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Deactivate Admin By Id
     * Deactivate admin. Applicable only for Admin and Druffler user only
     * @param adminId
     * @returns AdminResponse Successful Response
     * @throws ApiError
     */
    public static deactivateAdminByIdApiV1AdminsAdminIdDeactivateGet(
        adminId: string,
    ): CancelablePromise<AdminResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/admins/{admin_id}/deactivate',
            path: {
                'admin_id': adminId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
