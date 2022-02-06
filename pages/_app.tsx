import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SWRConfig
			value={{
				refreshInterval: 3000,
				fetcher: (resource, init) =>
					fetch(resource, init).then((res) => res.json()),
			}}
		>
			<SessionProvider session={session}>
				<ChakraProvider theme={theme}>
					<Component {...pageProps} />
				</ChakraProvider>
			</SessionProvider>
		</SWRConfig>
	)
}

const theme = extendTheme({
	styles: {
		global: {
			'*': {
				fontFamily:
					' -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
			},
		},
	},
})

export default MyApp
