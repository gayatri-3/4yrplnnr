// 1. Import the extendTheme function
import { extendTheme, theme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
    "main-bg": "#aed3e3",

    "white-text": "#ffffff",
    "black-text": "#000000",
    "gray-text": "#808080",
    "subtle-text": "#ffffff",

    "column-bg": "#FEFBEA",
    "column-header-bg": "#FFE5B4",
    "card-bg": "#C4A484",
};

const fonts = {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
};

export default extendTheme({
    ...theme,
    colors,
    fonts,
});
