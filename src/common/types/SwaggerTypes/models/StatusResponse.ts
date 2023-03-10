/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type StatusResponse = {
    status: StatusResponse.status;
    details?: string;
};

export namespace StatusResponse {

    export enum status {
        OK = 'ok',
        FAIL = 'fail',
    }


}
