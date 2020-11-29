import React from "react";
import {
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
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
  return <>{results !== {} && renderResults(results)}</>;
}

export default ResultsList;
