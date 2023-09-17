import {
    Container, Stack, Box, HStack, Text, Divider,
    Card, SimpleGrid, CardBody, Heading, Link, Badge, CardHeader, Flex, Button,
} from "@chakra-ui/react";
// import SkillsArray from "../arrays/SkillsArray";
import { ChevronRightIcon, LinkIcon, LockIcon } from "@chakra-ui/icons";
import { useState } from "react";

const Skills = (props: { color: string }) => {
    const skills = []//SkillsArray();

    return (
        <>
            <Container maxW={"4xl"} id="projects">
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
                        {skills.filter((project) => project.node > 0).map((project) => (
                            <Card key={project.title}>
                                <Stack>
                                    <CardHeader pb={0}>
                                        <Flex justifyContent="space-between">
                                            <Heading textAlign='left' size="sm">{project.title}</Heading>
                                            <Box>
                                                {project.link ? (

                                                    <Button size='xs' leftIcon={<LinkIcon />} colorScheme={props.color}>
                                                        <Link href={project.link} isExternal>Link</Link>
                                                    </Button>

                                                ) : <Button size='xs' isDisabled={true} leftIcon={<LockIcon />} colorScheme={props.color}></Button>}
                                            </Box>
                                        </Flex>
                                    </CardHeader>
                                    <CardBody textAlign="left" h={[null, "40vh"]} pt={0} pb={0}>
                                        <Text fontSize="sm" py={2}>
                                            {project.description}
                                        </Text>
                                        <HStack flexWrap="wrap" pt={1} spacing={1}>
                                            {project.badges.map((badge) => (
                                                <Badge
                                                    my={2}
                                                    key={badge}
                                                    colorScheme={'blue'}
                                                >
                                                    {badge}
                                                </Badge>
                                            ))}
                                        </HStack>
                                    </CardBody>
                                </Stack>
                            </Card>
                        ))}
                    </SimpleGrid>
                    
                </Stack>
            </Container>
        </>);
}

export default Skills;