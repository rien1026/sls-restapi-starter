import { Table, Model, Column, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import Joi from '@hapi/joi';

@Table({ tableName: 'User' })
export class User extends Model<User> {
	@Column({ type: DataType.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true, comment: '번호' })
	public no: number;

	@Column({ type: DataType.STRING, allowNull: false, defaultValue: '', comment: '아이디' })
	public email: string;

	@Column({ type: DataType.STRING, allowNull: false, defaultValue: '', comment: '암호' })
	public passwd: string;

	@CreatedAt
	@Column({ type: DataType.DATE, comment: '등록일' })
	public inDt: Date;

	@UpdatedAt
	@Column({ type: DataType.DATE, comment: '수정일' })
	public upDt: Date;
}
/**
 * @swagger
 * components:
 *   schemas:
 *     PostUserSchema:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: email
 *         passwd:
 *           type: string
 *           example: passwd
 *       required:
 *         - email
 *         - passwd
 *
 *   parameters:
 *     PostUserParams:
 *       name: PostUserParams
 *       in: body
 *       description: params for insert user.
 *       required: true
 *       schema:
 *         $ref: '#components/schemas/PostUserSchema'
 */

export const PostUserParams = Joi.object({
	email: Joi.string().email().max(100).required(),
	passwd: Joi.string().required(),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     PutUserSchema:
 *       type: object
 *       properties:
 *         passwd:
 *           type: string
 *           example: passwd
 *
 *   parameters:
 *     PutUserParams:
 *       name: PutUserParams
 *       in: body
 *       description: params for update user.
 *       required: true
 *       schema:
 *         $ref: '#components/schemas/PutUserSchema'
 */

export const PutUserParams = Joi.object({
	passwd: Joi.string(),
});

/**
 * @swagger
 * components:
 *   parameters:
 *     UserNoPathParam:
 *       name: UserNo
 *       in: path
 *       required: true
 *
 */
export const UserNoPathParam = Joi.object({
	userNo: Joi.number().integer().min(1).required(),
});
