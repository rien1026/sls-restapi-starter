import { logger } from './Logger';

export class AppError extends Error {
	errCode?: number;
	responseCode?: number;
	isOperational?: boolean;

	constructor(
		name: string,
		message: string,
		stack: string,
		{
			errCode,
			responseCode,
			isOperational = false,
		}: { errCode?: number; responseCode?: number; isOperational?: boolean },
	) {
		super();
		this.name = name;
		this.message = message;
		this.stack = stack;
		this.responseCode = responseCode;
		this.errCode = errCode;
		this.isOperational = isOperational;

		this.doAfterErr();
	}

	doAfterErr = () => {
		logger.error({
			e: this.name + ': ' + this.message,
			message: ' ',
			errCode: this.errCode,
			responseCode: this.responseCode,
			isOperational: this.isOperational,
		});
	};
}
