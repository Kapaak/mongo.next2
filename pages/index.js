import React, { useState, useEffect } from "react";
import { connectToDatabase } from "../util/mongodb";
import axios from "axios";
import toast from "react-hot-toast";
//components
import Form from "../components/Form";
import ListOfTodos from "../components/ListOfTodos";
//styles
import { FlexContainer } from "../styles/Global";

const fetchData = async () => {
	const data = await axios.get("/api/todos");
	const resp = data.data;
	return resp;
};

export default function Home({ isConnected }) {
	const [todos, setTodos] = useState([]);
	const [error, setError] = useState(false);
	const notifySubmit = text => toast.success(text);
	const notifyError = text => toast.error(text);

	useEffect(() => {
		fetchData().then(resp => setTodos(resp));
		console.log("refetched");
	}, [todos.length]);

	const handleSubmit = async (todo, date) => {
		try {
			const resp = await axios.post("/api/todos", {
				todo,
				date,
				completed: false,
			});
			console.log(resp.statusText);
			// if (resp.statusText === "OK") {
			setTodos(prevTodos => [...prevTodos, { todo, date, completed: false }]);
			console.log(todos);
			console.log("created");
			notifySubmit("Submited");
			// }
		} catch (err) {
			notifyError(err.message);
		}
	};

	const handleDelete = async todoDelete => {
		try {
			const resp = await axios.delete("/api/todos", { data: todoDelete });
			console.log(resp.statusText);
			if (resp.statusText === "OK") {
				const newTodos = [...todos].filter(todo => todo !== todoDelete);
				setTodos(newTodos);
				notifySubmit("Successfully deleted");
			}
		} catch (err) {
			notifyError(err.message);
		}
	};

	const handleComplete = async todo => {
		const newTodo = { ...todo, completed: !todo.completed };

		try {
			const resp = await axios.put("/api/todos", newTodo);

			if (resp.statusText === "OK") {
				const newTodos = [...todos];
				newTodos.map(el =>
					el === todo ? (el.completed = !el.completed) : null
				);
				setTodos(newTodos);
				notifySubmit("Task updated!");
			}
		} catch (err) {
			notifyError(err.message);
		}
	};

	return (
		<FlexContainer>
			<h1>this is my database!</h1>
			<div>
				<Form handleSubmit={handleSubmit} />
				<ListOfTodos
					todos={todos}
					error={error}
					handleDelete={handleDelete}
					handleComplete={handleComplete}
				/>
			</div>
		</FlexContainer>
	);
}

export async function getServerSideProps(context) {
	const { client } = await connectToDatabase();

	const isConnected = await client.isConnected();

	return {
		props: { isConnected },
	};
}
