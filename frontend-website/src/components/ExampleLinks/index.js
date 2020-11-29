import React from "react";
import { Button, ButtonGroup, Text } from "@chakra-ui/react";

const buttonWidth = "170px";

const exampleButtons = [
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/jobs/view/1824287174",
  },
  {
    name: "Indeed",
    link:
      "https://ca.indeed.com/viewjob?jk=8b4d91c8af8bb0e0&tk=1e8e4ut16584q800&from=serp&vjs=3&advn=3565145538192372&adid=254279523&sjdu=i6xVERweJM_pVUvgf-MzuSNjPrzy7_LNnt0n8OvPVhl69iaJUOxN_OOj2lFqvl9K",
  },
  {
    name: "Monster",
    link: "",
  },
];

function newTab(url) {
  window.open(url, "_blank");
}

function ExampleLinks({ setFieldValue }) {
  return (
    <div>
      <Text opacity={0.7} fontSize={{ base: "lg", lg: "xl" }} mt="6">
        Example Links:
      </Text>
      <ButtonGroup spacing="6">
        {exampleButtons.map((button, index) => (
          <Button
            key={index}
            colorScheme="blue"
            style={{ minWidth: buttonWidth }}
            disabled={!button.link}
            onClick={() => {
              setFieldValue("url", button.link);
              newTab(button.link);
            }}
          >
            {button.name}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}

export default ExampleLinks;
