/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_create_photos_api_v1_rooms__room_id__photos_post } from '../models/Body_create_photos_api_v1_rooms__room_id__photos_post';
import type { RoomPhotosResponse } from '../models/RoomPhotosResponse';
import type { RoomPhotosUpdateRequest } from '../models/RoomPhotosUpdateRequest';
import type { StatusResponse } from '../models/StatusResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RoomsPhotosService {

    /**
     * Get Photos By Room Id
     * Get photos by room id. Applicable for Administrative accounts
     * @param roomId 
     * @returns RoomPhotosResponse Successful Response
     * @throws ApiError
     */
    public static getPhotosByRoomIdApiV1RoomsRoomIdPhotosGet(
roomId: string,
): CancelablePromise<Array<RoomPhotosResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/rooms/{room_id}/photos',
            path: {
                'room_id': roomId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Photos
     * Create new room photos. Applicable for Administrative account
     * @param roomId 
     * @param formData 
     * @returns RoomPhotosResponse Successful Response
     * @throws ApiError
     */
    public static createPhotosApiV1RoomsRoomIdPhotosPost(
roomId: string,
formData: Body_create_photos_api_v1_rooms__room_id__photos_post,
): CancelablePromise<RoomPhotosResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/rooms/{room_id}/photos',
            path: {
                'room_id': roomId,
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
     * Get photos by room id. Applicable for Administrative accounts
     * @param photoId 
     * @param requestBody 
     * @returns RoomPhotosResponse Successful Response
     * @throws ApiError
     */
    public static updatePhotosByIdApiV1RoomsRoomIdPhotosPhotoIdPut(
photoId: string,
requestBody: RoomPhotosUpdateRequest,
): CancelablePromise<RoomPhotosResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/rooms/{room_id}/photos/{photo_id}',
            path: {
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
     * @param roomId 
     * @param photoId 
     * @returns StatusResponse Successful Response
     * @throws ApiError
     */
    public static deletePhotosByIdApiV1RoomsRoomIdPhotosPhotoIdDelete(
roomId: string,
photoId: string,
): CancelablePromise<StatusResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/rooms/{room_id}/photos/{photo_id}',
            path: {
                'room_id': roomId,
                'photo_id': photoId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
