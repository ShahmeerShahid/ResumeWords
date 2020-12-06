import React from "react";
import { Box, Container, ChakraProvider } from "@chakra-ui/react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Header, Footer } from "./components/HeaderAndFooter";
import ExampleLinks from "./components/ExampleLinks";
import UserInput from "./components/UserInput";
import ResultsList from "./components/ResultsList";
import "./App.css";

const APIgateway = "https://gateway-service-fvwxmbq4sq-ue.a.run.app";

const ERR_MSGS = {
  urlMissing: "URL is required",
  numWordsMissing: "# of keywords is required",
  urlInvalid: "Invalid URL format",
};

const supportedSites = ["linkedin", "indeed", "monster"];

const Schema = Yup.object().shape({
  url: Yup.string()
    .url(ERR_MSGS.urlInvalid)
    .required(ERR_MSGS.urlMissing)
    .test("supportedSite", "Domain is not supported", (value, context) => {
      const domain = value.split(".")[1].toLowerCase();
      return supportedSites.includes(domain);
    }),
  num_words: Yup.number().required(ERR_MSGS.numWordsMissing),
});

function UnconnectedApp({ errors, handleSubmit, setFieldValue, values }) {
  const url = values.url;
  const num_words = values.num_words;
  const asyncError = values.asyncError;

  function validateURL() {
    try {
      Schema.validateSyncAt("url", { url: url });
      return true;
    } catch (e) {
      return false;
    }
  }

  let styles = {
    main: {
      display: "flex",
      justifyContent: "center",
      width: "100vw",
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
          <Box
            textAlign="center"
            display="flex"
            flexDirection="column"
            id="centerBox"
          >
            <Header />
            <UserInput
              url={url}
              num_words={num_words}
              isLoading={values.isLoading}
              errors={errors}
              handleSubmit={handleSubmit}
              setFieldValue={setFieldValue}
              validateURL={validateURL}
              asyncError={asyncError}
            />
            <ExampleLinks setFieldValue={setFieldValue} />
            <ResultsList results={values.results} />
            <Footer />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export const EnhancedApp = withFormik({
  enableReinitialize: true,
  handleSubmit: async ({ url, num_words }, { setFieldValue }) => {
    setFieldValue("isLoading", true);
    var encoded_url = encodeURIComponent(url);
    const request = `/keywords/${encoded_url}/${num_words}`;
    fetch(APIgateway + request) // APIgateway + request
      .then(async (res) => {
        if (res.status !== 200) {
          const message = await res.text();
          throw new Error(message);
        }
        setFieldValue("isLoading", false);
        return res.json();
      })
      .then((data) => {
        setFieldValue("asyncError", null);
        setFieldValue("results", data);
      })
      .catch((e) => {
        setFieldValue("isLoading", false);
        setFieldValue("asyncError", e.message);
        return {
          error: true,
          status: e.response && e.response.status,
          message: e.response && e.response.data,
        };
      });
  },
  mapPropsToValues: (props) => ({
    url: "",
    num_words: 10,
    results: [],
    isLoading: false,
  }),
  validationSchema: () => Schema,
  validateOnBlur: false,
  validateOnChange: false,
})(UnconnectedApp);

function App() {
  return (
    <ChakraProvider>
      <EnhancedApp />
    </ChakraProvider>
  );
}

export default App;
