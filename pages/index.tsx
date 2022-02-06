import {
	Button,
	Container,
	Divider,
	Flex,
	HStack,
	Spinner,
	Stat,
	StatLabel,
	StatNumber,
	Text,
	VStack,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import { BillList } from '../components/BillList'
import { Layout } from '../components/Layout'
import { PayBill } from '../components/PayBill'
import { getTodaysDate, getTodaysMonth } from '../utils'

const Home: NextPage = () => {
	const { data: session } = useSession()
	if (session === undefined) return <Loader />
	if (!session) return <Login />
	return (
		<Layout title='Bill Tracker App' bg='gray.50' color='gray.700'>
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
					<Button variant='outline' onClick={() => signOut()}>
						Logout
					</Button>
				</Flex>
				<Text fontSize='sm' color='gray.500'>
					{getTodaysDate()}
				</Text>
				<Divider my='4' />
				<VStack pb='73px' overflowY='auto' alignItems='stretch' spacing={3}>
					<VStack alignItems='stretch'>
						<Text fontWeight='bold'>{getTodaysMonth()} Bills</Text>
						<HStack>
							<Stat size='sm' borderWidth={1} p={4} rounded='md'>
								<StatLabel>Total Bills Amount</StatLabel>
								<StatNumber>$ 1000.00</StatNumber>
							</Stat>
							<Stat size='sm' borderWidth={1} p={4} rounded='md'>
								<StatLabel>Total Bills</StatLabel>
								<StatNumber>4</StatNumber>
							</Stat>
						</HStack>
					</VStack>
					<Divider />
					<BillList />
				</VStack>
				<PayBill />
			</Container>
		</Layout>
	)
}

const Login = () => {
	return (
		<Layout title='Bill Tracker App' bg='gray.50' color='gray.700'>
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
				<Flex
					justifySelf={'flex-start'}
					py='2'
					alignItems='center'
					justifyContent='space-between'
				>
					<Text fontWeight='bold' fontSize='2xl'>
						Bill Tracker App
					</Text>
				</Flex>
				<Flex flex='1' alignItems={'center'} justifyContent={'center'}>
					<Button onClick={() => signIn('google')}>Login</Button>
				</Flex>
			</Container>
		</Layout>
	)
}

const Loader = () => {
	return (
		<Layout title='Bill Tracker App' bg='gray.50' color='gray.700'>
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
				<Flex
					justifySelf={'flex-start'}
					py='2'
					alignItems='center'
					justifyContent='space-between'
				>
					<Text fontWeight='bold' fontSize='2xl'>
						Bill Tracker App
					</Text>
				</Flex>
				<Flex flex='1' alignItems={'center'} justifyContent={'center'}>
					<Spinner />
				</Flex>
			</Container>
		</Layout>
	)
}

export default Home
