import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Text,
	useDisclosure,
	VStack,
} from '@chakra-ui/react'
import { FC, useRef, useState } from 'react'
import { Bill } from '../types/bill'
import { AddBill } from './AddBill'
import { BillList } from './BillList'

export const PayBill: FC = () => {
	const modal = useDisclosure()
	return (
		<>
			<Flex
				onClick={modal.onOpen}
				p='4'
				borderTopWidth='1px'
				pos='absolute'
				bottom='0'
				insetX='0'
				bg='white'
			>
				<Button w='100%' colorScheme='green'>
					PAY BILL
				</Button>
			</Flex>
			<PayBillModal {...modal} />
		</>
	)
}

const PayBillModal: FC<{ isOpen: boolean; onClose: () => void }> = (props) => {
	return (
		<Modal isCentered size='full' isOpen={props.isOpen} onClose={props.onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Pay Bill</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack alignItems='stretch' spacing={4}>
						<AddBill />
						<Text>Or pay from past bills</Text>
						<BillList />
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}
