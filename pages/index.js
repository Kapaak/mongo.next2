import React, { useState, useEffect } from "react";
import Head from "next/head";
import { connectToDatabase } from "../util/mongodb";
import axios from "axios";

export default function Home({ isConnected }) {
	const [todos, setTodos] = useState([]);
	const fetchData = async () => {
		const data = await axios.get("/api/todos");
		const resp = data.data;
		console.log(resp);
		return resp;
	};
	const addData = async () => {
		const todo = { todo: "boom" };
		const data = await axios.post("/api/todos", todo);
		setTodos(prev => [...prev, todo]);
	};

	useEffect(() => {
		fetchData().then(resp => setTodos(resp));
	}, [todos]);

	return (
		<div>
			<h1>this is my database!</h1>
			<ul>
				{todos.map((t, i) => (
					<li key={i}>{t.todo}</li>
				))}
			</ul>
			<button onClick={addData}>Add new data</button>
		</div>
	);
}

export async function getServerSideProps(context) {
	const { client } = await connectToDatabase();

	const isConnected = await client.isConnected();

	return {
		props: { isConnected },
	};
}
