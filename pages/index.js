import React, { useState, useEffect } from "react";
import { connectToDatabase } from "../util/mongodb";
import axios from "axios";
//components
import Form from "../components/Form";
import ListOfTodos from "../components/ListOfTodos";
import { fetchData } from "../components/fetchData";
import { notifyError, notifySubmit } from "../components/notifications";
//styles
import { FlexContainer, ErrorContainer } from "../styles/Global";

export default function Home({ isConnected }) {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetchData(setTodos);
		console.log("refetched");
	}, [todos.length]);

	const handleSubmit = async (todo, date) => {
		try {
			const resp = await axios.post("/api/todos", {
				todo,
				date,
				completed: false,
			});
			if ((resp.status = 200)) {
				setTodos(prevTodos => [...prevTodos, { todo, date, completed: false }]);
				notifySubmit("Submited");
			}
		} catch (err) {
			notifyError(err.message);
		}
	};

	const handleDelete = async todoDelete => {
		try {
			const resp = await axios.delete("/api/todos", { data: todoDelete });
			console.log(resp.statusText);
			if (resp.status === 200) {
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

			if (resp.status === 200) {
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
			<h1>This is my task list.</h1>
			{isConnected ? (
				<div>
					<Form handleSubmit={handleSubmit} />
					<ListOfTodos
						todos={todos}
						handleDelete={handleDelete}
						handleComplete={handleComplete}
					/>
				</div>
			) : (
				<ErrorContainer>
					No database connection, try to refresh the page.
				</ErrorContainer>
			)}
		</FlexContainer>
	);
}

export async function getStaticProps(context) {
	const { client } = await connectToDatabase();

	const isConnected = await client.isConnected();

	return {
		props: { isConnected },
		revalidate: 1,
		//nefacha, na co presne tahle funkce je ?
	};
}
