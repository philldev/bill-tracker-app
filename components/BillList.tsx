import {
	BoxProps,
	Button,
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Tag,
	Text,
	useDisclosure,
	VStack,
} from '@chakra-ui/react'
import { Bill } from '@prisma/client'
import { FC } from 'react'
import useSWR from 'swr'
import { capitalize, formatDollar, getFormattedDate } from '../utils'
import { AddBill } from './AddBill'

export const BillList = (props: {
	onBillClick?: (bill: Bill) => void
	billModal?: boolean
}) => {
	const { data: bills, error } = useSWR<Bill[]>('/api/bills')

	if (!bills) return <Spinner />

	return (
		<VStack alignItems='stretch'>
			{bills!.map((bill) => (
				<BillCard
					enableDetail={props.billModal}
					onClick={() => props.onBillClick?.(bill)}
					key={bill.id}
					bill={bill}
				/>
			))}
		</VStack>
	)
}

export const BillCard = ({
	bill,
	enableDetail,
	...rest
}: { bill: Bill; enableDetail?: boolean } & BoxProps) => {
	const modal = useDisclosure()

	return (
		<>
			<VStack
				p='4'
				borderWidth='1px'
				rounded='md'
				alignItems='stretch'
				onClick={() => {
					if (enableDetail) {
						modal.onOpen()
					}
				}}
			>
				<HStack>
					<HStack flex='1'>
						<Text>{bill.name}</Text>
						<Tag>{capitalize(bill.repeat)}</Tag>
					</HStack>
					<Text fontSize='xs' textAlign={'right'} color='gray.500'>
						{getFormattedDate(bill.date)}
					</Text>
				</HStack>
				<Text color='black' fontWeight='bold'>
					{formatDollar(bill.amount)}
				</Text>
			</VStack>
			<BillDetailModal bill={bill} {...modal} />
		</>
	)
}

const BillDetailModal: FC<{
	isOpen: boolean
	onClose: () => void
	bill: Bill
}> = (props) => {
	return (
		<Modal isCentered isOpen={props.isOpen} onClose={props.onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Bill Detail</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<BillCard bill={props.bill} />
				</ModalBody>
				<ModalFooter>
					<HStack>
						<Button variant={'outline'} colorScheme='red' size='sm'>
							Delete
						</Button>
						<Button variant={'outline'} size='sm'>
							Edit
						</Button>
					</HStack>
					<Button
						onClick={props.onClose}
						colorScheme={'blackAlpha'}
						size='sm'
						ml='auto'
					>
						Back
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
