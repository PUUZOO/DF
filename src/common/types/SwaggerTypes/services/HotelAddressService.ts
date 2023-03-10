/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HotelAddressResponse } from '../models/HotelAddressResponse';
import type { HotelAddressUpdateRequest } from '../models/HotelAddressUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class HotelAddressService {

    /**
     * Get Address By Hotel Id
     * Get address by hotel id. Applicable for Administrative accounts
     * @param hotelId 
     * @returns HotelAddressResponse Successful Response
     * @throws ApiError
     */
    public static getAddressByHotelIdApiV1HotelsHotelIdAddressGet(
hotelId: string,
): CancelablePromise<HotelAddressResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/hotels/{hotel_id}/address',
            path: {
                'hotel_id': hotelId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Address By Hotel Id
     * Get address by hotel id. Applicable for Administrative accounts
     * @param hotelId 
     * @param requestBody 
     * @returns HotelAddressResponse Successful Response
     * @throws ApiError
     */
    public static updateAddressByHotelIdApiV1HotelsHotelIdAddressPut(
hotelId: string,
requestBody: HotelAddressUpdateRequest,
): CancelablePromise<HotelAddressResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/hotels/{hotel_id}/address',
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
     * Create Address
     * Create new hotel address. Applicable for Administrative account
     * @param hotelId 
     * @param requestBody 
     * @returns HotelAddressResponse Successful Response
     * @throws ApiError
     */
    public static createAddressApiV1HotelsHotelIdAddressPost(
hotelId: string,
requestBody: HotelAddressUpdateRequest,
): CancelablePromise<HotelAddressResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/hotels/{hotel_id}/address',
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
