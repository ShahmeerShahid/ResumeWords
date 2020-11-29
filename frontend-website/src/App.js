import React from "react";
import { Box, Container, ChakraProvider } from "@chakra-ui/react";
import { withFormik } from "formik";
import { SnackbarProvider } from "notistack";
//import { useAsync } from "react-async";
import * as Yup from "yup";
import { Header, Footer } from "./components/HeaderAndFooter";
import ExampleLinks from "./components/ExampleLinks";
import UserInput from "./components/UserInput";
//import { getResults } from "./requests";
import "./App.css";

const ERR_MSGS = {
	urlMissing: "URL is required",
	numWordsMissing: "# of keywords is required",
	urlInvalid: "Invalid URL format",
};

const Schema = Yup.object().shape({
	url: Yup.string().url(ERR_MSGS.urlInvalid).required(ERR_MSGS.urlMissing),
	num_words: Yup.number().required(ERR_MSGS.numWordsMissing),
});

function UnconnectedApp({
	enqueueSnackBar,
	errors,
	handleSubmit,
	setFieldValue,
	values,
}) {
	const url = values.url;
	const num_words = values.num_words;
	/*
  const { execute, status, value, error } = useAsync(getResults, {
    url: url,
  });*/

	function validateURL() {
		try {
			Schema.validateSyncAt("url", { url: url });
			return true;
		} catch (e) {
			console.log(e);
			return false;
		}
	}

	let styles = {
		main: {
			display: "flex",
			justifyContent: "center",
			width: "auto",
			// width:"760px"
			// height: "100vh",
			// top: "0",
			// right: "0",
			// bottom: "0",
			// left: "0",
			// position: "absolute",
			// margin: "auto"
			// overflow: "scroll",
		},
	};

	return (
		<>
			<Container as="div" style={styles.main}>
				<Box
					as="section"
					pt={{ base: "4rem", md: "6rem" }}
					pb={{ base: "0", md: "5rem" }}
					width="100vw"
				>
					<Box textAlign="center" display="flex" flexDirection="column">
						<Header />
						<UserInput
							url={url}
							num_words={num_words}
							errors={errors}
							handleSubmit={handleSubmit}
							setFieldValue={setFieldValue}
							validateURL={validateURL}
						/>
						<ExampleLinks setFieldValue={setFieldValue} />
						<Footer />
					</Box>
				</Box>
			</Container>
		</>
	);
}

export const EnhancedApp = withFormik({
	enableReinitialize: true,
	handleSubmit: ({ url, num_words }) => {
		console.log({
			url,
			num_words,
		});
	},
	mapPropsToValues: (props) => ({
		url: "",
		num_words: 0,
	}),
	validationSchema: () => Schema,
	validateOnBlur: false,
	validateOnChange: false,
})(UnconnectedApp);

function App() {
	return (
		<ChakraProvider>
			<SnackbarProvider>
				<EnhancedApp />
			</SnackbarProvider>
		</ChakraProvider>
	);
}

export default App;
