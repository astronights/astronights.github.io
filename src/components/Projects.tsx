import {
    Container, Stack, Box, HStack, Text, Divider, Image,
    Card, SimpleGrid, CardBody, Heading, Link, Badge, CardHeader, Flex, Button, List, ListItem
} from "@chakra-ui/react";
import ProjectsArray from "../arrays/ProjectsArray";
import { ChevronRightIcon, LinkIcon, LockIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { Project } from "../types";

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
                    <Text color={"gray.600"} fontSize={"xl"} px={2}>
                        Published Libraries
                    </Text>
                    <SimpleGrid columns={[1, 2]} px={4} spacing={4}>
                        {projects.filter((project) => project.node > 1000).map((project) => (
                            <ProjectCard key={project.node} color={props.color} project={project} />
                        ))}
                    </SimpleGrid>
                    <Text color={"gray.600"} fontSize={"xl"} px={2}>
                        More Projects
                    </Text>
                    <SimpleGrid columns={[1, 2]} px={4} spacing={4}>
                        {projects.filter((project) => project.node > 0 && project.node < 1000).map((project) => (
                            <ProjectCard key={project.node} color={props.color} project={project} />
                        ))}
                    </SimpleGrid>
                    <Text color={"gray.600"} fontSize={"xl"} px={2}>
                        Other Projects
                    </Text>
                    <Card px={2} py={2} mx={4}>
                        <List spacing={2}>
                            {projects.filter((project) => project.node < 0).map((project) => (
                                <ListItem key={project.title} textAlign={'left'}>
                                    <Flex alignItems="center" justifyContent="space-between">
                                        <HStack spacing={2}>
                                            <ChevronRightIcon
                                                boxSize={6}
                                                as={ChevronRightIcon}
                                                color={`${props.color}.500`}
                                            />
                                            <Link
                                                href={project.link}
                                                isExternal
                                                cursor={'pointer'}
                                                data-id={project.node}
                                                _hover={{ textDecoration: "none" }}
                                                onMouseOver={handleMouseOver}
                                                onMouseOut={handleMouseOut}
                                            >
                                                <Text as={'span'} textDecoration={otherHover === project.node ? 'underline' : 'none'}>
                                                    {project.title}
                                                </Text>: {project.description}
                                            </Link>
                                        </HStack>
                                        {project.badges.length > 0 &&
                                            <Badge key={project.badges[0]}
                                                colorScheme={'blue'} ml={4}>
                                                {project.badges[0]}
                                            </Badge>
                                        }
                                    </Flex>
                                </ListItem>
                            ))}
                        </List>

                    </Card>
                </Stack>
            </Container>
        </>);
}

const ProjectCard = (props: { color: string, project: Project }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const imageInterval = setInterval(() => {
            setFade(true); // Start fading out
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) =>
                    (prevIndex + 1) % props.project.images.length
                );
                setFade(false); // Fade back in
            }, 500); // Match this with the CSS transition duration
        }, 5000);

        return () => clearInterval(imageInterval);
    }, [props.project.images.length]);

    return (
        <Card key={props.project.title}>
            <Stack>
                {props.project.images.length > 0 && (
                    <Box position="relative" overflow="visible" borderRadius="lg" height="12.5em">
                        {props.project.images.length > 1 ? props.project.images.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                alt={`Project Image ${index + 1}`}
                                borderRadius="lg"
                                position="absolute"
                                top="0"
                                left="0"
                                opacity={currentImageIndex === index && !fade ? 1 : 0}
                                transition="opacity 0.5s ease-in-out"
                            />
                        )) : <Image
                            key={0}
                            src={props.project.images[0]}
                            alt={'Project Image 1'}
                            borderRadius="lg"
                            position="absolute"
                            top="0"
                            left="0"
                            opacity={1}
                        />}
                    </Box>)
                }

                <CardHeader pt={2} pb={0}>
                    <Flex justifyContent="space-between">
                        <Heading textAlign='left' size="sm">{props.project.title}</Heading>
                        <Box>
                            {props.project.link ? (
                                <Button size='xs' leftIcon={<LinkIcon />} colorScheme={props.color}>
                                    <Link href={props.project.link} isExternal>Link</Link>
                                </Button>
                            ) : (
                                <Button size='xs' isDisabled={true} leftIcon={<LockIcon />} colorScheme={props.color}></Button>
                            )}
                        </Box>
                    </Flex>
                </CardHeader>
                <CardBody textAlign="left" h={[null, "40vh"]} pt={0} pb={0}>
                    <Text fontSize="sm" py={2}>
                        {props.project.description}
                    </Text>
                    <HStack flexWrap="wrap" pt={1} spacing={1}>
                        {props.project.badges.map((badge) => (
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
    );
};



export default Projects;