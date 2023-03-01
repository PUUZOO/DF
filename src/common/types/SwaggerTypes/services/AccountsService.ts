/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountCreateRequest } from '../models/AccountCreateRequest';
import type { AccountResponse } from '../models/AccountResponse';
import type { AccountsListResponse } from '../models/AccountsListResponse';
import type { AccountUpdateRequest } from '../models/AccountUpdateRequest';
import type { AdminFullListResponse } from '../models/AdminFullListResponse';
import type { AdminFullResponse } from '../models/AdminFullResponse';
import type { AdminListResponse } from '../models/AdminListResponse';
import type { AdminUpdateRequest } from '../models/AdminUpdateRequest';
import type { HotelFullListResponse } from '../models/HotelFullListResponse';
import type { HotelListResponse } from '../models/HotelListResponse';
import type { HotelResponse } from '../models/HotelResponse';
import type { HotelUpdateRequest } from '../models/HotelUpdateRequest';
import type { StatusResponse } from '../models/StatusResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AccountsService {

    /**
     * Get All Accounts
     * Get all accounts. Applicable only for Druffler user only
     * @param skip
     * @param limit
     * @returns AccountsListResponse Successful Response
     * @throws ApiError
     */
    public static getAllAccountsApiV1AccountsGet(
        skip?: number,
        limit: number = 50,
    ): CancelablePromise<AccountsListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/accounts',
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
     * Create Account
     * Create new account. Applicable only for Druffler user only
     * @param requestBody
     * @returns AccountResponse Successful Response
     * @throws ApiError
     */
    public static createAccountApiV1AccountsPost(
        requestBody: AccountCreateRequest,
    ): CancelablePromise<AccountResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/accounts',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Accounts By Id
     * Update account info. Applicable only for Administrative user only
     * @param accountId
     * @returns AccountResponse Successful Response
     * @throws ApiError
     */
    public static getAccountsByIdApiV1AccountsAccountIdGet(
        accountId: string,
    ): CancelablePromise<AccountResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/accounts/{account_id}',
            path: {
                'account_id': accountId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Accounts
     * Update account info. Applicable only for Administrative user only
     * @param accountId
     * @param requestBody
     * @returns AccountResponse Successful Response
     * @throws ApiError
     */
    public static updateAccountsApiV1AccountsAccountIdPut(
        accountId: string,
        requestBody: AccountUpdateRequest,
    ): CancelablePromise<AccountResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/accounts/{account_id}',
            path: {
                'account_id': accountId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Account By Id
     * Delete account by id. Applicable for Druffler accounts
     * @param accountId
     * @returns StatusResponse Successful Response
     * @throws ApiError
     */
    public static deleteAccountByIdApiV1AccountsAccountIdDelete(
        accountId: string,
    ): CancelablePromise<StatusResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/accounts/{account_id}',
            path: {
                'account_id': accountId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get All Admins By Account Id
     * Get all admins. Applicable only for Druffler user only
     * @param accountId
     * @param skip
     * @param limit
     * @returns AdminListResponse Successful Response
     * @throws ApiError
     */
    public static getAllAdminsByAccountIdApiV1AccountsAccountIdAdminsGet(
        accountId: string,
        skip?: number,
        limit: number = 50,
    ): CancelablePromise<AdminListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/accounts/{account_id}/admins',
            path: {
                'account_id': accountId,
            },
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
     * Create Admin
     * Create new administrator. Applicable only for Druffler user
     * @param accountId
     * @param requestBody
     * @returns AdminFullResponse Successful Response
     * @throws ApiError
     */
    public static createAdminApiV1AccountsAccountIdAdminsPost(
        accountId: string,
        requestBody: AdminUpdateRequest,
    ): CancelablePromise<AdminFullResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/accounts/{account_id}/admins',
            path: {
                'account_id': accountId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get All Admins By Account Id
     * Get all admins. Applicable only for Druffler user only
     * @param accountId
     * @param skip
     * @param limit
     * @returns AdminFullListResponse Successful Response
     * @throws ApiError
     */
    public static getAllAdminsByAccountIdApiV1AccountsAccountIdAdminsFullGet(
        accountId: string,
        skip?: number,
        limit: number = 50,
    ): CancelablePromise<AdminFullListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/accounts/{account_id}/admins/full',
            path: {
                'account_id': accountId,
            },
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
     * Get All Hotels By Account Id
     * Get all hotels. Applicable only for Druffler user only
     * @param accountId
     * @param skip
     * @param limit
     * @returns HotelListResponse Successful Response
     * @throws ApiError
     */
    public static getAllHotelsByAccountIdApiV1AccountsAccountIdHotelsGet(
        accountId: string,
        skip?: number,
        limit: number = 50,
    ): CancelablePromise<HotelListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/accounts/{account_id}/hotels',
            path: {
                'account_id': accountId,
            },
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
     * Create Hotel
     * Create new hotel. Applicable for Administrative account
     * @param accountId
     * @param requestBody
     * @returns HotelResponse Successful Response
     * @throws ApiError
     */
    public static createHotelApiV1AccountsAccountIdHotelsPost(
        accountId: string,
        requestBody: HotelUpdateRequest,
    ): CancelablePromise<HotelResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/accounts/{account_id}/hotels',
            path: {
                'account_id': accountId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get All Hotels By Account Id
     * Get all hotels. Applicable only for Druffler user only
     * @param accountId
     * @param skip
     * @param limit
     * @returns HotelFullListResponse Successful Response
     * @throws ApiError
     */
    public static getAllHotelsByAccountIdApiV1AccountsAccountIdHotelsFullGet(
        accountId: string,
        skip?: number,
        limit: number = 50,
    ): CancelablePromise<HotelFullListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/accounts/{account_id}/hotels/full',
            path: {
                'account_id': accountId,
            },
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
