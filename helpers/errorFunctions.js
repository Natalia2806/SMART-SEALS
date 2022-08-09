export function getSucessResponseFormat(data) {
	const response = {
		status: true,
		data: data,
	};
	return response;
}

export function getErrorResponseFormat(message) {
	const response = {
		status: false,
		message: message,
	};
	return response;
}
