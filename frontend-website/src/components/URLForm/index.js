import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

function URLForm() {
  return (
    <FormControl isRequired>
      <FormLabel>First name</FormLabel>
      <Input placeholder="First name" />
    </FormControl>
  );
}

export default URLForm;
