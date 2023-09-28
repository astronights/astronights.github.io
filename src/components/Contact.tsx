import {
  Divider, Stack, Text, Container, Box, HStack, Heading,
  Center, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, StatGroup
} from "@chakra-ui/react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import ProfileArray from "../arrays/ProfileArray";
import { useState, useEffect } from "react";

const Contact = (props: { color: string }) => {
  const profile = ProfileArray();
  const linkedin = () => {
    window.open(`${profile.linkedin}`, "_blank", "noreferrer,noopener");
  };
  const github = () => {
    window.open(`${profile.github}`, "_blank", "noreferrer,noopener");
  };
  const email = () => {
    window.open(`mailto:${profile.email}`, "_blank", "noreferrer,noopener");
  };

  const [views, setViews] = useState(42);

  useEffect(() => {
    setViews(42 + Math.floor(Math.random() * (21 + 1)));
  }, [views]);

  return (
    <>
      <Container maxW={"4xl"} id="contact">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 16 }}
        >
          <Stack align="center" direction="row" p={4}>
            <HStack mx={4}>
              <Text color={`${props.color}.400`} fontWeight={800}>
                07
              </Text>
              <Text fontWeight={800}>Contact</Text>
            </HStack>
            <Divider orientation="horizontal" />
          </Stack>
          <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
            <Heading fontSize={"3xl"}>Let's stay in touch!</Heading>
            <Text color={"gray.600"} fontSize={"xl"} px={4}>
              {profile.contact}
            </Text>
            <Text color={`${props.color}.500`} fontWeight={600} fontSize={"lg"} px={4}>
              {profile.email}
            </Text>
            <Center>
              <HStack pt={4} spacing={4}>
                <FaLinkedin style={{ 'cursor': 'pointer' }} onClick={linkedin} size={28} />
                <FaGithub style={{ 'cursor': 'pointer' }} onClick={github} size={28} />
                <FaEnvelope style={{ 'cursor': 'pointer' }} onClick={email} size={28} />
              </HStack>
            </Center>
            <Center >
              <StatGroup marginTop={2} px={4} py={1}
                borderColor={"#b3aeae2e"} borderWidth={1} borderRadius={3}>
                <Stat>
                  <StatLabel>Page Visits</StatLabel>
                  <StatNumber>{views}</StatNumber>
                  <StatHelpText>
                    <StatArrow type='increase' />
                    {Math.round((views - 42)*10000/42)/100}%
                  </StatHelpText>
                </Stat>
              </StatGroup>
            </Center>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default Contact;