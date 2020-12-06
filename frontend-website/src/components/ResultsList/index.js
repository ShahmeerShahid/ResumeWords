import React from "react";
import {
  Box,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

function newTab(url) {
  window.open(url, "_blank");
}

function renderRow(resultsSlice) {
  return (
    <Stack mt={4} direction="row" spacing={12} justify="center">
      <StatGroup>
        {resultsSlice.map((result, index) => {
          let color = "";
          const val = parseFloat(result[1]);
          if (val > 0.2) {
            color = "green";
          } else if (val < 0.09) {
            color = "red";
          } else {
            color = "yellow";
          }
          return (
            <Stat
              style={{ cursor: "pointer" }}
              key={index}
              m={4}
              onClick={() => {
                newTab(`https://www.thesaurus.com/browse/${result[0]}`);
              }}
            >
              <StatLabel>
                {result[0].charAt(0).toUpperCase() + result[0].slice(1)}
              </StatLabel>
              <StatNumber color={useColorModeValue(`${color}.500`)}>
                {result[1]}
              </StatNumber>
            </Stat>
          );
        })}
      </StatGroup>
    </Stack>
  );
}

function renderResults(results) {
  const arr = Object.entries(results);
  let rows = [];
  let i = 0;
  for (i = 0; i < arr.length; i += 5) {
    rows[rows.length] = arr.slice(i, i + 5);
  }
  return rows.map((row) => {
    return renderRow(row);
  });
}

function ResultsList({ results }) {
  return (
    <>
      {results.length !== 0 && (
         <Box p={5} shadow="md" borderWidth="1px">
          <Text opacity={0.8} fontSize={{ base: "lg", lg: "xl" }} mt="1">
            By comparing your posting to 20 000+ other job postings, we identified these key words as being highly
            desired. 
          </Text>
          <Text opacity={0.8} fontSize={{ base: "lg", lg: "xl" }} mt="1">
          The scores are a measure of how frequently a keyword was used in the provided job posting compared to its typical frequency.
          </Text>
          </Box>
      )}

      {results.length !== 0 && renderResults(results)}
    </>
  );
}

export default ResultsList;
