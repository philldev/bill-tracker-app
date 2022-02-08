import {
	Button,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react'
import { FC } from 'react'
import { BillForm } from './BillForm'

export const AddBill: FC<{ onClose: () => void; onSuccess: () => void }> = (
	props
) => {
	const modal = useDisclosure()
	const onSuccess = () => {
		modal.onClose()
		props.onSuccess()
	}
	return (
		<>
			<Button onClick={modal.onOpen} w='100%' colorScheme='green'>
				ADD BILL
			</Button>
			<AddBillModal {...modal} onSuccess={onSuccess} />
		</>
	)
}

const AddBillModal: FC<{
	isOpen: boolean
	onClose: () => void
	onSuccess: () => void
}> = (props) => {
	return (
		<Modal isCentered isOpen={props.isOpen} onClose={props.onClose}>
			<ModalOverlay />
			<ModalContent mx='4'>
				<ModalHeader>Add New Bill</ModalHeader>
				<ModalCloseButton />
				<BillForm onCancel={props.onClose} onSuccess={props.onSuccess} />
			</ModalContent>
		</Modal>
	)
}
