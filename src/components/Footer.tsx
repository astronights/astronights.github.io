import { Box, Container, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Footer = () => {

  const gcUrl = 'https://astronights.goatcounter.com/counter//.json'

  const [visitCount, setVisitCount] = useState(42);

  useEffect(() => {
    axios.get(gcUrl).then(res => {
      setVisitCount(res.data?.count || 42);
    });
  }, []);

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
        <Text textAlign={'center'}>Design inspired by a template from {" "}
          <Link href='https://github.com/eldoraboo'>https://github.com/eldoraboo
          </Link>
        </Text>
      </Container>
    </Box>
  );
}

export default Footer;