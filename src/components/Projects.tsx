import {
    Container, Stack, Box, HStack, Text, Divider,
    Card, SimpleGrid, CardBody, Heading, Link, Badge, CardHeader, Flex, Button, List, ListItem
} from "@chakra-ui/react";
import ProjectsArray from "../arrays/ProjectsArray";
import { ChevronRightIcon, LinkIcon, LockIcon } from "@chakra-ui/icons";
import { useState } from "react";

const Projects = (props: { color: string }) => {
    const projects = ProjectsArray();

    const [otherHover, setOtherHover] = useState(0);

    const handleMouseOver = (e: any) => {
        setOtherHover(parseInt(e.currentTarget.dataset.id));
    }

    const handleMouseOut = () => {
        setOtherHover(0);
    }

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
                                04
                            </Text>
                            <Text fontWeight={800}>Projects</Text>
                        </HStack>
                        <Divider orientation="horizontal" />
                    </Stack>
                    <SimpleGrid columns={[1, 2]} px={4} spacing={4}>
                        {projects.filter((project) => project.node > 0).map((project) => (
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
                    <Text color={"gray.600"} fontSize={"xl"} px={2}>
                        Other Projects
                    </Text>
                    <Card px={2} py={2}>
                        <List spacing={2}>
                            {projects.filter((project) => project.node < 0).map((project) => (
                                <ListItem key={project.title} textAlign={'left'}>
                                    <ChevronRightIcon
                                        boxSize={6}
                                        as={ChevronRightIcon}
                                        color={`${props.color}.500`}
                                    />
                                    <Link href={project.link} isExternal cursor={'pointer'} data-id={project.node}
                                        _hover={{ textDecoration: "none" }} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                                        <Text as={'span'} textDecoration={otherHover === project.node ? 'underline' : 'none'}>{project.title}</Text>:  {project.description}
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </Card>
                </Stack>
            </Container>
        </>);
}

export default Projects;