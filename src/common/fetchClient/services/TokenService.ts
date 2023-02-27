/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JwtToken } from '../models/JwtToken';
import type { PasswordIn } from '../models/PasswordIn';
import type { RefreshToken } from '../models/RefreshToken';
import type { StatusResponse } from '../models/StatusResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TokenService {

    /**
     * Refresh
     * @param requestBody
     * @returns JwtToken Successful Response
     * @throws ApiError
     */
    public static refreshApiV1TokenRefreshPost(
        requestBody: RefreshToken,
    ): CancelablePromise<JwtToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/token/refresh',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Revoke All
     * @param requestBody
     * @returns StatusResponse Successful Response
     * @throws ApiError
     */
    public static revokeAllApiV1TokenRevokePost(
        requestBody: RefreshToken,
    ): CancelablePromise<StatusResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/token/revoke',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Administrative Exchange
     * Login to administrator or druffler account.
     * @param requestBody
     * @returns JwtToken Successful Response
     * @throws ApiError
     */
    public static administrativeExchangeApiV1TokenAdministrativeExchangePost(
        requestBody: PasswordIn,
    ): CancelablePromise<JwtToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/token/administrative/exchange',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
