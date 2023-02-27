/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Base Model: should be Parent for every database model
 */
export type HotelAccommodations = {
    created_at?: string;
    updated_at?: string;
    id?: string;
    hotel_id: string;
    check_in: string;
    check_out: string;
    breakfast_start?: string;
    breakfast_end?: string;
    weekend_breakfast_start?: string;
    weekend_breakfast_end?: string;
    children_allowed: boolean;
    children_age_range: string;
    children_cost: string;
    home_pet_allowed: boolean;
    pet_weight: string;
    pet_deposit: string;
};
