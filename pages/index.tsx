import { Container, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { Layout } from '../components/Layout'

const Home: NextPage = () => {
	return (
		<Layout title='NEXT TEMPLATE' bg='gray.50'>
			<Container
				maxW='container.sm'
				h={['100vh', '95vh']}
				overflow='hidden'
				rounded='md'
				bg='white'
				p='4'
				shadow='sm'
			>
				<Text>Bill Tracker App</Text>
			</Container>
		</Layout>
	)
}

export default Home
