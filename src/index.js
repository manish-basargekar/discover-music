import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const { REACT_APP_STEPZEN_API_KEY, REACT_APP_STEPZEN_ENDPOINT } = process.env;




const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: REACT_APP_STEPZEN_ENDPOINT,
	headers: {
		Authorization: `Apikey ${REACT_APP_STEPZEN_API_KEY}
`,
	},
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById("root")
);
