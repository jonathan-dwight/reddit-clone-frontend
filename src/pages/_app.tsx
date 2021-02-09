import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { ThemeProvider } from '@emotion/react';
import { createClient, Provider } from "urql";

const client = createClient({ 
    url: "http://localhost:5000/graphql",
    // sending cookie
    fetchOptions: {
        credentials: "include",
    }

})

import theme from "../theme";

function MyApp({ Component, pageProps }) {
    return (
        <Provider value={client}>
            <ThemeProvider theme={theme}>
                <ColorModeProvider
                    options={{
                        useSystemColorMode: true,
                    }}
                >
                    <Component {...pageProps} />
                </ColorModeProvider>
            </ThemeProvider>
        </Provider>
    );
}

export default MyApp;
