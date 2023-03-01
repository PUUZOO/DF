/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JwtToken } from '../models/JwtToken';
import type { PasswordIn } from '../models/PasswordIn';
import type { StatusResponse } from '../models/StatusResponse';
import type { UserCreateRequest } from '../models/UserCreateRequest';
import type { UserFullResponse } from '../models/UserFullResponse';
import type { UserInfoUpdateEmailRequest } from '../models/UserInfoUpdateEmailRequest';
import type { UserInfoUpdateRequest } from '../models/UserInfoUpdateRequest';
import type { UserResponse } from '../models/UserResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * Get Me
     * Get me. Applicable only for User
     * @returns UserFullResponse Successful Response
     * @throws ApiError
     */
    public static getMeApiV1UsersMeGet(): CancelablePromise<UserFullResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/me',
        });
    }

    /**
     * Get User By Id
     * Get user by id. Applicable only for Druffler user only
     * @param userId
     * @returns UserFullResponse Successful Response
     * @throws ApiError
     */
    public static getUserByIdApiV1UsersUserIdGet(
        userId: string,
    ): CancelablePromise<UserFullResponse> {
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
     * Delete User By Id
     * Delete admin. Set admin is_deleted=True. Applicable only Druffler user
     * @param userId
     * @returns UserResponse Successful Response
     * @throws ApiError
     */
    public static deleteUserByIdApiV1UsersUserIdDelete(
        userId: string,
    ): CancelablePromise<UserResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
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
     * Update User By Me
     * Update users name. Applicable only for User
     * @param requestBody
     * @returns UserFullResponse Successful Response
     * @throws ApiError
     */
    public static updateUserByMeApiV1UsersPut(
        requestBody: UserInfoUpdateRequest,
    ): CancelablePromise<UserFullResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/users',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Login User
     * Login to user account.
     * @param requestBody
     * @returns JwtToken Successful Response
     * @throws ApiError
     */
    public static loginUserApiV1UsersLoginPost(
        requestBody: PasswordIn,
    ): CancelablePromise<JwtToken> {
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

    /**
     * Signup User
     * User signup. Applicable only for users
     * @param requestBody
     * @returns StatusResponse Successful Response
     * @throws ApiError
     */
    public static signupUserApiV1UsersSignupPost(
        requestBody: UserCreateRequest,
    ): CancelablePromise<StatusResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/users/signup',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Set User Email
     * Set email and sent verification email. Applicable only for User
     * @param requestBody
     * @returns StatusResponse Successful Response
     * @throws ApiError
     */
    public static setUserEmailApiV1UsersEmailPost(
        requestBody: UserInfoUpdateEmailRequest,
    ): CancelablePromise<StatusResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/users/email',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Verify User Email
     * Verify email. Applicable only for User with Guest Token
     * @returns StatusResponse Successful Response
     * @throws ApiError
     */
    public static verifyUserEmailApiV1UsersEmailVerifyPost(): CancelablePromise<StatusResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/users/email/verify',
        });
    }

    /**
     * Activate User By Id
     * Activate admin. Applicable only for Druffler user only
     * @param userId
     * @returns UserResponse Successful Response
     * @throws ApiError
     */
    public static activateUserByIdApiV1UsersUserIdActivateGet(
        userId: string,
    ): CancelablePromise<UserResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/{user_id}/activate',
            path: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Deactivate User By Id
     * Deactivate user. Applicable only for Druffler user only
     * @param userId
     * @returns UserResponse Successful Response
     * @throws ApiError
     */
    public static deactivateUserByIdApiV1UsersUserIdDeactivateGet(
        userId: string,
    ): CancelablePromise<UserResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/{user_id}/deactivate',
            path: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
