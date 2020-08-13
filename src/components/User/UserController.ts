import Koa from 'koa';
import { AppError } from '../../utils/AppError';

/**
 * @swagger
 * components:
 *   schemas:
 *     UserSchema:
 *       type: object
 *       properties:
 *         no:
 *           type: number
 *         id:
 *           type: string
 *           format: id
 *         nickname:
 *           type: string
 *
 * /users/:userNo:
 *   get:
 *     tags: [User]
 *     responses:
 *       200:
 *         description: SUC
 *         type: object
 *         properties:
 *           msg:
 *             type: string
 *             example: suc
 *           data:
 *             $ref: '#components/schemas/UserSchema'
 *
 */
const getUser = async (ctx: Koa.Context) => {
	try {
		let user = { no: 1, id: 'user@user.com', nickname: 'nickname' };
		ctx.status = 200;
		ctx.body = { msg: 'suc', data: user };
	} catch (err) {
		throw new AppError('CgetUser', err.message, err.stack, {
			errCode: err.errCode,
			responseCode: err.responseCode,
		});
	}
};

export const UserController = { getUser };
