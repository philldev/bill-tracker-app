import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import db from '../../../prisma/db'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		return res.status(405).send('Method not allowed')
	}

	const session = await getSession({ req })

	if (!session) {
		return res.send({
			content:
				'This is protected content. You can access this content because you are signed in.',
		})
	}

	const bills = await db.bill.findMany({
		where: { userId: session.userId as string },
	})

	const totals = bills.reduce(
		(acc, bill) => ({
			total: acc.total + bill.amount,
			count: acc.count + 1,
		}),
		{ total: 0, count: 0 }
	)

	return res.status(200).json(totals)
}
