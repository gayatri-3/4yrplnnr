import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { courses } from "../courses.js";

export default function Planner() {
    return (
        <Flex
            flexDir="column"
            bg="main-bg"
            minH="100vh"
            w="full"
            color="white-text"
            pb="2rem"
            align="center"
        >
            {/* page header: title and subtitle */}
            <Flex py="4rem" flexDir="column" align="center">
                <Heading fontSize="3xl" fontWeight={600}>
                    4YRPLNNR
                </Heading>
                <Text fontSize="20px" fontWeight={600} color="gray-text">
                    create your dream course plan
                </Text>
            </Flex>

            {/* drag and drop courses */}
            <DragDropContext>
                <Flex>
                    {/* left column: courses list */}
                    <Droppable droppableId="courses">
                        {(provided) => (
                            <Box width="300px" bg="gray.100" p={4} mr={8}>
                                <Text fontSize="xl" mb={4}>
                                    Courses
                                </Text>

                                {/* courses list */}
                                {courses.map((course, index) => (
                                    <Draggable
                                        key={course.id}
                                        draggableId={course.id}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <Box
                                                mb={2}
                                                p={4}
                                                bg="white"
                                                borderWidth="1px"
                                                borderRadius="md"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Text>{course.id}</Text>
                                            </Box>
                                        )}
                                    </Draggable>
                                ))}
                            </Box>
                        )}
                    </Droppable>
                </Flex>
            </DragDropContext>
        </Flex>
    );
}
