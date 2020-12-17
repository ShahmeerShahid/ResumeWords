import React from "react";
import { Button, SimpleGrid, Text } from "@chakra-ui/react";
import { AiFillLinkedin } from "react-icons/ai";
import { SiIndeed, SiMonster } from "react-icons/si";

const buttonWidth = "170px";

const exampleButtons = [
  {
    name: "LinkedIn",
    logo: AiFillLinkedin,
    link: "https://www.linkedin.com/jobs/search/?currentJobId=2299377018&pivotType=jymbii",
  },
  {
    name: "Indeed",
    logo: SiIndeed,
    link:
      "https://ca.indeed.com/viewjob?jk=fa472aa5b56a5cca&tk=1eo98g5too2f6800&from=serp&vjs=3",
  },
  {
    name: "Monster",
    logo: SiMonster,
    link:
      "https://www.monster.ca/jobs/search?q=Software-Engineer&where=Toronto__2C-ON&intcid=skr_navigation_nhpso_searchMain&jobid=222764401",
  },
];

let styles = {
  buttonGrid: {
    maxWidth: "100%",
    margin: "1em auto",
  },
  buttonContainer: {
    margin: "1vh 1vw",
  },
};

function newTab(url) {
  window.open(url, "_blank");
}

function ExampleLinks({ setFieldValue }) {
  return (
    <div>
      <Text opacity={0.7} fontSize={{ base: "lg", lg: "xl" }} mt="10" mb="0">
        Example Links:
      </Text>
      <SimpleGrid style={styles.buttonGrid} columns={{ sm: 3 }}>
        {exampleButtons.map((button, index) => (
          <div style={styles.buttonContainer} key={index}>
            <Button
              key={`btn-${index}`}
              colorScheme="blue"
              style={{ minWidth: buttonWidth }}
              disabled={!button.link}
              onClick={() => {
                setFieldValue("url", button.link);
                newTab(button.link);
              }}
            >
              <button.logo mx="1vw" />
              {"\u00A0"} {button.name}
            </Button>
          </div>
        ))}
      </SimpleGrid>
    </div>
  );
}

export default ExampleLinks;
