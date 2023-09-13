import {
  Divider, Stack, Text, Container, Box, HStack, Card, CardHeader, CardBody, CardFooter, Flex, Badge,
  Image, List, ListItem, ListIcon, Button, ButtonGroup, Center
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";
import EducationArray from "../arrays/EducationArray";
import EduNeuralNet from "./EduNeuralNet";

export default function Education({ color }) {
  const education = EducationArray();
  const [selected, setSelected] = useState([]);
  const options = education.filter((edu) =>
    Number.isInteger(edu.node) && edu.node > 0).map((edu) => ({ node: edu.node, title: edu.title }));

  const handleSelected = (value: number) => {
    const picks = education.filter((edu) => (edu.node - value < 1) &&
      (edu.node >= value)).map((edu) => (edu.node));
    const intersection = selected.filter((val) => picks.includes(val));
    if (intersection.length > 0) {
      setSelected(selected.filter((val) => !intersection.includes(val)));
    } else {
      setSelected([...selected, ...picks]);
    }
  };

  return (
    <>
      <Container maxW={"3xl"} id="Education">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align="center" direction="row" px={4}>
            <HStack mx={4}>
              <Text color={`${color}.400`} fontWeight={800}>
                02
              </Text>
              <Text fontWeight={800}>Education</Text>
            </HStack>
            <Divider orientation="horizontal" />
          </Stack>
          <Center px={4}>
            <EduNeuralNet education={education}/>
          </Center>
          <Center px={4}>
            <ButtonGroup variant="outline">
              {options.map((option) => (
                <Button
                  key={option.node}
                  colorScheme={selected.includes(option.node) ? `${color}` : "gray"}
                  onClick={() => handleSelected(option.node)}
                >
                  {option.title}
                </Button>
              ))}
            </ButtonGroup>
          </Center>
          <Stack px={4} spacing={4}>
            {education
              .filter((edu) => selected.includes(edu.node))
              .map((edu) => (
                <Card key={edu.title} size="sm">
                  <CardHeader>
                    <Flex justifyContent="space-between">
                      <HStack>
                        <Image src={edu.image} h={50} />
                        <Box px={2} >
                          <Text align='left' fontWeight={600}>{edu.degree}</Text>
                          <Text align='left'>{edu.institution}</Text>
                        </Box>
                      </HStack>
                      <Box px={2}>
                        <Text align='left' fontWeight={300}>{edu.period}</Text>
                        <Text align='left' fontWeight={300}>{edu.grade}</Text>
                      </Box>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <Flex>
                      <List spacing={1}>
                        {edu.description.map((item, index) => (
                          <ListItem key={index} textAlign={'left'}>
                            <ListIcon
                              boxSize={6}
                              as={ChevronRightIcon}
                              color={`${color}.500`}
                            />
                            {item}
                          </ListItem>
                        ))}
                      </List>
                    </Flex>
                  </CardBody>
                  <CardFooter>
                    <HStack spacing={2}>
                      {edu.badges.map((badge) => (
                        <Badge
                          key={badge}
                          colorScheme={'blue'}
                        >
                          {badge}
                        </Badge>
                      ))}
                    </HStack>
                  </CardFooter>
                </Card>
              ))}
          </Stack>
        </Stack>
      </Container>
    </>
  );
}