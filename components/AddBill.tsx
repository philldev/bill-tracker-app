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
	useDisclosure,
	VStack,
} from '@chakra-ui/react'
import { FC, useRef, useState } from 'react'
import { mutate } from 'swr'
import { Bill } from '../types/bill'
import { isValidDate } from '../utils'

export const AddBill: FC = () => {
	const modal = useDisclosure()
	return (
		<>
			<Button onClick={modal.onOpen} w='100%' colorScheme='green'>
				ADD BILL
			</Button>
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
				<BillForm onCancel={props.onClose} onSuccess={props.onClose} />
			</ModalContent>
		</Modal>
	)
}

type FormValues = Omit<Bill, 'id' | 'createdAt' | 'updatedAt'>

const BillForm: FC<{ onCancel: () => void; onSuccess: () => void }> = (
	props
) => {
	const [data, setData] = useState<FormValues>({
		name: '',
		amount: 0,
		date: '',
		repeat: 'never',
	})
	const [errors, setErrors] = useState<Partial<FormValues> | null>(null)

	const handleChange = (key: keyof FormValues, value: string) => {
		setData((prev) => ({ ...prev, [key]: value }))
	}

	const ref = useRef<HTMLFormElement | null>(null)

	const [loading, setIsLoading] = useState(false)

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { isValid, errors } = validate(data)
		if (isValid) {
			try {
				setIsLoading(true)
				await fetch('/api/bills/create', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				})
				mutate('/api/bills')
				props.onSuccess()
			} catch (error) {
				setIsLoading(false)
				console.error(error)
			}
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
		} else if (!isValidDate(data.date)) {
			err.date = 'Date is invalid'
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
					<FormControl isInvalid={Boolean(errors?.repeat)}>
						<FormLabel htmlFor='repeat'>repeat</FormLabel>
						<Select
							value={data.repeat}
							onChange={(e) => handleChange('repeat', e.target.value)}
							id='repeat'
						>
							<option value='never'>Never</option>
							<option value='weekly'>Weekly</option>
							<option value='monthly'>Monthly</option>
							<option value='yearly'>Yearly</option>
						</Select>
						<FormErrorMessage>{errors?.repeat}</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={Boolean(errors?.date)}>
						<FormLabel htmlFor='date'>Date</FormLabel>
						<Input
							value={data.date}
							onChange={(e) => handleChange('date', e.target.value)}
							id='date'
							type='date'
						/>
						<FormErrorMessage>{errors?.date}</FormErrorMessage>
					</FormControl>
				</VStack>
			</ModalBody>
			<ModalFooter>
				<Button isLoading={loading} type='submit' colorScheme='green'>
					CREATE
				</Button>
			</ModalFooter>
		</form>
	)
}
