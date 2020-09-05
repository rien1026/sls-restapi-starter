import { logger } from './Logger';
import { Constants } from './Constants';

export class AppError extends Error {
	errCode?: number;
	responseCode?: number;
	isProgrammerErr?: boolean;
	logging?: boolean;

	constructor(
		name: string,
		message: string,
		stack: string,
		errDetail: { errCode?: number; responseCode?: number; isProgrammerErr?: boolean; logging?: boolean } = {},
	) {
		super();
		this.name = name;
		this.message = message;
		this.stack = stack;
		this.responseCode = errDetail.responseCode;
		this.errCode = errDetail.errCode;
		this.isProgrammerErr = errDetail.isProgrammerErr;
		this.logging = typeof errDetail.logging === 'boolean' ? errDetail.logging : true;

		this.doAfterErr();
	}

	doAfterErr = () => {
		if (Constants.PROD_MODE === 'prod' && !this.logging) {
			return;
		}
		logger.error({
			e: this.name + ': ' + this.message,
			message: ' ',
			errCode: this.errCode,
			responseCode: this.responseCode,
			isProgrammerErr: this.isProgrammerErr,
		});
	};
}
