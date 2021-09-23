
import { HTTP_RES_CODE, HTTP_RES_MSG, RES_MSG } from '.';
import { RES_CODE } from '../utils/Constants'

export class AppRes {
    data: any;
    code: RES_CODE;
    msg: string;
    httpResCode: HTTP_RES_CODE;
    httpResMsg: string;

    constructor(initData?: any) {
        this.code = RES_CODE.SUC;
        this.msg = RES_MSG[RES_CODE.SUC];
        this.data = initData;
    }


    setData = (data: any) => {
        this.data = data;
        return this;
    }

    setCode = (code: RES_CODE) => {
        this.code = code;
        this.msg = RES_MSG[code];
        return this;
    }

    setHttpResCode = (httpResCode: HTTP_RES_CODE) => {
        this.httpResCode = httpResCode;
        this.httpResMsg = HTTP_RES_MSG[httpResCode];
        return this;
    }
}