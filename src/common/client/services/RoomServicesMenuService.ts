/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_upload_menu_api_v1_room_services__room_service_id__menu_post } from '../models/Body_upload_menu_api_v1_room_services__room_service_id__menu_post';
import type { RoomServiceMenuItemResponse } from '../models/RoomServiceMenuItemResponse';
import type { RoomServiceMenuItemUpdateRequest } from '../models/RoomServiceMenuItemUpdateRequest';
import type { RoomServiceMenuResponse } from '../models/RoomServiceMenuResponse';
import type { RoomServiceMenuUpdateRequest } from '../models/RoomServiceMenuUpdateRequest';
import type { StatusResponse } from '../models/StatusResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RoomServicesMenuService {

    /**
     * Get Menu By Room Service Id
     * Get menu by room service id. Applicable for Administrative accounts
     * @param roomServiceId 
     * @returns RoomServiceMenuResponse Successful Response
     * @throws ApiError
     */
    public static getMenuByRoomServiceIdApiV1RoomServicesRoomServiceIdMenuGet(
roomServiceId: string,
): CancelablePromise<Array<RoomServiceMenuResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/room/services/{room_service_id}/menu',
            path: {
                'room_service_id': roomServiceId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Upload Menu
     * Upload menu. Applicable for Administrative account
     * @param roomServiceId 
     * @param formData 
     * @returns RoomServiceMenuResponse Successful Response
     * @throws ApiError
     */
    public static uploadMenuApiV1RoomServicesRoomServiceIdMenuPost(
roomServiceId: string,
formData: Body_upload_menu_api_v1_room_services__room_service_id__menu_post,
): CancelablePromise<Array<RoomServiceMenuResponse>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/room/services/{room_service_id}/menu',
            path: {
                'room_service_id': roomServiceId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Menu By Id
     * Update menu by id. Applicable for Administrative accounts
     * @param menuId 
     * @param requestBody 
     * @returns RoomServiceMenuResponse Successful Response
     * @throws ApiError
     */
    public static updateMenuByIdApiV1RoomServicesRoomServiceIdMenuMenuIdPut(
menuId: string,
requestBody: RoomServiceMenuUpdateRequest,
): CancelablePromise<RoomServiceMenuResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/room/services/{room_service_id}/menu/{menu_id}',
            path: {
                'menu_id': menuId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Menu By Id
     * Delete menu by id. Applicable for Administrative accounts
     * @param menuId 
     * @returns StatusResponse Successful Response
     * @throws ApiError
     */
    public static deleteMenuByIdApiV1RoomServicesRoomServiceIdMenuMenuIdDelete(
menuId: string,
): CancelablePromise<StatusResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/room/services/{room_service_id}/menu/{menu_id}',
            path: {
                'menu_id': menuId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Menu Items By Menu Id
     * Get menu items by menu id. Applicable for Administrative accounts
     * @param menuId 
     * @returns RoomServiceMenuItemResponse Successful Response
     * @throws ApiError
     */
    public static getMenuItemsByMenuIdApiV1RoomServicesRoomServiceIdMenuMenuIdItemsGet(
menuId: string,
): CancelablePromise<Array<RoomServiceMenuItemResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/room/services/{room_service_id}/menu/{menu_id}/items',
            path: {
                'menu_id': menuId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Menu Item By Id
     * Update menu item by item id. Applicable for Administrative accounts
     * @param menuItemId 
     * @param requestBody 
     * @returns RoomServiceMenuResponse Successful Response
     * @throws ApiError
     */
    public static updateMenuItemByIdApiV1RoomServicesRoomServiceIdMenuMenuIdItemsItemIdPut(
menuItemId: string,
requestBody: RoomServiceMenuItemUpdateRequest,
): CancelablePromise<RoomServiceMenuResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/room/services/{room_service_id}/menu/{menu_id}/items/{item_id}',
            query: {
                'menu_item_id': menuItemId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Menu Item By Id
     * Delete menu item by id. Applicable for Administrative accounts
     * @param menuItemId 
     * @returns StatusResponse Successful Response
     * @throws ApiError
     */
    public static deleteMenuItemByIdApiV1RoomServicesRoomServiceIdMenuMenuIdItemsItemIdDelete(
menuItemId: string,
): CancelablePromise<StatusResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/room/services/{room_service_id}/menu/{menu_id}/items/{item_id}',
            query: {
                'menu__item_id': menuItemId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
