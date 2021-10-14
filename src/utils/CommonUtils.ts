export const isEmpty = (obj: any) => {
	if (
		obj === null ||
		obj === undefined ||
		obj === 'null' ||
		obj === 'undefined' ||
		obj === '' ||
		(typeof obj === 'object' && Object.keys(obj).length === 0)
	)
		return true;
	return false;
};
