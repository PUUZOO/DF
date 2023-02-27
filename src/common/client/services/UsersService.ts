/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PasswordIn } from '../models/PasswordIn';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * Get User By Id
     * @param userId 
     * @returns User Successful Response
     * @throws ApiError
     */
    public static getUserByIdApiV1UsersUserIdGet(
userId: number,
): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/{user_id}',
            path: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Me
     * @returns User Successful Response
     * @throws ApiError
     */
    public static getMeApiV1UsersMeGet(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/me',
        });
    }

    /**
     * Login User
     * Login to user account.
     * @param requestBody 
     * @returns User Successful Response
     * @throws ApiError
     */
    public static loginUserApiV1UsersLoginPost(
requestBody: PasswordIn,
): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/users/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
