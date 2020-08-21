import { AppError } from '../../utils';
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
	try {
		return [];
	} catch (err) {
		new AppError('SgetUserList', err.message, err.stack);
		return [];
	}
};

const getUserByPk = async (userNo: number, { attributes = ['*'] }: { attributes?: string[] }) => {
	try {
		return {};
	} catch (err) {
		new AppError('SgetUser', err.message, err.stack);
		return undefined;
	}
};

const insertUser = async (params: { email: string; passwd: string; salt?: string }) => {
	try {
		return true;
	} catch (err) {
		throw new AppError('SinsertUser', err.message, err.stack);
	}
};

const updateUser = async (userNo: number, updateInfo: { passwd?: string; salt?: string }) => {
	try {
		return true;
	} catch (err) {
		throw new AppError('SupdateUser', err.message, err.stack);
	}
};

const deleteUser = async (userNo: number) => {
	try {
		return true;
	} catch (err) {
		throw new AppError('SdeleteUser', err.message, err.stack);
	}
};

export const UserService = { getUserByPk, getUserList, insertUser, deleteUser, updateUser };
