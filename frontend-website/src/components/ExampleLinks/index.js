import React from "react";
import { Button, Text, SimpleGrid } from "@chakra-ui/react";

const buttonWidth = "170px";

const exampleButtons = [
	{
		name: "LinkedIn",
		link: "https://www.linkedin.com/jobs/view/2255261986",
	},
	{
		name: "Indeed",
		link:
			"https://ca.indeed.com/viewjob?jk=0573fd7c2855c8e3&tk=1eo98g5too2f6800&from=serp&vjs=3",
	},
	{
		name: "Monster",
		link:
			"https://job-openings.monster.ca/sr-finanial-analyst-langley-bc-ca-thomson-technology/221727383",
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
					<div style={styles.buttonContainer}>
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
					</div>
				))}
			</SimpleGrid>
		</div>
	);
}

export default ExampleLinks;
