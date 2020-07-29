import Koa from 'koa';
import koabody from 'koa-body';
import cors from '@koa/cors';
import Router from 'koa-router';
import swaggerUi from 'swagger-ui-koa';
import serverless from 'serverless-http';
import mount from 'koa-mount';
import { Constants } from './utils/Constants';
import { swaggerSpec } from './configs';
import { UserController } from './components/User/UserController';

const app = new Koa();
const router = new Router();

// it can be used with router by specific option.
app.use(koabody());
app.use(cors());
app.use(mount('/app', swaggerUi.serve));

// api-docs
if (Constants.PROD_MODE != 'prod') {
	router.get('/app/api-docs', swaggerUi.setup(swaggerSpec));
}

// handle error
app.use(async (ctx: Koa.Context, next: Koa.Next) => {
	try {
		console.log(ctx.request.method + '---' + ctx.request.url);
		await next();

		if (!ctx.status) {
			ctx.status = 404;
			ctx.body = { msg: 'Not Found.' };
		}
	} catch (err) {
		ctx.status = err.response ? err.response : 400;
		let msg = Constants.PROD_MODE === 'prod' ? 'Bad Request.' : err.message;
		ctx.body = { msg: msg, errCode: err.errCode };
	}
});

router.get('/app/users/:userNo', UserController.getUser);

app.use(router.routes());
app.use(router.allowedMethods());

if (Constants.PROD_MODE === 'local') {
	app.listen(3000, () => {
		console.log({ i: '[SERVER] is listening.', mode: Constants.PROD_MODE, port: 3000 });
	});
}

export const appHandler = serverless(app);
