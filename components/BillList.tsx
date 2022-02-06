import { BoxProps, HStack, Spinner, Tag, Text, VStack } from '@chakra-ui/react'
import { Bill } from '@prisma/client'
import useSWR from 'swr'
import { capitalize, formatDollar, getFormattedDate } from '../utils'

export const BillList = (props: { onBillClick?: (bill: Bill) => void }) => {
	const { data: bills, error } = useSWR<Bill[]>('/api/bills')

	if (!bills) return <Spinner />

	return (
		<VStack alignItems='stretch'>
			{bills!.map((bill) => (
				<BillCard
					onClick={() => props.onBillClick?.(bill)}
					key={bill.id}
					bill={bill}
				/>
			))}
		</VStack>
	)
}

export const BillCard = ({ bill }: { bill: Bill } & BoxProps) => {
	return (
		<VStack p='4' borderWidth='1px' rounded='md' alignItems='stretch'>
			<HStack>
				<HStack flex='1'>
					<Text>{bill.name}</Text>
					<Tag>{capitalize(bill.repeat)}</Tag>
				</HStack>
				<Text fontSize='sm' color='gray.500'>
					{getFormattedDate(bill.date)}
				</Text>
			</HStack>
			<Text color='black' fontWeight='bold'>
				{formatDollar(bill.amount)}
			</Text>
		</VStack>
	)
}
