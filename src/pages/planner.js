import { Box, Flex, Heading, Text, Grid, GridItem } from "@chakra-ui/react";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { courses as initialCourses } from "../courses.js";

// Function to initialize grid items (4x4 grid with empty arrays)
const createInitialGrid = () => Array(16).fill([]); // Empty arrays for each cell

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
            updatedGridItems[destIndex] = [
                ...updatedGridItems[destIndex],
                movedItem,
            ];

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
            <Flex py="4rem" flexDir="column" align="center">
                <Heading fontSize="3xl" fontWeight={600}>
                    4YRPLNNR
                </Heading>
                <Text fontSize="20px" fontWeight={600} color="gray-text">
                    Create your dream course plan
                </Text>
            </Flex>

            {/* Drag and drop courses and planner grid */}
            <DragDropContext onDragEnd={onDragEnd}>
                <Flex direction="row" align="start" w="full" h="full">
                    {/* Left column: Courses list */}
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

                    {/* Right side: 4x4 Grid Cells */}
                    <Droppable droppableId="grid" direction="horizontal">
                        {(provided) => (
                            <Box
                                flex="1"
                                bg="column-bg"
                                p={4}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <Heading mb={4} color="gray-text">
                                    Academic Planner
                                </Heading>
                                <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                                    {gridItems.map((items, index) => {
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
                                                        border="1px solid transparent"
                                                        _hover={{
                                                            border: "1px solid gray",
                                                        }}
                                                    >
                                                        {items.length > 0 ? (
                                                            items.map(
                                                                (item) => (
                                                                    <Draggable
                                                                        key={
                                                                            item.id
                                                                        }
                                                                        draggableId={
                                                                            item.id
                                                                        }
                                                                        index={items.indexOf(
                                                                            item
                                                                        )}
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
                                                                                    1
                                                                                }
                                                                            >
                                                                                {
                                                                                    item.id
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
