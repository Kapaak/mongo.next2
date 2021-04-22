export const formatDate = date => {
	let dateFormat = new Date(date);
	return new Intl.DateTimeFormat("en-GB", {
		dateStyle: "full",
	}).format(dateFormat);
};
