import {
	BoxProps,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
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
import useSWR, { mutate } from 'swr'
import { capitalize, formatDollar, getFormattedDate } from '../utils'
import { AddBill } from './AddBill'
import { BillForm } from './BillForm'

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
	const editBillModal = useDisclosure()
	return (
		<Drawer placement='bottom' isOpen={props.isOpen} onClose={props.onClose}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerHeader>Bill Detail</DrawerHeader>
				<DrawerCloseButton />
				<DrawerBody>
					<BillCard bill={props.bill} />
				</DrawerBody>
				<DrawerFooter>
					<HStack>
						<Button
							onClick={async () => {
								await fetch('/api/bills/' + props.bill.id, {
									method: 'DELETE',
									headers: {
										'Content-Type': 'application/json',
									},
								})
								mutate('/api/bills')
								props.onClose()
							}}
							variant={'outline'}
							colorScheme='red'
							size='sm'
						>
							Delete
						</Button>
						<Button
							onClick={editBillModal.onOpen}
							variant={'outline'}
							size='sm'
						>
							Edit
						</Button>
						<EditBillModal
							bill={props.bill}
							onCancel={editBillModal.onClose}
							onSuccess={editBillModal.onClose}
							{...editBillModal}
						/>
					</HStack>
					<Button
						onClick={props.onClose}
						colorScheme={'blackAlpha'}
						size='sm'
						ml='auto'
					>
						Back
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}

const EditBillModal: FC<{
	onCancel: () => void
	onSuccess: () => void
	isOpen: boolean
	onClose: () => void
	bill: Bill
}> = (props) => {
	return (
		<Modal isCentered isOpen={props.isOpen} onClose={props.onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Edit Bill</ModalHeader>
				<ModalCloseButton />
				<BillForm
					onCancel={props.onCancel}
					onSuccess={props.onSuccess}
					initialValue={props.bill}
				/>
			</ModalContent>
		</Modal>
	)
}
