import { BoxProps, HStack, Tag, Text, VStack } from '@chakra-ui/react'
import { Bill } from '../types/bill'
import {
	capitalize,
	formatDollar,
	getFormattedDate,
	getRepeatColor,
} from '../utils'

const bills: Bill[] = [
	{
		id: '1',
		createdAt: '2020-01-01',
		updatedAt: '2020-01-01',
		name: 'Electricity',
		amount: 100,
		date: '2020-01-01',
		repeat: 'monthly',
	},
	{
		id: '2',
		createdAt: '2020-01-01',
		updatedAt: '2020-01-01',
		name: 'Water',
		amount: 100,
		date: '2020-01-01',
		repeat: 'monthly',
	},
	{
		id: '3',
		createdAt: '2020-01-01',
		updatedAt: '2020-01-01',
		name: 'Internet',
		amount: 1000,
		date: '2020-01-01',
		repeat: 'monthly',
	},
]

export const BillList = (props: { onBillClick?: (bill: Bill) => void }) => {
	return (
		<VStack alignItems='stretch'>
			{bills.map((bill) => (
				<BillCard
					onClick={() => props.onBillClick?.(bill)}
					key={bill.id}
					bill={bill}
				/>
			))}
		</VStack>
	)
}

const BillCard = ({ bill }: { bill: Bill } & BoxProps) => {
	return (
		<VStack p='4' borderWidth='1px' rounded='md' alignItems='stretch'>
			<HStack>
				<HStack flex='1'>
					<Text>{bill.name}</Text>
					<Tag
						colorScheme={
							typeof window === 'object'
								? getRepeatColor(bill.repeat)
								: undefined
						}
					>
						{capitalize(bill.repeat)}
					</Tag>
				</HStack>
				<Text color='gray.500'>{getFormattedDate(bill.date)}</Text>
			</HStack>
			<Text color='black' fontSize='4xl' fontWeight='medium'>
				{formatDollar(bill.amount)}
			</Text>
		</VStack>
	)
}
