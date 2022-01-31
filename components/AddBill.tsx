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
	useDisclosure,
	VStack,
} from '@chakra-ui/react'
import { FC, useRef, useState } from 'react'

export const AddBill: FC = () => {
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
			>
				<Button w='100%' colorScheme='green'>
					ADD BILL
				</Button>
			</Flex>
			<AddBillModal {...modal} />
		</>
	)
}

const AddBillModal: FC<{ isOpen: boolean; onClose: () => void }> = (props) => {
	return (
		<Modal isCentered isOpen={props.isOpen} onClose={props.onClose}>
			<ModalOverlay />
			<ModalContent mx='4'>
				<ModalHeader>Add New Bill</ModalHeader>
				<ModalCloseButton />
				<BillForm onCancel={props.onClose} />
			</ModalContent>
		</Modal>
	)
}

type FormValues = {
	name: string
	amount: number
	date: string
}

const BillForm: FC<{ onCancel: () => void }> = (props) => {
	const [data, setData] = useState<FormValues>({
		name: '',
		amount: 0,
		date: '',
	})
	const [errors, setErrors] = useState<Partial<FormValues> | null>(null)

	const handleChange = (key: keyof FormValues, value: string) => {
		setData((prev) => ({ ...prev, [key]: value }))
	}

	const ref = useRef<HTMLFormElement | null>(null)

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { isValid, errors } = validate(data)
		if (isValid) {
			// TODO: submit data
			console.log(data)
		} else {
			setErrors(errors)
		}
	}

	const validate = (data: FormValues) => {
		const err: Partial<FormValues> = {}
		if (!data.name) {
			err.name = 'Name is required'
		} else if (data.name.length < 3) {
			err.name = 'Name must be at least 3 characters'
		} else if (data.name.length > 30) {
			err.name = 'Name must be less than 30 characters'
		}
		const isValid = Object.keys(err).length === 0
		return {
			errors: err,
			isValid,
		}
	}

	return (
		<form onSubmit={onSubmit} ref={ref}>
			<ModalBody>
				<VStack alignItems='stretch' spacing={4}>
					<FormControl isInvalid={Boolean(errors?.name)}>
						<FormLabel htmlFor='name'>Name</FormLabel>
						<Input
							value={data.name}
							onChange={(e) => handleChange('name', e.target.value)}
							id='name'
							type='name'
							placeholder='e.g. Netflix'
						/>
						<FormErrorMessage>{errors?.name}</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={Boolean(errors?.amount)}>
						<FormLabel htmlFor='amount'>Amount</FormLabel>
						<Input
							value={data.amount}
							onChange={(e) => handleChange('amount', e.target.value)}
							id='amount'
							type='amount'
						/>
						<FormErrorMessage>{errors?.amount}</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={Boolean(errors?.date)}>
						<FormLabel htmlFor='date'>Date</FormLabel>
						<Input
							value={data.date}
							onChange={(e) => handleChange('date', e.target.value)}
							id='date'
							type='date'
						/>
						<FormErrorMessage>{errors?.amount}</FormErrorMessage>
					</FormControl>
				</VStack>
			</ModalBody>
			<ModalFooter>
				<Button type='submit' colorScheme='green'>
					CREATE
				</Button>
			</ModalFooter>
		</form>
	)
}
