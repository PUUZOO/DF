/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderCreateRequest } from '../models/OrderCreateRequest';
import type { OrderDeclineRequest } from '../models/OrderDeclineRequest';
import type { OrderFullResponse } from '../models/OrderFullResponse';
import type { OrderUpdateRequest } from '../models/OrderUpdateRequest';
import type { StatusResponse } from '../models/StatusResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OrdersAdminApiService {

    /**
     * Get Order Status Types
     * Get order statuses types. Applicable Public
     * @returns string Successful Response
     * @throws ApiError
     */
    public static getOrderStatusTypesApiV1OrdersTypesGet(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/orders/types',
        });
    }

    /**
     * Create Order By Hotel Id
     * Create order. Applicable only for admin
     * @param hotelId
     * @param requestBody
     * @returns OrderFullResponse Successful Response
     * @throws ApiError
     */
    public static createOrderByHotelIdApiV1OrdersHotelIdPost(
        hotelId: string,
        requestBody: OrderCreateRequest,
    ): CancelablePromise<OrderFullResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/orders/{hotel_id}',
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
     * Get All Active Orders By Hotel Id
     * Get all active orders (new, in-progress and completed, declined today)
     * Applicable only for users
     * @param hotelId
     * @returns OrderFullResponse Successful Response
     * @throws ApiError
     */
    public static getAllActiveOrdersByHotelIdApiV1OrdersHotelIdActiveGet(
        hotelId: string,
    ): CancelablePromise<Array<OrderFullResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/orders/{hotel_id}/active',
            path: {
                'hotel_id': hotelId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Order Details By Id
     * Get order by id. Applicable only for admin
     * @param orderId
     * @returns OrderFullResponse Successful Response
     * @throws ApiError
     */
    public static getOrderDetailsByIdApiV1OrdersOrderIdGet(
        orderId: string,
    ): CancelablePromise<OrderFullResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/orders/{order_id}',
            path: {
                'order_id': orderId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Take Order By Id
     * Take order by id. Applicable only for admin
     * @param orderId
     * @returns StatusResponse Successful Response
     * @throws ApiError
     */
    public static takeOrderByIdApiV1OrdersOrderIdTakeGet(
        orderId: string,
    ): CancelablePromise<StatusResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/orders/{order_id}/take',
            path: {
                'order_id': orderId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Edit Order By Id
     * Edit order by id. Applicable only for admin
     * @param orderId
     * @param requestBody
     * @returns OrderFullResponse Successful Response
     * @throws ApiError
     */
    public static editOrderByIdApiV1OrdersOrderIdEditPut(
        orderId: string,
        requestBody: OrderUpdateRequest,
    ): CancelablePromise<OrderFullResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/orders/{order_id}/edit',
            path: {
                'order_id': orderId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Complete Order By Id
     * Complete order by id. Applicable only for admin
     * @param orderId
     * @returns OrderFullResponse Successful Response
     * @throws ApiError
     */
    public static completeOrderByIdApiV1OrdersOrderIdCompletePut(
        orderId: string,
    ): CancelablePromise<OrderFullResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/orders/{order_id}/complete',
            path: {
                'order_id': orderId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Decline Order By Id
     * Decline order by id. Applicable only for admin
     * @param orderId
     * @param requestBody
     * @returns OrderFullResponse Successful Response
     * @throws ApiError
     */
    public static declineOrderByIdApiV1OrdersOrderIdDeclinePut(
        orderId: string,
        requestBody: OrderDeclineRequest,
    ): CancelablePromise<OrderFullResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/orders/{order_id}/decline',
            path: {
                'order_id': orderId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
