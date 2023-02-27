/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HotelFullResponse } from '../models/HotelFullResponse';
import type { HotelResponse } from '../models/HotelResponse';
import type { HotelUpdateRequest } from '../models/HotelUpdateRequest';
import type { RoomServiceFullResponse } from '../models/RoomServiceFullResponse';
import type { RoomServiceResponse } from '../models/RoomServiceResponse';
import type { RoomsFullResponse } from '../models/RoomsFullResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class HotelsService {

    /**
     * Get Hotel By Code
     * Get hotel by code. Public Api
     * @param code
     * @returns HotelResponse Successful Response
     * @throws ApiError
     */
    public static getHotelByCodeApiV1HotelsCodeCodeGet(
        code: string,
    ): CancelablePromise<HotelResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/hotels/code/{code}',
            path: {
                'code': code,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Hotel By Code
     * Get hotel by code. Public Api
     * @param code
     * @returns HotelFullResponse Successful Response
     * @throws ApiError
     */
    public static getHotelByCodeApiV1HotelsCodeCodeFullGet(
        code: string,
    ): CancelablePromise<HotelFullResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/hotels/code/{code}/full',
            path: {
                'code': code,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Hotel By Id
     * Get hotel by id. Applicable for Administrative accounts
     * @param hotelId
     * @returns HotelResponse Successful Response
     * @throws ApiError
     */
    public static getHotelByIdApiV1HotelsHotelIdGet(
        hotelId: string,
    ): CancelablePromise<HotelResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/hotels/{hotel_id}',
            path: {
                'hotel_id': hotelId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Hotel By Id
     * Update hotel by id. Applicable for Administrative accounts
     * @param hotelId
     * @param requestBody
     * @returns HotelResponse Successful Response
     * @throws ApiError
     */
    public static updateHotelByIdApiV1HotelsHotelIdPut(
        hotelId: string,
        requestBody: HotelUpdateRequest,
    ): CancelablePromise<HotelResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/hotels/{hotel_id}',
            path: {
                'hotel_id': hotelId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Hotel By Id
     * Delete hotel by id. Applicable for Administrative accounts
     * @param hotelId
     * @returns HotelResponse Successful Response
     * @throws ApiError
     */
    public static deleteHotelByIdApiV1HotelsHotelIdDelete(
        hotelId: string,
    ): CancelablePromise<HotelResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/hotels/{hotel_id}',
            path: {
                'hotel_id': hotelId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Hotel By Id
     * Get hotel by id. Applicable for Administrative accounts
     * @param hotelId
     * @returns HotelFullResponse Successful Response
     * @throws ApiError
     */
    public static getHotelByIdApiV1HotelsHotelIdFullGet(
        hotelId: string,
    ): CancelablePromise<HotelFullResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/hotels/{hotel_id}/full',
            path: {
                'hotel_id': hotelId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get All Room Services By Hotel By Id
     * Get all room services by hotel id. Applicable for Administrative accounts
     * @param hotelId
     * @returns RoomServiceResponse Successful Response
     * @throws ApiError
     */
    public static getAllRoomServicesByHotelByIdApiV1HotelsHotelIdRoomServicesGet(
        hotelId: string,
    ): CancelablePromise<Array<RoomServiceResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/hotels/{hotel_id}/room/services',
            path: {
                'hotel_id': hotelId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get All Room Services By Hotel By Id
     * Get all room services by hotel id. Applicable for Administrative accounts
     * @param hotelId
     * @returns RoomServiceFullResponse Successful Response
     * @throws ApiError
     */
    public static getAllRoomServicesByHotelByIdApiV1HotelsHotelIdRoomServicesFullGet(
        hotelId: string,
    ): CancelablePromise<Array<RoomServiceFullResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/hotels/{hotel_id}/room/services/full',
            path: {
                'hotel_id': hotelId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get All Rooms By Hotel By Id
     * Get all room services by hotel id. Applicable for Administrative accounts
     * @param hotelId
     * @returns RoomsFullResponse Successful Response
     * @throws ApiError
     */
    public static getAllRoomsByHotelByIdApiV1HotelsHotelIdRoomsGet(
        hotelId: string,
    ): CancelablePromise<Array<RoomsFullResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/hotels/{hotel_id}/rooms',
            path: {
                'hotel_id': hotelId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get All Rooms By Hotel By Id
     * Get all room services by hotel id. Applicable for Administrative accounts
     * @param hotelId
     * @returns RoomsFullResponse Successful Response
     * @throws ApiError
     */
    public static getAllRoomsByHotelByIdApiV1HotelsHotelIdRoomsFullGet(
        hotelId: string,
    ): CancelablePromise<Array<RoomsFullResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/hotels/{hotel_id}/rooms/full',
            path: {
                'hotel_id': hotelId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
