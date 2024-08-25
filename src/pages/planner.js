import { Box, Flex, Heading, Text, Grid, GridItem } from "@chakra-ui/react";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { courses as initialCourses } from "../courses.js";

// Function to initialize grid items
const createInitialGrid = () => [[], [], [], []]; // 4 grid cells

export default function Planner() {
    // State to store courses and grid items
    const [courses, setCourses] = useState(initialCourses);
    const [gridItems, setGridItems] = useState(createInitialGrid());

    // Handle drag and drop
    const onDragEnd = (result) => {
        const { destination, source } = result;

        // If dropped outside valid zone, do nothing
        if (!destination) {
            return;
        }

        // Handle dragging courses from the course column to the grid
        if (source.droppableId === "courses") {
            const updatedCourses = Array.from(courses);
            const [movedItem] = updatedCourses.splice(source.index, 1);

            // Determine the cell index for the destination
            const destIndex = parseInt(
                destination.droppableId.split("-")[1],
                10
            );

            // Update grid items
            const updatedGridItems = [...gridItems];
            if (!updatedGridItems[destIndex]) {
                updatedGridItems[destIndex] = [];
            }
            updatedGridItems[destIndex].push(movedItem);

            setCourses(updatedCourses);
            setGridItems(updatedGridItems);
        }
    };

    return (
        <Flex
            flexDir="column"
            bg="main-bg"
            minH="100vh"
            w="full"
            color="white-text"
            pb="2rem"
            p={4}
            align="center"
        >
            {/* Page header: title and subtitle */}
            <Flex py="4rem" flexDir="column" align="center" mb="2rem">
                <Heading fontSize="3xl" fontWeight={600}>
                    4YRPLNNR
                </Heading>
                <Text fontSize="20px" fontWeight={600} color="gray-text">
                    Create your dream course plan
                </Text>
            </Flex>

            {/* Drag and drop courses and planner grid */}
            <DragDropContext onDragEnd={onDragEnd}>
                <Flex direction="row" align="start" w="full">
                    {/* Left column: Courses list */}
                    <Droppable droppableId="courses">
                        {(provided) => (
                            <Box
                                width="25%" // 1/4 of the page width
                                bg="column-bg"
                                p={4}
                                mr={4} // Space between columns
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
                                        Courses
                                    </Text>
                                </Flex>

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
                                                <Text textAlign="center">
                                                    {course.id}
                                                </Text>
                                            </Box>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Box>
                        )}
                    </Droppable>

                    {/* Right side: 4 Grid Cells */}
                    <Droppable droppableId="grid" direction="horizontal">
                        {(provided) => (
                            <Box
                                flex="3" // 3/4 of the page width
                                bg="column-bg"
                                p={4}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <Heading mb={4} color="gray-text">
                                    Academic Planner
                                </Heading>
                                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                                    {gridItems.map((item, index) => {
                                        const droppableId = `cell-${index}`;
                                        return (
                                            <Droppable
                                                droppableId={droppableId}
                                                key={droppableId}
                                                direction="vertical"
                                            >
                                                {(provided) => (
                                                    <GridItem
                                                        bg="column-bg"
                                                        p={4}
                                                        borderWidth="1px"
                                                        borderRadius="md"
                                                        textAlign="center"
                                                        position="relative"
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                        w="100%" // Full width of GridItem
                                                        h="auto" // Height adjusts based on content
                                                        border="1px solid transparent"
                                                        _hover={{
                                                            border: "1px solid gray",
                                                        }}
                                                    >
                                                        {item.length > 0 ? (
                                                            item.map(
                                                                (
                                                                    subItem,
                                                                    subIndex
                                                                ) => (
                                                                    <Draggable
                                                                        key={
                                                                            subItem.id
                                                                        }
                                                                        draggableId={
                                                                            subItem.id
                                                                        }
                                                                        index={
                                                                            subIndex
                                                                        }
                                                                    >
                                                                        {(
                                                                            provided
                                                                        ) => (
                                                                            <Box
                                                                                ref={
                                                                                    provided.innerRef
                                                                                }
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                bg="card-bg"
                                                                                p={
                                                                                    2
                                                                                }
                                                                                borderWidth="1px"
                                                                                borderRadius="md"
                                                                                textAlign="center"
                                                                                mb={
                                                                                    2
                                                                                } // Space between items
                                                                            >
                                                                                {
                                                                                    subItem.id
                                                                                }
                                                                            </Box>
                                                                        )}
                                                                    </Draggable>
                                                                )
                                                            )
                                                        ) : (
                                                            <Text color="gray-text">
                                                                No Courses
                                                            </Text>
                                                        )}
                                                        {provided.placeholder}
                                                    </GridItem>
                                                )}
                                            </Droppable>
                                        );
                                    })}
                                </Grid>
                                {provided.placeholder}
                            </Box>
                        )}
                    </Droppable>
                </Flex>
            </DragDropContext>
        </Flex>
    );
}
