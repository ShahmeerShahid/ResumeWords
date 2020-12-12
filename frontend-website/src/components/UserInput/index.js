import React, { useEffect } from "react";
import {
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

function UserInput({
  url,
  num_words,
  isLoading,
  errors,
  handleSubmit,
  setFieldValue,
  validateURL,
  asyncError,
}) {
  function renderURLValidationIcon() {
    const isValid = validateURL();
    if (url.length === 0) {
      return null;
    } else if (!isValid) {
      return <CloseIcon color="red.500" />;
    } else {
      return <CheckIcon color="green.500" />;
    }
  }
  const toast = useToast();
  useEffect(() => {
    if (asyncError) {
      toast({
        title: "An error occurred.",
        description: asyncError,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setFieldValue("asyncError", null);
    }
  }, [asyncError, setFieldValue, toast]);

  return (
    <div style={{ paddingTop: "2vw" }}>
      <FormLabel>URL:</FormLabel>
      <InputGroup size="lg">
        <Input
          pr="6rem"
          placeholder="Link to job posting"
          value={url}
          onChange={(e) => setFieldValue("url", e.target.value)}
        />
        {!validateURL() ? (
          <InputRightElement
            onClick={() => {
              setFieldValue("url", "");
            }}
            style={{ cursor: "pointer" }}
            children={renderURLValidationIcon()}
          />
        ) : null}
      </InputGroup>
      <Text style={{ color: "red" }}>{errors && errors.url}</Text>
      <br></br>
      <FormLabel># of keywords:</FormLabel>
      <Stack mt={4} direction="row" spacing="12px" justify="center">
        <NumberInput
          aria-label="number of keywords"
          width="75%"
          min={0}
          max={50}
          value={num_words}
          onChange={(value) => setFieldValue("num_words", value)}
        >
          <NumberInputField aria-label="keyword-num-input" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button
          aria-label="submit button"
          colorScheme="green"
          width="25%"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {!isLoading ? "Submit" : <Spinner size="md" />}
        </Button>
        <Text style={{ color: "red" }}>{errors && errors.num_words}</Text>
      </Stack>
    </div>
  );
}

export default UserInput;
