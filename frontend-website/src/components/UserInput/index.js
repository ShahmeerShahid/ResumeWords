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
  useToast
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
    }
  }, [asyncError, toast])
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
					width="75%"
					min={0}
					max={50}
					value={num_words}
					onChange={(value) => setFieldValue("num_words", value)}
				>
					<NumberInputField />
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
				<Button
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
