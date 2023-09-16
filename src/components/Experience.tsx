import {
    Badge, Box, Card, CardBody, CardFooter, CardHeader, Collapse, Container, Divider,
    Flex, HStack, Image, List, ListIcon, ListItem, Stack, Text
} from "@chakra-ui/react";
import ExperienceArray from "../arrays/ExperienceArray";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

const Experience = (props: { color: string }) => {
    const experience = ExperienceArray();

    const [selected, setSelected] = useState([]);

    useEffect(() => {
        const selected = experience.map((edu) => (edu.node));
        setSelected(selected);
    }, [experience]);

    const handleClick = (event) => {
        const pick = parseInt(event.currentTarget.dataset.id);
        if (selected.includes(pick)) {
            setSelected(selected.filter((val) => val !== pick));
        } else {
            setSelected([...selected, pick]);
        }
    }

    return (
        <>
            <Container maxW={"4xl"} id="experience">
                <Stack
                    as={Box}
                    textAlign={"center"}
                    spacing={{ base: 8, md: 14 }}
                    pb={{ base: 20, md: 16 }}
                >
                    <Stack align="center" direction="row" px={4}>
                        <HStack mx={4}>
                            <Text color={`${props.color}.400`} fontWeight={800}>
                                02
                            </Text>
                            <Text fontWeight={800}>Experience</Text>
                        </HStack>
                        <Divider orientation="horizontal" />
                    </Stack>
                    <Stack px={4} spacing={4}>
                        {experience.sort((a, b) => a.node < b.node ? 1 : -1).map((exp) => (
                            <Card onClick={handleClick} key={exp.node} data-id={exp.node}>
                                <CardHeader>
                                    <Flex justifyContent="space-between">
                                        <HStack backgroundColor={selected.includes(exp.node) ? '' : '#7996a04d'} 
                                            px={2} py={2} borderRadius={2}>
                                            <Box>
                                                <Image src={exp.image} maxWidth={'3em'} />
                                                {/* <Image className='flag' src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${exp.country}.svg`} /> */}
                                            </Box>
                                            <Box px={2} >
                                                <Text align='left' fontWeight={600}>{exp.title}</Text>
                                                <Text align='left'>{exp.firm}</Text>
                                            </Box>
                                        </HStack>
                                        <Box px={2}>
                                            <Text align='left' fontWeight={300}>{exp.period}</Text>
                                            <Text align='left' fontWeight={300}>{exp.location}</Text>
                                        </Box>
                                    </Flex>
                                </CardHeader>
                                <Collapse in={selected.includes(exp.node)} animateOpacity>
                                    <CardBody>
                                        <Flex>
                                            <List spacing={1}>
                                                {exp.description.map((item, index) => (
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
                                </Collapse>
                                <CardFooter display={exp.badges.length > 0 ? 'flex' : 'none'}>
                                    <HStack spacing={2}>
                                        {exp.badges.map((badge) => (
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
    )
};

export default Experience;  