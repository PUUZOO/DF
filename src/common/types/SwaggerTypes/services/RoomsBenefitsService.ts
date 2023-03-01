/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RoomBenefitsCreateRequest } from '../models/RoomBenefitsCreateRequest';
import type { RoomBenefitsLink } from '../models/RoomBenefitsLink';
import type { RoomBenefitsResponse } from '../models/RoomBenefitsResponse';
import type { RoomBenefitsUpdateRequest } from '../models/RoomBenefitsUpdateRequest';
import type { StatusResponse } from '../models/StatusResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RoomsBenefitsService {

    /**
     * Get All Benefits
     * Get all room benefits. Applicable only for Druffler user
     * @returns RoomBenefitsResponse Successful Response
     * @throws ApiError
     */
    public static getAllBenefitsApiV1RoomsBenefitsGet(): CancelablePromise<Array<RoomBenefitsResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/rooms/benefits',
        });
    }

    /**
     * Create Benefits
     * Create new room benefits. Applicable only for Druffler user
     * @param requestBody
     * @returns RoomBenefitsResponse Successful Response
     * @throws ApiError
     */
    public static createBenefitsApiV1RoomsBenefitsPost(
        requestBody: RoomBenefitsCreateRequest,
    ): CancelablePromise<RoomBenefitsResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/rooms/benefits',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Link Benefits
     * Create Room-Benefit link. Applicable only for Administrative user only
     * @param requestBody
     * @returns StatusResponse Successful Response
     * @throws ApiError
     */
    public static linkBenefitsApiV1RoomsBenefitsLinkPost(
        requestBody: RoomBenefitsLink,
    ): CancelablePromise<StatusResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/rooms/benefits/link',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Benefits Link
     * Delete Room-Benefit link. Applicable only for Administrative user only
     * @param requestBody
     * @returns StatusResponse Successful Response
     * @throws ApiError
     */
    public static deleteBenefitsLinkApiV1RoomsBenefitsUnlinkPost(
        requestBody: RoomBenefitsLink,
    ): CancelablePromise<StatusResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/rooms/benefits/unlink',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Active Benefits
     * Get all active room benefits. Applicable for Administrative accounts
     * @returns RoomBenefitsResponse Successful Response
     * @throws ApiError
     */
    public static getActiveBenefitsApiV1RoomsBenefitsActiveGet(): CancelablePromise<Array<RoomBenefitsResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/rooms/benefits/active',
        });
    }

    /**
     * Update Benefits
     * Update room benefit by benefit_id. Applicable only for Druffler user
     * @param benefitId
     * @param requestBody
     * @returns RoomBenefitsResponse Successful Response
     * @throws ApiError
     */
    public static updateBenefitsApiV1RoomsBenefitsBenefitIdPut(
        benefitId: string,
        requestBody: RoomBenefitsUpdateRequest,
    ): CancelablePromise<RoomBenefitsResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/rooms/benefits/{benefit_id}',
            path: {
                'benefit_id': benefitId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
