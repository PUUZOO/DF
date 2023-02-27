/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HotelAccommodationsResponse } from '../models/HotelAccommodationsResponse';
import type { HotelAccommodationsUpdateRequest } from '../models/HotelAccommodationsUpdateRequest';
import type { HotelBenefitsUpdateRequest } from '../models/HotelBenefitsUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class HotelAccommodationsService {

    /**
     * Get Accommodations By Hotel Id
     * Get accommodations by hotel id. Applicable for Administrative accounts
     * @param hotelId 
     * @returns HotelAccommodationsResponse Successful Response
     * @throws ApiError
     */
    public static getAccommodationsByHotelIdApiV1HotelsHotelIdAccommodationsGet(
hotelId: string,
): CancelablePromise<HotelAccommodationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/hotels/{hotel_id}/accommodations',
            path: {
                'hotel_id': hotelId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Accommodations By Hotel Id
     * Get accommodations by hotel id. Applicable for Administrative accounts
     * @param hotelId 
     * @param requestBody 
     * @returns HotelAccommodationsResponse Successful Response
     * @throws ApiError
     */
    public static updateAccommodationsByHotelIdApiV1HotelsHotelIdAccommodationsPut(
hotelId: string,
requestBody: HotelBenefitsUpdateRequest,
): CancelablePromise<HotelAccommodationsResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/hotels/{hotel_id}/accommodations',
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
     * Create Accommodations
     * Create new hotel accommodations. Applicable for Administrative account
     * @param hotelId 
     * @param requestBody 
     * @returns HotelAccommodationsResponse Successful Response
     * @throws ApiError
     */
    public static createAccommodationsApiV1HotelsHotelIdAccommodationsPost(
hotelId: string,
requestBody: HotelAccommodationsUpdateRequest,
): CancelablePromise<HotelAccommodationsResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/hotels/{hotel_id}/accommodations',
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
