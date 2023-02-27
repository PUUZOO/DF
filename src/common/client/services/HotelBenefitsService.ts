/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HotelBenefitsCreateRequest } from '../models/HotelBenefitsCreateRequest';
import type { HotelBenefitsLink } from '../models/HotelBenefitsLink';
import type { HotelBenefitsResponse } from '../models/HotelBenefitsResponse';
import type { HotelBenefitsUpdateRequest } from '../models/HotelBenefitsUpdateRequest';
import type { StatusResponse } from '../models/StatusResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class HotelBenefitsService {

    /**
     * Get All Benefits
     * Get all hotel benefits. Applicable only for Druffler user
     * @returns HotelBenefitsResponse Successful Response
     * @throws ApiError
     */
    public static getAllBenefitsApiV1HotelsBenefitsGet(): CancelablePromise<Array<HotelBenefitsResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/hotels/benefits',
        });
    }

    /**
     * Create Benefits
     * Create new hotel benefits. Applicable only for Druffler user
     * @param requestBody 
     * @returns HotelBenefitsResponse Successful Response
     * @throws ApiError
     */
    public static createBenefitsApiV1HotelsBenefitsPost(
requestBody: HotelBenefitsCreateRequest,
): CancelablePromise<HotelBenefitsResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/hotels/benefits',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Link Benefits
     * Create Hotel-Benefit link. Applicable only for Administrative user only
     * @param requestBody 
     * @returns StatusResponse Successful Response
     * @throws ApiError
     */
    public static linkBenefitsApiV1HotelsBenefitsLinkPost(
requestBody: HotelBenefitsLink,
): CancelablePromise<StatusResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/hotels/benefits/link',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Benefits Link
     * Delete Hotel-Benefit link. Applicable only for Administrative user only
     * @param requestBody 
     * @returns StatusResponse Successful Response
     * @throws ApiError
     */
    public static deleteBenefitsLinkApiV1HotelsBenefitsLinkDelete(
requestBody: HotelBenefitsLink,
): CancelablePromise<StatusResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/hotels/benefits/link',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Active Benefits
     * Get all active hotel benefits. Applicable for Administrative accounts
     * @returns HotelBenefitsResponse Successful Response
     * @throws ApiError
     */
    public static getActiveBenefitsApiV1HotelsBenefitsActiveGet(): CancelablePromise<Array<HotelBenefitsResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/hotels/benefits/active',
        });
    }

    /**
     * Update Benefits
     * Update hotel benefit by benefit_id. Applicable only for Druffler user
     * @param benefitId 
     * @param requestBody 
     * @returns HotelBenefitsResponse Successful Response
     * @throws ApiError
     */
    public static updateBenefitsApiV1HotelsBenefitsBenefitIdPut(
benefitId: string,
requestBody: HotelBenefitsUpdateRequest,
): CancelablePromise<HotelBenefitsResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/hotels/benefits/{benefit_id}',
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
