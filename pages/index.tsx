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
import { BillList } from '../components/BillList'
import { Layout } from '../components/Layout'
import { PayBill } from '../components/PayBill'

const Home: NextPage = () => {
	return (
		<Layout title='NEXT TEMPLATE' bg='gray.50' color='gray.700'>
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
				<BillList />
				<PayBill />
			</Container>
		</Layout>
	)
}

export default Home
