/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HotelMessengersResponse } from '../models/HotelMessengersResponse';
import type { HotelMessengersUpdateRequest } from '../models/HotelMessengersUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class HotelMessengersService {

    /**
     * Get Messengers By Hotel Id
     * Get messengers by hotel id. Applicable for Administrative accounts
     * @param hotelId 
     * @returns HotelMessengersResponse Successful Response
     * @throws ApiError
     */
    public static getMessengersByHotelIdApiV1HotelsHotelIdMessengersGet(
hotelId: string,
): CancelablePromise<HotelMessengersResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/hotels/{hotel_id}/messengers',
            path: {
                'hotel_id': hotelId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Messengers By Hotel Id
     * Get messengers by hotel id. Applicable for Administrative accounts
     * @param hotelId 
     * @param requestBody 
     * @returns HotelMessengersResponse Successful Response
     * @throws ApiError
     */
    public static updateMessengersByHotelIdApiV1HotelsHotelIdMessengersPut(
hotelId: string,
requestBody: HotelMessengersUpdateRequest,
): CancelablePromise<HotelMessengersResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/hotels/{hotel_id}/messengers',
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
     * Create Messengers
     * Create new hotel messengers. Applicable for Administrative account
     * @param hotelId 
     * @param requestBody 
     * @returns HotelMessengersResponse Successful Response
     * @throws ApiError
     */
    public static createMessengersApiV1HotelsHotelIdMessengersPost(
hotelId: string,
requestBody: HotelMessengersUpdateRequest,
): CancelablePromise<HotelMessengersResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/hotels/{hotel_id}/messengers',
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

}
