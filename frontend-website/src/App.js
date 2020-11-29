import React from "react";
import { Box, Container, ChakraProvider } from "@chakra-ui/react";
import { withFormik } from "formik";
import { SnackbarProvider } from "notistack";
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
      return false;
    }
  }

  return (
    <>
      <center>
        <Box>
          <Box
            as="section"
            pt={{ base: "4rem", md: "6rem" }}
            pb={{ base: "0", md: "5rem" }}
          >
            <Container d="flex" justifyContent="center">
              <Box maxW="760px" mx="auto" textAlign="center">
                <Header />
                <UserInput
                  url={url}
                  num_words={num_words}
                  isLoading={values.isLoading}
                  errors={errors}
                  handleSubmit={handleSubmit}
                  setFieldValue={setFieldValue}
                  validateURL={validateURL}
                />
                <ResultsList results={values.results} />
                <ExampleLinks setFieldValue={setFieldValue} />
                <Footer />
              </Box>
            </Container>
          </Box>
        </Box>
      </center>
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
      .then((res) => {
        setFieldValue("isLoading", false);
        return res.json();
      })
      .then((data) => {
        setFieldValue("results", data);
      })
      .catch((e) => {
        setFieldValue("isLoading", false);
        return {
          error: true,
          status: e.response && e.response.status,
          message: e.response && e.response.data,
        };
      });
  },
  mapPropsToValues: (props) => ({
    url: "",
    num_words: 0,
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
      <SnackbarProvider>
        <EnhancedApp />
      </SnackbarProvider>
    </ChakraProvider>
  );
}

export default App;
