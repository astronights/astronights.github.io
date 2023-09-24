import {
    Container, Stack, Box, HStack, Text, Divider, Card, SimpleGrid, CardBody,
    Heading, Image, CardHeader, Flex, List, ListIcon, ListItem, Center
} from "@chakra-ui/react";
import SkillsArray from "../arrays/SkillsArray";
import { ChevronRightIcon } from "@chakra-ui/icons";
// import { useEffect, useState } from "react";

const Skills = (props: { color: string }) => {
    const skills = SkillsArray();

    const midFw = Math.floor(Object.keys(skills.technology.frameworks).length / 2);

    return (
        <>
            <Container maxW={"4xl"} id="skills">
                <Stack
                    as={Box}
                    textAlign={"center"}
                    spacing={{ base: 8, md: 8 }}
                    pb={{ base: 20, md: 16 }}
                >
                    <Stack align="center" direction="row" p={4}>
                        <HStack mx={4}>
                            <Text color={`${props.color}.400`} fontWeight={800}>
                                05
                            </Text>
                            <Text fontWeight={800}>Skills</Text>
                        </HStack>
                        <Divider orientation="horizontal" />
                    </Stack>
                    <SimpleGrid columns={[1, 2]} px={4} spacing={4}>
                        <Card key={'programming-languages'}>
                            <Stack>
                                <CardHeader pb={0}>
                                    <Heading textAlign='left' size="sm">{'Programming Languages'}</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Flex>
                                        <List spacing={1}>
                                            {Object.keys(skills.technology.languages).map((lang, i) => (
                                                <ListItem key={lang} textAlign={'left'}>
                                                    <ListIcon
                                                        boxSize={6}
                                                        as={ChevronRightIcon}
                                                        color={`${props.color}.500`}
                                                    />
                                                    {lang}
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Flex>
                                </CardBody>
                            </Stack>
                        </Card>
                        <Card key={'frameworks'}>
                            <Stack>
                                <CardHeader pb={0}>
                                    <Heading textAlign='left' size="sm">{'Frameworks Extensively Used'}</Heading>
                                </CardHeader>
                                <CardBody>
                                    <SimpleGrid columns={[1,2]} px={1} spacing={1}>
                                        <List key={'left'} spacing={1.5}>
                                            {Object.keys(skills.technology.frameworks).slice(0, midFw).map((fw) => (
                                                <ListItem key={fw} textAlign={'left'}>
                                                    <SimpleGrid columns={2} px={1} spacing={1}>
                                                        <Image src={skills.technology.frameworks[fw]} alt={fw} maxHeight={'1.5em'} />
                                                        <Text>{fw}</Text>
                                                    </SimpleGrid>
                                                </ListItem>
                                            ))}
                                        </List>
                                        <List key={'right'} spacing={1.5} float={'right'}>
                                            {Object.keys(skills.technology.frameworks).slice(midFw).map((fw) => (
                                                <ListItem key={fw} textAlign={'left'}>
                                                    <SimpleGrid columns={2} px={1} spacing={1}>
                                                        <Image src={skills.technology.frameworks[fw]} alt={fw} maxHeight={'1.5em'} />
                                                        <Text>{fw}</Text>
                                                    </SimpleGrid>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </SimpleGrid>
                                </CardBody>
                            </Stack>
                        </Card>
                    </SimpleGrid>
                </Stack>
            </Container>
        </>);
}

export default Skills;