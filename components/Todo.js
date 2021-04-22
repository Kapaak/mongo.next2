import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../components/utils/formatDate";

const Todo = ({ todo, handleDelete, handleComplete }) => {
	return (
		<li className={todo.completed ? "completed" : ""}>
			<div className="text">
				<span className="todo">{todo.todo}</span>
				<span className="date">{formatDate(todo.date)}</span>
			</div>
			<div className="buttons">
				<button className="btn complete" onClick={() => handleComplete(todo)}>
					<FontAwesomeIcon icon={faCheck} />
				</button>
				<button className="btn remove" onClick={() => handleDelete(todo)}>
					<FontAwesomeIcon icon={faTimes} />
				</button>
			</div>
		</li>
	);
};

export default Todo;
