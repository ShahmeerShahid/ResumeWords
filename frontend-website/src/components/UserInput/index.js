import React from "react";
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

  return (
    <div style={{ paddingTop: "2vw" }}>
      <FormLabel>URL:</FormLabel>
      <InputGroup size="lg">
        <Input
          aria-label="URL"
          pr="6rem"
          placeholder="Link to job posting"
          value={url}
          onChange={(e) => setFieldValue("url", e.target.value)}
        />
        <InputRightElement
          style={{ paddingLeft: "7vw" }}
          width="7rem"
          children={renderURLValidationIcon()}
        />
      </InputGroup>
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
      </Stack>
      <Text style={{ color: "red" }}>{errors && errors.url}</Text>
    </div>
  );
}

export default UserInput;
