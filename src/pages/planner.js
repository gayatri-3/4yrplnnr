import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { courses as initialCourses } from "../courses.js";

export default function Planner() {
    // courses initially displayed are imported from courses.js
    const [courses, setCourses] = useState(initialCourses);

    // called whenever drag and drop ends; handles repositioning of courses
    const onDragEnd = (result) => {
        const { destination, source } = result;

        // if dropped outside valid zone, do nothing
        if (!destination) {
            return;
        }

        // if dropped in same place, do nothing
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // reorder courses within the same droppable area

        // copy courses array
        const items = Array.from(courses);
        // remove moved item from copy array
        const [movedItem] = items.splice(source.index, 1);
        // add moved item back to new spot in copy array
        items.splice(destination.index, 0, movedItem);

        // update state to copy array
        setCourses(items);
    };

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
            <DragDropContext onDragEnd={onDragEnd}>
                <Flex>
                    {/* left column: courses list */}
                    <Droppable droppableId="courses">
                        {(provided) => (
                            <Box
                                width="300px"
                                bg="column-bg"
                                p={4}
                                mr={8}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <Flex
                                    align="center"
                                    h="60px"
                                    bg="column-header-bg"
                                    rounded="3px 3px 0 0"
                                    px="1.5rem"
                                    mb="1.5rem"
                                    justify="center"
                                >
                                    <Text
                                        fontSize="xl"
                                        mb={4}
                                        color="gray-text"
                                    >
                                        courses
                                    </Text>
                                </Flex>

                                {/* courses list with draggable boxes */}
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
                                                borderWidth="1px"
                                                borderRadius="md"
                                                bg="card-bg"
                                                rounded="3px"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Text textAlign={"center"}>
                                                    {course.id}
                                                </Text>
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
