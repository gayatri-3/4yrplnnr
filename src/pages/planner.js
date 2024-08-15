import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { courses } from "../courses.js";

export default function Planner() {
    return (
        <Flex direction="column" align="center" justify="center" p={4}>
            <Heading mb={4}>4yrplnnr</Heading>
            <Text>create your dream course plan</Text>

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
