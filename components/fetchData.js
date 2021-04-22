import axios from "axios";

export const fetchData = async setTodos => {
	const data = await axios.get("/api/todos");
	const resp = data.data;
	setTodos(resp);
	return resp;
};
