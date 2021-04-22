import Global from "../styles/Global";
import { Toaster } from "react-hot-toast";

const MyApp = ({ Component, pageProps }) => {
	return (
		<>
			<Global />
			<Toaster />
			<Component {...pageProps} />
		</>
	);
};

export default MyApp;
