import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
const GlobalStyles = createGlobalStyle`
*,
*::before,
*::after {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

:root {
	--first-color: #001d3d;
	--second-color: #003566;
	--third-color: #ffc300;
	--fourth-color: #ffd60a;
	--fifth-color: #f7f7f7;

	--first-font: "Barlow", sans-serif;
}
html {
	font-size: 62.5%;
}

body {
	font-size: 1.6rem;
    font-family: var(--first-font);
}

`;

export default GlobalStyles;

export const FlexContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	min-height: 100vh;
	width: 100%;
	background-color: var(--second-color);

	& > h1 {
		position: relative;
		z-index: 1;
		color: var(--fourth-color);
		margin-bottom: 2rem;
		&::before {
			content: "";
			width: 100%;
			height: 1.5rem;
			background-color: var(--first-color);
			position: absolute;
			bottom: -0.4rem;
			left: -1rem;
			z-index: -1;
		}
	}

	& > div {
		padding: 0 2rem;
		max-width: 100%;
		form {
			display: flex;

			button {
				background-color: var(--third-color);
				color: var(--second-color);
				border: 1px solid black;
				padding: 0 0.5rem;
				cursor: pointer;
			}
		}
		ul {
			margin-top: 4rem;
			li {
				position: relative;
				display: flex;
				list-style: none;
				border: 1px solid black;
				background-color: var(--fifth-color);
				margin-bottom: 0.5rem;

				.text {
					display: flex;
					flex-direction: column-reverse;
					padding: 0.5rem 1rem;

					.todo {
						font-size: 1.8rem;
					}

					.date {
						font-size: 1.3rem;
						min-width: 5rem;
					}
				}

				.buttons {
					margin-left: auto;

					.btn {
						height: 100%;
						width: 5rem;
						border: none;
						cursor: pointer;
						outline: none;
					}
				}
			}

			.completed {
				&::before {
					content: "";
					position: absolute;
					left: -1rem;
					bottom: 15%;
					width: 50%;
					height: 0.8rem;
					background-color: var(--third-color);
					transform: rotate(10deg);
				}

				.btn {
					&.complete {
						background-color: var(--third-color);
					}
				}
			}
		}
	}
`;

export const ErrorContainer = styled.div`
	color: white;
	position: absolute;
	max-width: 60rem;
	background: black;
	padding: 4rem;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1000;
`;
