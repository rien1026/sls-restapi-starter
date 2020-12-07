export const logger = {
	info: async (info: {}) => {
		console.log(JSON.stringify(info));

		// invoke log module like winston.
	},
	error: async (error: {}) => {
		console.error(JSON.stringify(error));

		// invoke log module like winston.
	},
};
