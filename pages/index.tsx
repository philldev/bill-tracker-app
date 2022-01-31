import {
	Avatar,
	Button,
	Container,
	Divider,
	Flex,
	HStack,
	Text,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { AddBill } from '../components/AddBill'
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
				pos='relative'
			>
				<Flex py='2' alignItems='center' justifyContent='space-between'>
					<Text fontWeight='bold' fontSize='2xl'>
						Bill Tracker App
					</Text>
				</Flex>
				<AddBill />
			</Container>
		</Layout>
	)
}

export default Home
