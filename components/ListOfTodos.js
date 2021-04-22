import Todo from "./Todo";
import { ErrorContainer } from "../styles/Global";

const ListOfTodos = ({
	todos,
	error,
	errorMessage = `Oops, there was a problem when connecting to the database. Make sure that the json-server is running.`,
	handleDelete,
	handleComplete,
}) => {
	return (
		<>
			{error ? (
				<ErrorContainer>{errorMessage}</ErrorContainer>
			) : (
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
			)}
		</>
	);
};

export default ListOfTodos;
