import {
  Divider, Stack, Text, Container, Box, HStack, Card, CardHeader, CardBody, CardFooter, Flex, Badge,
  Image, List, ListItem, ListIcon, Center, Collapse, Code
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import EducationArray from "../arrays/EducationArray";
import EduNeuralNet from "./EduNeuralNet";
import { Study } from "../types";

const Education = (props: {color: string}) => {
  const education = EducationArray();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const selected = education.map((edu) => (edu.node));
    setSelected(selected);
  }, [education]);

  const handleSelected = (value: number) => {
    const picks = education.filter((edu) =>
      value === (Number.isInteger(value) ? Math.floor(edu.node) : edu.node)).map((edu) => (edu.node));
    const intersection = selected.filter((val) => picks.includes(val));
    if (intersection.length > 0) {
      setSelected(selected.filter((val) => !intersection.includes(val)));
    } else {
      setSelected([...selected, ...picks]);
    }
  };

  const eduSort = (a: Study, b: Study) => {
    const inta = Number.isInteger(a.node)
    const intb = Number.isInteger(b.node)

    if (((inta && !intb) || (!inta && intb)) && Math.floor(a.node) === Math.floor(b.node)) {
      return a.node < b.node ? -1 : 1;
    } else {
      return a.node < b.node ? 1 : -1;
    }
  }

  return (
    <>
      <Container maxW={"4xl"} id="education">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 16 }}
        >
          <Stack align="center" direction="row" px={4}>
            <HStack mx={4}>
              <Text color={`${props.color}.400`} fontWeight={800}>
                03
              </Text>
              <Text fontWeight={800}>Education</Text>
            </HStack>
            <Divider orientation="horizontal" />
          </Stack>
          <Center px={4}>
            { window.visualViewport.width > 768 ? 
            <EduNeuralNet education={education} color={props.color}
            updateSelected={handleSelected} selected={selected}/> : 
            <Code>&lt;p&gt; A Neural Network rendition of my education, optimized for widescreen views. &lt;p&gt;</Code> }
          </Center>
          <Stack px={4} spacing={4}>
            {education
              .sort(eduSort)
              .map((edu) => (
                <Collapse in={selected.includes(edu.node)} animateOpacity key={edu.title}>
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
                              color={`${props.color}.500`}
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
                </Collapse>
              ))}
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default Education;