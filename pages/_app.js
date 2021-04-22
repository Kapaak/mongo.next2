import Global from "../styles/Global";

const MyApp = ({ Component, pageProps }) => {
	return (
		<>
			<Global />
			<Component {...pageProps} />
		</>
	);
};

export default MyApp;
