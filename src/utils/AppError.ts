import { HTTP_RES_CODE, RES_CODE } from '.';
import { AppRes } from './AppRes';
import { logger } from './Logger';

export class AppError extends Error {
	appRes: AppRes;
	detail: {
		logging?: boolean;
		addInfo?: any;
	};

	constructor(
		name: string,
		message: string,
		stack: string,
		appRes: AppRes,
		detail: {
			logging?: boolean;
			addInfo?: any;
		} = {},
	) {
		super();
		this.name = name;
		this.message = message;
		this.stack = stack;
		this.appRes = appRes || (new AppRes()).setCode(RES_CODE.FAIL).setHttpResCode(HTTP_RES_CODE.INTERNAL_SERVER_ERROR);
		this.detail = detail;

		this.doAfterErr();
	}

	doAfterErr = () => {
		if (this.detail.logging === false) {
			return;
		}

		logger.error({
			e: this.name + ': ' + this.message,
			message: ' ',
			appRes: this.appRes,
			detail: this.detail,
		});
	};
}
