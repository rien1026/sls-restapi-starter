import { logger } from './Logger';
import { Constants } from './Constants';

export class AppError extends Error {
	detail: { errCode?: number; responseCode?: number; isProgrammerErr?: boolean; logging?: boolean; additionalInfo?: any };

	constructor(
		name: string,
		message: string,
		stack: string,
		detail: { errCode?: number; responseCode?: number; isProgrammerErr?: boolean; logging?: boolean; additionalInfo?: any } = {},
	) {
		super();
		this.name = name;
		this.message = message;
		this.stack = stack;
		this.detail = detail;
		this.detail.logging = typeof detail.logging === 'boolean' ? detail.logging : true;

		this.doAfterErr();
	}

	doAfterErr = () => {
		if (Constants.PROD_MODE === 'prod' && !this.detail.logging) {
			return;
		}
		logger.error({
			e: this.name + ': ' + this.message,
			message: ' ',
			detail: this.detail,
		});
	};
}
