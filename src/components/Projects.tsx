import { Container, Stack, Box, HStack, Text, Divider, Fade, Card, SimpleGrid, CardBody, Heading, Link, Badge } from "@chakra-ui/react";
import ProjectsArray from "../arrays/ProjectsArray";

const Projects = (props: { color: string }) => {
    const projects = ProjectsArray();

    return (
        <>
            <Container maxW={"4xl"} id="projects">
                <Stack
                    as={Box}
                    textAlign={"center"}
                    spacing={{ base: 8, md: 14 }}
                    pb={{ base: 20, md: 16 }}
                >
                    <Stack align="center" direction="row" p={4}>
                        <HStack mx={4}>
                            <Text color={`${props.color}.400`} fontWeight={800}>
                                04
                            </Text>
                            <Text fontWeight={800}>Projects</Text>
                        </HStack>
                        <Divider orientation="horizontal" />
                    </Stack>
                    <SimpleGrid columns={[1, 2]} px={4} spacing={4}>
                        {projects.map((project) => (
                            <Fade>
                                <Card key={project.title}>
                                    <Stack>
                                        <CardBody alignContent="left" h={[null, "40vh"]}> {/*Changed from align*/}
                                            <Heading size="sm">{project.title}</Heading>

                                            <Text fontSize="sm" py={2}>
                                                {project.description}
                                            </Text>

                                            <HStack spacing={2}>
                                                    <Link
                                                        key={project.link}
                                                        href={project.link}
                                                        color={`${props.color}.400`}
                                                    >
                                                        {project.link}
                                                    </Link>
                                            </HStack>
                                            <HStack flexWrap="wrap" pt={4} spacing={2}>
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
                            </Fade>
                        ))}
                    </SimpleGrid>
                </Stack>
            </Container>
        </>);
}

export default Projects;