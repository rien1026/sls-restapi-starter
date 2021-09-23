import { logger } from './Logger';
import { Constants } from './Constants';

export class AppError extends Error {
	detail: {
		errCode?: number;
		responseCode?: number;
		isProgrammerErr?: boolean;
		logging?: boolean;
		additionalInfo?: any;
	};

	constructor(
		name: string,
		message: string,
		stack: string,
		detail: {
			errCode?: number;
			responseCode?: number;
			isProgrammerErr?: boolean;
			logging?: boolean;
			additionalInfo?: any;
		} = {},
	) {
		super();
		this.name = name;
		this.message = message;
		this.stack = stack;
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
			detail: this.detail,
		});
	};
}
