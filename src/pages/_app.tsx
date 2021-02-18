import { ColorModeProvider, CSSReset } from "@chakra-ui/react";
import { ThemeProvider } from "@emotion/react";
import { cacheExchange, Cache, QueryInput } from "@urql/exchange-graphcache";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import { LoginMutation, MeDocument, MeQuery, RegisterMutation } from "../generated/graphql";

function betterUpdateQuery<Result, Query>(
    cache: Cache,
    qi: QueryInput,
    result: any,
    fn: (r: Result, q: Query) => Query
) {
    return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const client = createClient({
    url: "http://localhost:5000/graphql",
    // sending cookie
    fetchOptions: {
        credentials: "include",
    },
    exchanges: [
        dedupExchange,
        cacheExchange({
            updates: {
                Mutation: {
                    login: (_result, args, cache, info) => {
                        betterUpdateQuery<LoginMutation, MeQuery>(
                            cache,
                            { query: MeDocument },
                            _result,
                            (result, query) => {
                                if (result.login.errors) {
                                    return query;
                                } else {
                                    return {
                                        me: result.login.user,
                                    };
                                }
                            }
                        );
                    },
                    register: (_result, args, cache, info) => {
                        betterUpdateQuery<RegisterMutation, MeQuery>(
                            cache,
                            { query: MeDocument },
                            _result,
                            (result, query) => {
                                if (result.register.errors) {
                                    return query;
                                } else {
                                    return {
                                        me: result.register.user,
                                    };
                                }
                            }
                        );
                    },
                },
            },
        }),
        fetchExchange,
    ],
});

import theme from "../theme";

function MyApp({ Component, pageProps }: any) {
    // he ripped out the colormode provider
    return (
        <Provider value={client}>
            <ThemeProvider theme={theme}>
                <CSSReset />
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
