import { Box, Container, Stack, Text, useColorModeValue } from "@chakra-ui/react";
  
  export default function Footer() {
    return (
      <Box
        bg={useColorModeValue("gray.50", "gray.900")}
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          align="center"
        >
          <Text>Design inspired by a template From <a href='https://github.com/eldoraboo'>https://github.com/eldoraboo</a></Text>
        </Container>
      </Box>
    );
  }