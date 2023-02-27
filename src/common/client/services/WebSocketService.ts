/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WebSocketService {

    /**
     * Notify
     * Notify all websocket clients
 *
 * {
     * msg_type: 0,   # MessageType.new
     * order: {
         * order_id: <uuid>,
         * created_at: <time>,
         * owner: None,
         * info: {}    # order info
         * }
         * }
     * @returns any Successful Response
     * @throws ApiError
     */
    public static notifyApiV1WsNotifyGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/ws/notify',
        });
    }

}
