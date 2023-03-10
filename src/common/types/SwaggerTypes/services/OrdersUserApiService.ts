/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderCreateRequest } from '../models/OrderCreateRequest';
import type { OrderFullResponse } from '../models/OrderFullResponse';
import type { OrderPrice } from '../models/OrderPrice';
import type { StatusResponse } from '../models/StatusResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OrdersUserApiService {

    /**
     * Place Order
     * Place order. Applicable only for users
     * @param requestBody 
     * @returns OrderFullResponse Successful Response
     * @throws ApiError
     */
    public static placeOrderApiV1OrdersMyPost(
requestBody: OrderCreateRequest,
): CancelablePromise<OrderFullResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/orders/my/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Calculate Order Price
     * Calculate total price for order. Public link
     * @param requestBody 
     * @returns OrderPrice Successful Response
     * @throws ApiError
     */
    public static calculateOrderPriceApiV1OrdersMyPricePost(
requestBody: OrderCreateRequest,
): CancelablePromise<OrderPrice> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/orders/my/price',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get My Orders Active
     * Get user active order. Applicable only for users
     * @returns OrderFullResponse Successful Response
     * @throws ApiError
     */
    public static getMyOrdersActiveApiV1OrdersMyActiveGet(): CancelablePromise<Array<OrderFullResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/orders/my/active',
        });
    }

    /**
     * Get My Orders History
     * Get user order history. Applicable only for users
     * @param skip 
     * @param limit 
     * @returns OrderFullResponse Successful Response
     * @throws ApiError
     */
    public static getMyOrdersHistoryApiV1OrdersMyHistoryGet(
skip?: number,
limit: number = 50,
): CancelablePromise<Record<string, Array<OrderFullResponse>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/orders/my/history',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get My Order Details By Id
     * Get user order details. Applicable only for users
     * @param orderId 
     * @returns OrderFullResponse Successful Response
     * @throws ApiError
     */
    public static getMyOrderDetailsByIdApiV1OrdersMyOrderIdGet(
orderId: string,
): CancelablePromise<OrderFullResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/orders/my/{order_id}',
            path: {
                'order_id': orderId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Cancel Order By Id
     * Cancel user order. Applicable only for users
     * @param orderId 
     * @returns StatusResponse Successful Response
     * @throws ApiError
     */
    public static cancelOrderByIdApiV1OrdersMyOrderIdDelete(
orderId: string,
): CancelablePromise<StatusResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/orders/my/{order_id}',
            path: {
                'order_id': orderId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Rate Order By Id
     * Rate user order. Applicable only for users
     * @param orderId 
     * @returns OrderFullResponse Successful Response
     * @throws ApiError
     */
    public static rateOrderByIdApiV1OrdersMyOrderIdRateGet(
orderId: string,
): CancelablePromise<OrderFullResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/orders/my/{order_id}/rate',
            path: {
                'order_id': orderId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
