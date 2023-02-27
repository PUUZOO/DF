/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RoomsCreateRequest } from '../models/RoomsCreateRequest';
import type { RoomsFullResponse } from '../models/RoomsFullResponse';
import type { RoomsResponse } from '../models/RoomsResponse';
import type { RoomsUpdateRequest } from '../models/RoomsUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RoomsService {

    /**
     * Create Room
     * Create new room. Applicable for Administrative account
     * @param requestBody 
     * @returns RoomsResponse Successful Response
     * @throws ApiError
     */
    public static createRoomApiV1RoomsPost(
requestBody: RoomsCreateRequest,
): CancelablePromise<RoomsResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/rooms',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Room By Id
     * Get room by id. Applicable for Administrative accounts
     * @param roomId 
     * @returns RoomsResponse Successful Response
     * @throws ApiError
     */
    public static getRoomByIdApiV1RoomsRoomIdGet(
roomId: string,
): CancelablePromise<RoomsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/rooms/{room_id}',
            path: {
                'room_id': roomId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Room By Id
     * Update room by id. Applicable for Administrative accounts
     * @param roomId 
     * @param requestBody 
     * @returns RoomsResponse Successful Response
     * @throws ApiError
     */
    public static updateRoomByIdApiV1RoomsRoomIdPut(
roomId: string,
requestBody: RoomsUpdateRequest,
): CancelablePromise<RoomsResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/rooms/{room_id}',
            path: {
                'room_id': roomId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Room By Id
     * Delete room by id. Applicable for Administrative accounts
     * @param roomId 
     * @returns RoomsResponse Successful Response
     * @throws ApiError
     */
    public static deleteRoomByIdApiV1RoomsRoomIdDelete(
roomId: string,
): CancelablePromise<RoomsResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/rooms/{room_id}',
            path: {
                'room_id': roomId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Room By Id
     * Get room by id. Applicable for Administrative accounts
     * @param roomId 
     * @returns RoomsFullResponse Successful Response
     * @throws ApiError
     */
    public static getRoomByIdApiV1RoomsRoomIdFullGet(
roomId: string,
): CancelablePromise<RoomsFullResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/rooms/{room_id}/full',
            path: {
                'room_id': roomId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
