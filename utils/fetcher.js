import { ApolloClient, InMemoryCache } from "@apollo/client"

async function fetcher(queries) {
    const client = new ApolloClient({
        uri: "https://graphql-pokemon2.vercel.app",
        cache: new InMemoryCache()
    })

    const { data } = await client.query({
        query: queries,
    });
    return data
}

export default fetcher