/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RoomServiceCreateRequest } from '../models/RoomServiceCreateRequest';
import type { RoomServiceFullResponse } from '../models/RoomServiceFullResponse';
import type { RoomServiceResponse } from '../models/RoomServiceResponse';
import type { RoomServiceUpdateRequest } from '../models/RoomServiceUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RoomServicesService {

    /**
     * Create Room Service
     * Create new room_service. Applicable for Administrative account
     * @param requestBody
     * @returns RoomServiceResponse Successful Response
     * @throws ApiError
     */
    public static createRoomServiceApiV1RoomServicesPost(
        requestBody: RoomServiceCreateRequest,
    ): CancelablePromise<RoomServiceResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/room/services',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Room Service By Id
     * Get room_service by id. Applicable for Administrative accounts
     * @param roomServiceId
     * @returns RoomServiceResponse Successful Response
     * @throws ApiError
     */
    public static getRoomServiceByIdApiV1RoomServicesRoomServiceIdGet(
        roomServiceId: string,
    ): CancelablePromise<RoomServiceResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/room/services/{room_service_id}',
            path: {
                'room_service_id': roomServiceId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Room Service By Id
     * Update room_service by id. Applicable for Administrative accounts
     * @param roomServiceId
     * @param requestBody
     * @returns RoomServiceResponse Successful Response
     * @throws ApiError
     */
    public static updateRoomServiceByIdApiV1RoomServicesRoomServiceIdPut(
        roomServiceId: string,
        requestBody: RoomServiceUpdateRequest,
    ): CancelablePromise<RoomServiceResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/room/services/{room_service_id}',
            path: {
                'room_service_id': roomServiceId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Room Service By Id
     * Delete room_service by id. Applicable for Administrative accounts
     * @param roomServiceId
     * @returns RoomServiceResponse Successful Response
     * @throws ApiError
     */
    public static deleteRoomServiceByIdApiV1RoomServicesRoomServiceIdDelete(
        roomServiceId: string,
    ): CancelablePromise<RoomServiceResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/room/services/{room_service_id}',
            path: {
                'room_service_id': roomServiceId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Room Service By Id
     * Get room_service by id. Applicable for Administrative accounts
     * @param roomServiceId
     * @returns RoomServiceFullResponse Successful Response
     * @throws ApiError
     */
    public static getRoomServiceByIdApiV1RoomServicesRoomServiceIdFullGet(
        roomServiceId: string,
    ): CancelablePromise<RoomServiceFullResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/room/services/{room_service_id}/full',
            path: {
                'room_service_id': roomServiceId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
