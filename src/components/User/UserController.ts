import Koa from 'koa';
import { AppError } from '../../utils/AppError';
import { UserService } from './UserService';
import { UserNoPathParam, PostUserParams, PutUserParams } from './User';
import { AppRes } from '../../utils/AppRes';
import { RES_CODE } from '../../utils';

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
	let appRes = new AppRes({});
	try {
		let pathParam = await UserNoPathParam.validateAsync({ userNo: ctx.params.userNo });
		return await UserService.getUserByPk(pathParam.userNo, {});
	} catch (err) {
		new AppError('CgetUser', err.message, err.stack, err.appRes, err.detail);
		return appRes;
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
	let appRes = new AppRes({ userList: [] });
	try {
		const svrRes = await UserService.getUserList({});
		if (svrRes.code !== RES_CODE.SUC) {
			return appRes;
		}

		return appRes.setData({ userList: svrRes.data });
	} catch (err) {
		new AppError('CgetUserList', err.message, err.stack, err.appRes, err.detail);
		return appRes;
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
	let appRes = new AppRes();
	try {
		let params = await PostUserParams.validateAsync(ctx.request.body);
		await UserService.insertUser(params);
		return appRes;
	} catch (err) {
		throw new AppError('CpostUser', err.message, err.stack, err.appRes);
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
	let appRes = new AppRes();
	try {
		let pathParam = await UserNoPathParam.validateAsync({ userNo: ctx.params.userNo });
		let params = await PutUserParams.validateAsync(ctx.request.body);
		await UserService.updateUser(pathParam.userNo, params);
		return appRes;
	} catch (err) {
		throw new AppError('CputUser', err.message, err.stack, err.appRes);
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
	let appRes = new AppRes();
	try {
		let pathParam = await UserNoPathParam.validateAsync({ userNo: ctx.params.userNo });
		await UserService.deleteUser(pathParam.userNo);
		return appRes;
	} catch (err) {
		throw new AppError('CdeleteUser', err.message, err.stack, err.appRes);
	}
};

export const UserController = { getUserList, getUser, postUser, putUser, deleteUser };
