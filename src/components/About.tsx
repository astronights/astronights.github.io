import {
    Divider,
    Stack,
    Text,
    Container,
    Box,
    HStack,
  } from "@chakra-ui/react";
  import ProfileArray from "../arrays/ProfileArray";
  
  const About = (props: {color: string}) => {
    const profile = ProfileArray();
      return (
        <>
          <Container maxW={"4xl"} id="about">
            <Stack
              as={Box}
              textAlign={"center"}
              spacing={{ base: 8, md: 14 }}
              pb={{ base: 20, md: 16 }}
            >
              <Stack align="center" direction="row" px={4}>
                <HStack mx={4}>
                  <Text color={`${props.color}.400`} fontWeight={800}>
                    01
                  </Text>
                  <Text fontWeight={800}>About</Text>
                </HStack>
                <Divider orientation="horizontal" />
              </Stack>
              <Text color={"gray.600"} fontSize={"xl"} px={4}>
                {profile.about}
              </Text>
            </Stack>
          </Container>
        </>
      );
  }

export default About;