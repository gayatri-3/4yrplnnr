import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { courses } from "../courses.js";

export default function Planner() {
    return (
        <Flex direction="column" align="center" justify="center" p={4}>
            <Heading mb={4}>4yrplnnr</Heading>
            <Text>create your dream course plan</Text>

            {/* list courses */}
            {courses.map((course, index) => (
                <Box
                    mb={2}
                    p={4}
                    bg="white"
                    borderWidth="1px"
                    borderRadius="md"
                >
                    <Text>{course.id}</Text>
                </Box>
            ))}
        </Flex>
    );
}
