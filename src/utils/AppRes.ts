import { HTTP_RES_CODE, RES_MSG, RES_CODE } from '.';

export class AppRes {
	data: any;
	code: RES_CODE;
	msg: string;
	httpResCode: HTTP_RES_CODE;

	constructor(initData?: any) {
		this.code = RES_CODE.SUC;
		this.msg = RES_MSG[RES_CODE.SUC];
		this.data = initData;
	}

	setData = (data: any) => {
		this.data = data;
		return this;
	};

	setCode = (code: RES_CODE) => {
		this.code = code;
		this.msg = RES_MSG[code];
		this.httpResCode = HTTP_RES_CODE.BAD_REQUEST;
		return this;
	};

	setHttpResCode = (httpResCode: HTTP_RES_CODE) => {
		this.httpResCode = httpResCode;
		this.msg = RES_MSG[httpResCode];
		this.code = RES_CODE.FAIL;
		return this;
	};

	setMsg = (msg) => {
		this.msg = msg;
		return this;
	};
}
