export type BillRepeat = 'never' | 'daily' | 'weekly' | 'monthly' | 'yearly'

export type Bill = {
	id: string
	createdAt: string
	updatedAt: string
	name: string
	amount: number
	date: string
	repeat: BillRepeat
}
