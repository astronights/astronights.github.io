import {
    Container, Stack, Box, HStack, Text, Divider, Card, SimpleGrid, CardBody, CircularProgress,
    Heading, Image, CardHeader, List, ListItem, Table, TableContainer, Tbody, Td, Tr, Badge
} from "@chakra-ui/react";
import SkillsArray from "../arrays/SkillsArray";
import { ChevronRightIcon } from "@chakra-ui/icons";

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
                                    <Heading textAlign='left' size="sm">{'Programming Language Proficiency'}</Heading>
                                </CardHeader>
                                <CardBody>
                                    <TableContainer>
                                        <Table variant='simple'>
                                            <Tbody>
                                                {Object.keys(skills.technology.languages).map((lang) => {
                                                    const langSkills = skills.technology.languages[lang];
                                                    const progressValues = [...Array(Math.floor(langSkills))].map((_) => 100);
                                                    progressValues.push(langSkills % 1 * 100);
                                                    return (
                                                        <Tr key={lang}>
                                                            <Td px={0} paddingTop={1} paddingBottom={0}><Image src={`/images/${lang}.png`} alt={lang} maxHeight={'1.5em'} /></Td>
                                                            <Td px={0} paddingTop={1} paddingBottom={0}>{lang}</Td>
                                                            <Td px={0} paddingTop={1} paddingBottom={0}>{
                                                                progressValues.map((val) => (
                                                                    <CircularProgress value={val} p={1} size={'1.2em'} color={props.color} trackColor="transparent" />
                                                                ))
                                                            }</Td>
                                                            <Td px={0} paddingTop={1} paddingBottom={0}><Badge
                                                                key={lang}
                                                                colorScheme={'blue'}
                                                            >{langSkills > 4 ? 'Advanced' : (langSkills > 3 ? 'Intermediate' : 'Basic')}
                                                            </Badge></Td>
                                                        </Tr>
                                                    )
                                                })}
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </CardBody>
                            </Stack>
                        </Card>
                        <Card key={'data-science'}>
                            <Stack>
                                <CardHeader pb={0}>
                                    <Heading textAlign='left' size="sm">{'Data Science'}</Heading>
                                </CardHeader>
                                <CardBody paddingLeft={2}>
                                    <List spacing={1}>
                                        {skills.technology.ds.map((data) => (
                                            <ListItem key={data} textAlign={'left'}>
                                                <ChevronRightIcon
                                                    boxSize={6}
                                                    as={ChevronRightIcon}
                                                    color={`${props.color}.500`}
                                                />
                                                {data}
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardBody>
                            </Stack>
                        </Card>
                        <Card key={'database'}>
                            <Stack>
                                <CardHeader pb={0}>
                                    <Heading textAlign='left' size="sm">{'Experience with Databases'}</Heading>
                                </CardHeader>
                                <CardBody>
                                    <List spacing={1}>
                                        {skills.technology.db.map((data) => (
                                            <ListItem key={data} textAlign={'left'}>
                                                <SimpleGrid columns={2} px={1} spacing={1}>
                                                    <Image src={skills.technology.frameworks[data]} alt={data} maxHeight={'1.5em'} />
                                                    <Text>{data}</Text>
                                                </SimpleGrid>
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardBody>
                            </Stack>
                        </Card>
                        <Card key={'frameworks'}>
                            <Stack>
                                <CardHeader pb={0}>
                                    <Heading textAlign='left' size="sm">{'Frameworks Extensively Used'}</Heading>
                                </CardHeader>
                                <CardBody>
                                    <SimpleGrid columns={[1, 2]} px={1} spacing={1}>
                                        <List key={'left'} spacing={1.5}>
                                            {skills.technology.frameworks.slice(0, midFw).map((fw) => (
                                                <ListItem key={fw} textAlign={'left'}>
                                                    <SimpleGrid columns={2} px={1} spacing={1}>
                                                        <Image src={`/images/${fw.toLowerCase()}.png`} alt={fw} maxHeight={'1.5em'} />
                                                        <Text>{fw}</Text>
                                                    </SimpleGrid>
                                                </ListItem>
                                            ))}
                                        </List>
                                        <List key={'right'} spacing={1.5} float={'right'}>
                                            {skills.technology.frameworks.slice(midFw).map((fw) => (
                                                <ListItem key={fw} textAlign={'left'}>
                                                    <SimpleGrid columns={2} px={1} spacing={1}>
                                                        <Image src={`/images/${fw.toLowerCase()}.png`} alt={fw} maxHeight={'1.5em'} />
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