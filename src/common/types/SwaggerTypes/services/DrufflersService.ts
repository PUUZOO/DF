/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DrufflerCreateRequest } from '../models/DrufflerCreateRequest';
import type { DrufflerFullResponse } from '../models/DrufflerFullResponse';
import type { DrufflerInfoResponse } from '../models/DrufflerInfoResponse';
import type { DrufflerInfoUpdateRequest } from '../models/DrufflerInfoUpdateRequest';
import type { JwtToken } from '../models/JwtToken';
import type { PasswordIn } from '../models/PasswordIn';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DrufflersService {

    /**
     * Login Druffler
     * Login to druffler account.
     * @param requestBody 
     * @returns JwtToken Successful Response
     * @throws ApiError
     */
    public static loginDrufflerApiV1DrufflersLoginPost(
requestBody: PasswordIn,
): CancelablePromise<JwtToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/drufflers/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Me
     * Get me. Applicable only for Druffler
     * @returns DrufflerFullResponse Successful Response
     * @throws ApiError
     */
    public static getMeApiV1DrufflersMeGet(): CancelablePromise<DrufflerFullResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/drufflers/me',
        });
    }

    /**
     * Get All Drufflers
     * Get all drufflers. Applicable only for Druffler
     * @returns DrufflerFullResponse Successful Response
     * @throws ApiError
     */
    public static getAllDrufflersApiV1DrufflersGet(): CancelablePromise<Array<DrufflerFullResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/drufflers',
        });
    }

    /**
     * Create Druffler
     * Create new druffler. Applicable only for Druffler user
     * @param requestBody 
     * @returns DrufflerFullResponse Successful Response
     * @throws ApiError
     */
    public static createDrufflerApiV1DrufflersPost(
requestBody: DrufflerCreateRequest,
): CancelablePromise<DrufflerFullResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/drufflers/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Druffler Reset Password
     * Reset druffler password. Applicable only for Druffler user
     * @param drufflerId 
     * @returns DrufflerFullResponse Successful Response
     * @throws ApiError
     */
    public static drufflerResetPasswordApiV1DrufflersPwdResetPost(
drufflerId: string,
): CancelablePromise<DrufflerFullResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/drufflers/pwd/reset',
            query: {
                'druffler_id': drufflerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Druffler Info By Druffler Id
     * Update druffler info by druffler id. Applicable only Druffler user only
     * @param drufflerId 
     * @param requestBody 
     * @returns DrufflerInfoResponse Successful Response
     * @throws ApiError
     */
    public static updateDrufflerInfoByDrufflerIdApiV1DrufflersDrufflerIdInfoPut(
drufflerId: string,
requestBody: DrufflerInfoUpdateRequest,
): CancelablePromise<DrufflerInfoResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/drufflers/{druffler_id}/info',
            path: {
                'druffler_id': drufflerId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
