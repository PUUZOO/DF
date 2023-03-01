/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_create_photos_api_v1_hotels__hotel_id__photos_post } from '../models/Body_create_photos_api_v1_hotels__hotel_id__photos_post';
import type { HotelPhotosResponse } from '../models/HotelPhotosResponse';
import type { HotelPhotosUpdateRequest } from '../models/HotelPhotosUpdateRequest';
import type { StatusResponse } from '../models/StatusResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class HotelPhotosService {

    /**
     * Get Photos By Hotel Id
     * Get photos by hotel id. Applicable for Administrative accounts
     * @param hotelId
     * @returns HotelPhotosResponse Successful Response
     * @throws ApiError
     */
    public static getPhotosByHotelIdApiV1HotelsHotelIdPhotosGet(
        hotelId: string,
    ): CancelablePromise<Array<HotelPhotosResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/hotels/{hotel_id}/photos',
            path: {
                'hotel_id': hotelId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Photos
     * Create new hotel photos. Applicable for Administrative account
     * @param hotelId
     * @param formData
     * @returns HotelPhotosResponse Successful Response
     * @throws ApiError
     */
    public static createPhotosApiV1HotelsHotelIdPhotosPost(
        hotelId: string,
        formData: Body_create_photos_api_v1_hotels__hotel_id__photos_post,
    ): CancelablePromise<HotelPhotosResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/hotels/{hotel_id}/photos',
            path: {
                'hotel_id': hotelId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Photos By Id
     * Get photos by hotel id. Applicable for Administrative accounts
     * @param hotelId
     * @param photoId
     * @param requestBody
     * @returns HotelPhotosResponse Successful Response
     * @throws ApiError
     */
    public static updatePhotosByIdApiV1HotelsHotelIdPhotosPhotoIdPut(
        hotelId: string,
        photoId: string,
        requestBody: HotelPhotosUpdateRequest,
    ): CancelablePromise<HotelPhotosResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/hotels/{hotel_id}/photos/{photo_id}',
            path: {
                'hotel_id': hotelId,
                'photo_id': photoId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Photos By Id
     * Delete photos by id. Applicable for Administrative accounts
     * @param hotelId
     * @param photoId
     * @returns StatusResponse Successful Response
     * @throws ApiError
     */
    public static deletePhotosByIdApiV1HotelsHotelIdPhotosPhotoIdDelete(
        hotelId: string,
        photoId: string,
    ): CancelablePromise<StatusResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/hotels/{hotel_id}/photos/{photo_id}',
            path: {
                'hotel_id': hotelId,
                'photo_id': photoId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
