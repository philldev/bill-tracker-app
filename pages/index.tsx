import {
	Avatar,
	Box,
	Button,
	Container,
	Divider,
	Flex,
	HStack,
	Stat,
	StatHelpText,
	StatLabel,
	StatNumber,
	Text,
	VStack,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { AddBill } from '../components/AddBill'
import { BillList } from '../components/BillList'
import { Layout } from '../components/Layout'
import { PayBill } from '../components/PayBill'
import { getTodaysDate, getTodaysMonth } from '../utils'

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
				display={'flex'}
				flexDir={'column'}
			>
				<Flex py='2' alignItems='center' justifyContent='space-between'>
					<Text fontWeight='bold' fontSize='2xl'>
						Bill Tracker App
					</Text>
				</Flex>
				<Text fontSize='sm' color='gray.500'>
					{getTodaysDate()}
				</Text>
				<Divider my='4' />
				<VStack
					pb='73px'
					flex='1'
					overflowY='auto'
					alignItems='stretch'
					spacing={3}
				>
					<Text fontWeight='bold'>{getTodaysMonth()} Bills</Text>
					<Stat alignSelf='flex-start' borderWidth={1} p={4} rounded='md'>
						<StatLabel>Total Bills</StatLabel>
						<StatNumber>$1000.00</StatNumber>
					</Stat>
					<Divider />
					<BillList />
				</VStack>
				<PayBill />
			</Container>
		</Layout>
	)
}

export default Home
