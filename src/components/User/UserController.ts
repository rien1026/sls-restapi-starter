import Koa from 'koa';
import { AppError } from '../../utils/AppError';
import { UserService } from './UserService';
import { UserNoPathParam, PostUserParams, PutUserParams } from './User';
import { HTTP_RES } from '../../utils';

/**
 * @swagger
 * components:
 *   schemas:
 *     UserSchema:
 *       type: object
 *       properties:
 *         no:
 *           type: number
 *         email:
 *           type: string
 *           format: email
 *
 * /users/:userNo:
 *   get:
 *     tags: [User]
 *     parameters:
 *       - $ref: '#components/parameters/UserNoPathParam'
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
		let pathParam = await UserNoPathParam.validateAsync({ userNo: ctx.params.userNo });
		let user = await UserService.getUserByPk(pathParam.userNo, {});

		ctx.status = HTTP_RES.SUC;
		ctx.body = { msg: HTTP_RES.SUC_MSG, data: user || {} };
	} catch (err) {
		throw new AppError('CgetUser', err.message, err.stack, {
			errCode: err.errCode,
			responseCode: err.responseCode,
		});
	}
};

/**
 * @swagger
 * components:
 *   schemas:
 *     UserListItemSchema:
 *       type: object
 *       properties:
 *         no:
 *           type: number
 *         email:
 *           type: string
 *           format: email
 *
 * /users:
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
 *             type: array
 *             items:
 *               $ref: '#components/schemas/UserListItemSchema'
 *
 */
const getUserList = async (ctx: Koa.Context) => {
	try {
		let userList = await UserService.getUserList({});

		ctx.status = HTTP_RES.SUC;
		ctx.body = { msg: HTTP_RES.SUC_MSG, data: userList };
	} catch (err) {
		throw new AppError('CgetUserList', err.message, err.stack, {
			errCode: err.errCode,
			responseCode: err.responseCode,
		});
	}
};

/**
 * @swagger
 *
 * /users:
 *   post:
 *     tags: [User]
 *     responses:
 *       200:
 *         description: SUC
 *         type: object
 *         properties:
 *           msg:
 *             type: string
 *             example: suc
 *
 */
const postUser = async (ctx: Koa.Context) => {
	try {
		let params = await PostUserParams.validateAsync(ctx.request.body);

		// insert User
		await UserService.insertUser(params);

		ctx.status = HTTP_RES.SUC;
		ctx.body = { msg: HTTP_RES.SUC_MSG };
	} catch (err) {
		throw new AppError('CpostUser', err.message, err.stack, {
			errCode: err.errCode,
			responseCode: err.responseCode,
		});
	}
};

/**
 * @swagger
 *
 * /users/:userNo:
 *   put:
 *     tags: [User]
 *     parameters:
 *       - $ref: '#components/parameters/UserNoPathParam'
 *       - $ref: '#components/parameters/PutUserParams'
 *     responses:
 *       200:
 *         description: SUC
 *         type: object
 *         properties:
 *           msg:
 *             type: string
 *             example: suc
 *
 */
const putUser = async (ctx: Koa.Context) => {
	try {
		let pathParam = await UserNoPathParam.validateAsync({ userNo: ctx.params.userNo });
		let params = await PutUserParams.validateAsync(ctx.request.body);

		// update User
		await UserService.updateUser(pathParam.userNo, params);

		ctx.status = HTTP_RES.SUC;
		ctx.body = { msg: HTTP_RES.SUC_MSG };
	} catch (err) {
		throw new AppError('CputUser', err.message, err.stack, {
			errCode: err.errCode,
			responseCode: err.responseCode,
		});
	}
};

/**
 * @swagger
 *
 * /users/:userNo:
 *   delete:
 *     tags: [User]
 *     parameters:
 *       - $ref: '#components/parameters/UserNoPathParam'
 *     responses:
 *       200:
 *         description: SUC
 *         type: object
 *         properties:
 *           msg:
 *             type: string
 *             example: suc
 *
 */
const deleteUser = async (ctx: Koa.Context) => {
	try {
		let pathParam = await UserNoPathParam.validateAsync({ userNo: ctx.params.userNo });

		// delete User
		await UserService.deleteUser(pathParam.userNo);

		ctx.status = HTTP_RES.SUC;
		ctx.body = { msg: HTTP_RES.SUC_MSG };
	} catch (err) {
		throw new AppError('CdeleteUser', err.message, err.stack, {
			errCode: err.errCode,
			responseCode: err.responseCode,
		});
	}
};

export const UserController = { getUserList, getUser, postUser, putUser, deleteUser };
