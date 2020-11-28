import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { withFormik } from "formik";
import { SnackbarProvider } from "notistack";
import { useAsync } from "react-async";
import * as Yup from "yup";
import ExampleLinks from "./components/ExampleLinks";
import URLForm from "./components/URLForm";
import { getResults } from "./requests";
import "./App.css";

const Schema = Yup.object().shape({
  url: Yup.string().url().required()
});


function UnconnectedApp({ enqueueSnackBar, setFieldValue, values }) {
  const { execute, status, value, error } = useAsync(getResults, { url: values.url });
  
    return (
        <div>
        <center>
          <Box>
            <Text>
              {" "}
              Welcome to ResumeWords{" "}
            </Text>{" "}
            <br />
            <Text>
              Paste URL below, click "Submit" and wait for your results. Make
              sure to include those words in your resume or cover letter!
            </Text>{" "}
            <br />
            <URLForm/>
            <ExampleLinks />
          </Box>
        </center>
      </div>
    );
}

export const EnhancedApp = withFormik({
  enableReinitialize: true,
  handleSubmit: ({
    url
  }) => {
    console.log({
      url
    });
  },
  mapPropsToValues: (props) => ({
    url: "",
  }),
  validationSchema: () => Schema,
  validateOnBlur: false,
  validateOnChange: false,
})(UnconnectedApp);

function App() {
    return (
        <ChakraProvider>
          <SnackbarProvider>
            <EnhancedApp/>
          </SnackbarProvider>
        </ChakraProvider>
    );
}

export default App;
