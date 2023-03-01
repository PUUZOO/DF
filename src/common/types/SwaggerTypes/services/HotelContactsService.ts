/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HotelContactsResponse } from '../models/HotelContactsResponse';
import type { HotelContactsUpdateRequest } from '../models/HotelContactsUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class HotelContactsService {

    /**
     * Get Contacts By Hotel Id
     * Get contacts by hotel id. Applicable for Administrative accounts
     * @param hotelId
     * @returns HotelContactsResponse Successful Response
     * @throws ApiError
     */
    public static getContactsByHotelIdApiV1HotelsHotelIdContactsGet(
        hotelId: string,
    ): CancelablePromise<Array<HotelContactsResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/hotels/{hotel_id}/contacts',
            path: {
                'hotel_id': hotelId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Contacts By Hotel Id
     * Get contacts by hotel id. Applicable for Administrative accounts
     * @param hotelId
     * @param requestBody
     * @returns HotelContactsResponse Successful Response
     * @throws ApiError
     */
    public static updateContactsByHotelIdApiV1HotelsHotelIdContactsPut(
        hotelId: string,
        requestBody: HotelContactsUpdateRequest,
    ): CancelablePromise<HotelContactsResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/hotels/{hotel_id}/contacts',
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
     * Create Contacts
     * Create new hotel contacts. Applicable for Administrative account
     * @param hotelId
     * @param requestBody
     * @returns HotelContactsResponse Successful Response
     * @throws ApiError
     */
    public static createContactsApiV1HotelsHotelIdContactsPost(
        hotelId: string,
        requestBody: HotelContactsUpdateRequest,
    ): CancelablePromise<HotelContactsResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/hotels/{hotel_id}/contacts',
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
