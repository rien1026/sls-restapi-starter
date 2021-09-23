import { AppError, HTTP_RES_CODE, RES_CODE } from '../../utils';
import { AppRes } from '../../utils/AppRes';
import { User } from './User';

const getUserList = async ({
	limit = 5,
	offset = 0,
	attributes = ['*'],
}: {
	attributes?: string[];
	limit?: number;
	offset?: number;
}) => {
	const appRes = new AppRes([]);
	try {
		return appRes;
	} catch (err) {
		new AppError('SgetUserList', err.message, err.stack, err.appRes, err.detail);
		return appRes;
	}
};

const getUserByPk = async (userNo: number, { attributes = ['*'] }: { attributes?: string[] }) => {
	const appRes = new AppRes([]);
	try {
		return appRes;
	} catch (err) {
		new AppError('SgetUser', err.message, err.stack, err.appRes, err.detail);
		return appRes;
	}
};

const insertUser = async (params: { email: string; passwd: string; salt?: string }) => {
	const appRes = new AppRes();
	try {
		return appRes;
	} catch (err) {
		throw new AppError('SinsertUser', err.message, err.stack, err.appRes, err.detail);
	}
};

const updateUser = async (userNo: number, updateInfo: { passwd?: string; salt?: string }) => {
	const appRes = new AppRes();
	try {
		return appRes;
	} catch (err) {
		throw new AppError('SupdateUser', err.message, err.stack, err.appRes, err.detail);
	}
};

const deleteUser = async (userNo: number) => {
	const appRes = new AppRes();
	try {
		return appRes;
	} catch (err) {
		throw new AppError('SdeleteUser', err.message, err.stack, err.appRes, err.detail);
	}
};

export const UserService = { getUserByPk, getUserList, insertUser, deleteUser, updateUser };
