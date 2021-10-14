import { Sequelize } from 'sequelize-typescript';
import { User } from '../components/User';

import { DB_CONFIG, PROD_MODE } from '../utils';

export const sequelize = new Sequelize({
	host: DB_CONFIG.MYSQL_HOST,
	database: DB_CONFIG.MYSQL_DB,
	port: Number(DB_CONFIG.MYSQL_PORT),
	dialect: 'mysql',
	username: DB_CONFIG.MYSQL_USER,
	password: DB_CONFIG.MYSQL_PASSWD,
	storage: ':memory:',
	logging: PROD_MODE === 'local' ? console.log : false,
	models: [],
});

export const configSequelize = async () => {
	console.log({
		i: '[MYSQL] is configured.',
		host: DB_CONFIG.MYSQL_HOST,
		port: DB_CONFIG.MYSQL_PORT,
		db: DB_CONFIG.MYSQL_DB,
	});

	if (PROD_MODE === 'prod') {
		return;
	}

	// await sequelize.sync();
};
