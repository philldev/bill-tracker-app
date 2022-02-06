import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import db from '../../../prisma/db'
import {
	getFirstDayOfMonth,
	getLastDayOfMonth,
	isValidDate,
} from '../../../utils'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req })

	if (!session) {
		return res.send({
			content:
				'This is protected content. You can access this content because you are signed in.',
		})
	}
	if (req.method === 'GET') {
		const bills = await db.bill.findMany({
			where: {
				userId: session.userId as string,
				date: {
					gte: getFirstDayOfMonth(new Date()),
					lte: getLastDayOfMonth(new Date()),
				},
			},
		})
		return res.status(200).json(bills)
	} else if (req.method === 'POST') {
		const validate = (data: any) => {
			const err: {
				name?: string
				amount?: string
				date?: string
			} = {}
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

		const { isValid, errors } = validate(req.body)

		if (!isValid) {
			return res.status(400).json(errors)
		}

		const bill = await db.bill.create({
			data: {
				name: req.body.name as string,
				amount: parseInt(req.body.amount),
				date: new Date(req.body.date),
				repeat: 'monthly',
				user: {
					connect: {
						id: session.userId as string,
					},
				},
			},
		})

		return res.status(200).json({ status: 'success', data: bill })
	}

	return res.status(405).send('Method not allowed')
}
