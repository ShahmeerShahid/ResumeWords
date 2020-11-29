import React from "react";
import { Button, ButtonGroup, Text } from "@chakra-ui/react";
import { AiFillLinkedin } from "react-icons/ai";
import { SiIndeed, SiMonster } from "react-icons/si";

const buttonWidth = "170px";

const exampleButtons = [
  {
    name: "LinkedIn",
    logo: AiFillLinkedin,
    link: "https://www.linkedin.com/jobs/view/2320257000",
  },
  {
    name: "Indeed",
    logo: SiIndeed,
    link:
      "https://ca.indeed.com/viewjob?jk=8b4d91c8af8bb0e0&tk=1e8e4ut16584q800&from=serp&vjs=3&advn=3565145538192372&adid=254279523&sjdu=i6xVERweJM_pVUvgf-MzuSNjPrzy7_LNnt0n8OvPVhl69iaJUOxN_OOj2lFqvl9K",
  },
  {
    name: "Monster",
    logo: SiMonster,
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
            <button.logo /> {button.name}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}

export default ExampleLinks;
