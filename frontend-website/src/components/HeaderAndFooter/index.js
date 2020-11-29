import React from "react";
import {
  Box,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue,
  chakra,
} from "@chakra-ui/react";
import { VscGithubInverted } from "react-icons/vsc";

export function Header() {
  return (
    <>
      <chakra.h1
        fontSize={{ base: "2.25rem", sm: "3rem", lg: "3.75rem" }}
        letterSpacing="tight"
        fontWeight="bold"
        lineHeight="1.2"
      >
        Resume
        <Box as="span" color={useColorModeValue("teal.500", "teal.300")}>
          Words
        </Box>
      </chakra.h1>
      <Text opacity={0.5} fontSize={{ base: "sm", lg: "md" }}>
        AI powered keyword extraction
      </Text>
      <Box p={5} shadow="md" borderWidth="1px" mt="6">
        <Text opacity={0.8} fontSize={{ base: "lg", lg: "xl" }}>
          <Text as="strong">Resume</Text>
          <Box as="span" color={useColorModeValue("teal.500", "teal.300")}>
            Words
          </Box>{" "}
          analyzes job descriptions using machine learning & informs you of
          keywords you should include in your resume or cover letter when
          applying.
        </Text>
        <Text opacity={0.8} fontSize={{ base: "lg", lg: "xl" }} mt="6">
          Paste the URL below, click "Submit", and wait for the results!
        </Text>
      </Box>
    </>
  );
}

export function Footer() {
  const links = [
    {
      label: "Github",
      icon: VscGithubInverted,
      url: "https://github.com/ShahmeerShahid/ResumeWords/",
    },
  ];

  return (
    <>
      <Box as="footer" mt={12} height="100%" textAlign="center" className="app">
        <Text fontSize="sm">
          Made with{" "}
          <span aria-label="heart" role="img">
            &#128153;
          </span>{" "}
          by{" "}
          <Link href="https://ca.linkedin.com/in/shahmeer-shahid" isExternal>
            Shahmeer Shahid
          </Link>
          ,{" "}
          <Link
            href="https://www.linkedin.com/in/lazar-lolic-207779184/"
            isExternal
          >
            Lazar Lolic
          </Link>
          , &{" "}
          <Link href="http://jarrodservilla.com" isExternal>
            Jarrod Servilla
          </Link>
        </Text>
        <Stack mt={4} direction="row" spacing="12px" justify="center" mb={10}>
          {links.map((link, index) => {
            return (
              <Link
                key={index}
                display="inline-block"
                href={link.url}
                aria-label={link.label}
                isExternal
              >
                <Icon as={link.icon} fontSize="xl" color="gray.400" />
              </Link>
            );
          })}
        </Stack>
      </Box>
    </>
  );
}
