export const PROD_MODE = (process.env['PROD_MODE'] as any) || 'local';

// system
export const API_INFO = {
	TITLE: 'API',
	URI: 'http://localhost:3000',
	VERSION: '1.0.0',
};

export const DB_CONFIG = {
	MYSQL_HOST: '',
	MYSQL_DB: '',
	MYSQL_PORT: '',
	MYSQL_USER: '',
	MYSQL_PASSWD: '',
};

export const COMMON = {
	SESSION_SECRET: 'P@ssw0rd',
};

// enum
export enum RES_CODE {
	SUC = 100,
	FAIL = 101,
}

export const RES_MSG = Object.freeze({
	100: 'suc',
	101: 'fail',
	200: 'OK',
	400: 'Bad Request',
	401: 'Unauthorized',
	404: 'Not Found',
	500: 'Internal Server Error',
});

export enum HTTP_RES_CODE {
	SUC = 200,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	NOT_FOUND = 404,
	INTERNAL_SERVER_ERROR = 500,
}
