import {
    Container, Stack, Box, HStack, Text, Divider,
    Card, List, ListItem, Center, Code
} from "@chakra-ui/react";
import HobbiesArray from "../arrays/HobbyArray";
import { ChevronRightIcon } from "@chakra-ui/icons";
import InterestCloud from "./InterestCloud";

const Interests = (props: { color: string }) => {
    const hobbies = HobbiesArray();

    return (
        <>
            <Container maxW={"4xl"} id="interests">
                <Stack
                    as={Box}
                    textAlign={"center"}
                    spacing={{ base: 8, md: 8 }}
                    pb={{ base: 20, md: 16 }}
                >
                    <Stack align="center" direction="row" p={4}>
                        <HStack mx={4}>
                            <Text color={`${props.color}.400`} fontWeight={800}>
                                06
                            </Text>
                            <Text fontWeight={800}>Interests</Text>
                        </HStack>
                        <Divider orientation="horizontal" />
                    </Stack>
                    <Center px={4}>
                        {window.visualViewport.width > 768 ?
                            <InterestCloud hobbies={hobbies} color={props.color} /> :
                            <Code>&lt;p&gt; A Word Cloud rendition of my interests, optimized for widescreen views. &lt;p&gt;</Code>}
                    </Center>
                    <Text color={"gray.600"} fontSize={"xl"} px={2}>
                        Other Activities
                    </Text>
                    <Card px={2} py={2} mx={4}>
                        <List spacing={2}>
                            {hobbies.activities.map((hobby) => (
                                <ListItem key={hobby} textAlign={'left'}>
                                    <ChevronRightIcon
                                        boxSize={6}
                                        as={ChevronRightIcon}
                                        color={`${props.color}.500`}
                                    />
                                    <Text as={'b'}>{hobby.split(',')[0]}</Text>
                                    <Text as={'span'}>,{hobby.split(/,(.*)/s).slice(1)}</Text>
                                </ListItem>
                            ))}
                        </List>
                    </Card>
                </Stack>
            </Container>
        </>);
}

export default Interests;