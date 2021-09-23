import Koa from 'koa';
import koabody from 'koa-body';
import cors from '@koa/cors';
import Router from 'koa-router';
import swaggerUi from 'swagger-ui-koa';
import serverless from 'serverless-http';
import mount from 'koa-mount';
import { swaggerSpec } from './configs';
import { UserController } from './components/User/UserController';
import { HTTP_RES_CODE, HTTP_RES_MSG, PROD_MODE, RES_CODE } from './utils';
import { AppRes } from './utils/AppRes';

const app = new Koa();
const router = new Router();

// it can be used with router by specific option.
app.use(koabody());
app.use(cors());
app.use(mount('/app', swaggerUi.serve));

// api-docs
if (PROD_MODE != 'prod') {
	router.get('/app/api-docs', swaggerUi.setup(swaggerSpec));
}

// after middleware
app.use(async (ctx: Koa.Context, next: Koa.Next) => {
	try {
		console.log(ctx.request.method + '---' + ctx.request.url);
		const res = await next() as AppRes;

		if (!res) {
			ctx.status = HTTP_RES_CODE.BAD_REQUEST;
			ctx.body = HTTP_RES_MSG[HTTP_RES_CODE.BAD_REQUEST];
			return;
		}

		ctx.status = res.httpResCode || HTTP_RES_CODE.SUC;
		ctx.body = { msg: res.msg, code: res.code, data: res.data };
	} catch (err) {
		const appRes = err.appRes || { httpResCode: HTTP_RES_CODE.INTERNAL_SERVER_ERROR, msg: HTTP_RES_MSG[HTTP_RES_CODE.INTERNAL_SERVER_ERROR] }
		ctx.status = appRes.httpResCode;
		ctx.body = { msg: appRes.msg, code: appRes.code };
	}
});

// users
router.get('/app/users', UserController.getUserList);
router.get('/app/users/:userNo', UserController.getUser);
router.post('/app/users', UserController.postUser);
router.put('/app/users/:userNo', UserController.putUser);
router.delete('/app/users/:userNo', UserController.deleteUser);

app.use(router.routes());
app.use(router.allowedMethods());

if (PROD_MODE === 'local') {
	app.listen(3000, () => {
		console.log({ i: '[SERVER] is listening.', mode: PROD_MODE, port: 3000 });
	});
}

export const appHandler = serverless(app);
