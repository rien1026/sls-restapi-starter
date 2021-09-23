import * as dotenv from 'dotenv';

export const PROD_MODE = (process.env['PROD_MODE'] as any) || 'local';

switch (PROD_MODE) {
	case 'local':
		dotenv.config({ path: './.env.local' });
		break;
}

export const API_INFO = {
	URI: process.env['API_INFO_URI'],
	VERSION: process.env['API_INFO_VERSION'],
};

export const ERR_CODE = {
	USER: {
		DUPLICATED_CODE: 101,
		DUPLICATED_CODE_MSG: 'It is duplicated code.',
	},
};

export const HTTP_RES_CODE = {
	SUC: 200,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500,
};

export const HTTP_RES_MSG = {
	200: 'OK',
	400: 'Bad Request',
	401: 'Unauthorized',
	404: 'Not Found',
	500: 'Internal Server Error',
};
