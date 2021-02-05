import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { ThemeProvider } from '@emotion/react';

import theme from "../theme";

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <ColorModeProvider
                options={{
                    useSystemColorMode: true,
                }}
            >
                <Component {...pageProps} />
            </ColorModeProvider>
        </ThemeProvider>
    );
}

export default MyApp;