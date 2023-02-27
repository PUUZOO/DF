/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RoomBedsCreateRequest } from '../models/RoomBedsCreateRequest';
import type { RoomBedsLinkRequest } from '../models/RoomBedsLinkRequest';
import type { RoomBedsResponse } from '../models/RoomBedsResponse';
import type { StatusResponse } from '../models/StatusResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RoomsBedsService {

    /**
     * Get All Beds
     * Get all room beds. Applicable only for Administrative user
     * @returns RoomBedsResponse Successful Response
     * @throws ApiError
     */
    public static getAllBedsApiV1RoomsBedsGet(): CancelablePromise<Array<RoomBedsResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/rooms/beds',
        });
    }

    /**
     * Create Bed
     * Create new bed for rooms. Applicable only for Druffler user
     * @param requestBody
     * @returns RoomBedsResponse Successful Response
     * @throws ApiError
     */
    public static createBedApiV1RoomsBedsPost(
        requestBody: RoomBedsCreateRequest,
    ): CancelablePromise<RoomBedsResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/rooms/beds',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Link Beds
     * Create Room-Bed link. Applicable only for Administrative user only
     * @param requestBody
     * @returns StatusResponse Successful Response
     * @throws ApiError
     */
    public static linkBedsApiV1RoomsBedsLinkPost(
        requestBody: RoomBedsLinkRequest,
    ): CancelablePromise<StatusResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/rooms/beds/link',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Beds Link
     * Delete Hotel-Benefit link. Applicable only for Administrative user only
     * @param requestBody
     * @returns StatusResponse Successful Response
     * @throws ApiError
     */
    public static deleteBedsLinkApiV1RoomsBedsLinkDelete(
        requestBody: RoomBedsLinkRequest,
    ): CancelablePromise<StatusResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/rooms/beds/link',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
