import Todo from "./Todo";

const ListOfTodos = ({ todos, handleDelete, handleComplete }) => {
	return (
		<ul>
			{todos.map((todo, index) => {
				return (
					<Todo
						todo={todo}
						key={index}
						handleDelete={handleDelete}
						handleComplete={handleComplete}
					/>
				);
			})}
		</ul>
	);
};

export default ListOfTodos;
