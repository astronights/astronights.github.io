import {
    Container, Stack, Box, HStack, Text, Divider, Card, SimpleGrid, CardBody,
    Heading, Image, CardHeader, Flex, List, ListIcon, ListItem, Grid, GridItem,
} from "@chakra-ui/react";
import SkillsArray from "../arrays/SkillsArray";
import { ChevronRightIcon } from "@chakra-ui/icons";
// import { useEffect, useState } from "react";

const Skills = (props: { color: string }) => {
    const skills = SkillsArray();

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
                                    <Heading textAlign='left' size="sm">{'Frameworks Recently Used'}</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Flex>
                                        <List spacing={1}>
                                            <Grid>
                                                {Object.keys(skills.technology.frameworks).map((fw, i) => (
                                                    <GridItem key={fw}>
                                                        <Image src={skills.technology.frameworks[fw]} alt={fw} maxHeight={'5em'} />
                                                    </GridItem>
                                                ))}
                                            </Grid>
                                        </List>
                                    </Flex>
                                </CardBody>
                            </Stack>
                        </Card>
                    </SimpleGrid>
                </Stack>
            </Container>
        </>);
}

export default Skills;