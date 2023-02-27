/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DrufflerFullResponse } from '../models/DrufflerFullResponse';
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

}
