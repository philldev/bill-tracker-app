import { BillRepeat } from '../types/bill'

// given a string return a string with the first letter capitalized
export const capitalize = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

// given a number return dollar formatted string with thousands separator
export const formatDollar = (num: number) => {
	return '$ ' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

// given date string return a boolean if the date is valid
export const isValidDate = (date: string) => {
	return !isNaN(Date.parse(date))
}

// get todays date in dddd, mmm dd, yyyy with Intl.DateTimeFormat
export const getTodaysDate = () => {
	const date = new Date()
	return new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(date)
}

// get todays month in mmm yyyy with Intl.DateTimeFormat
export const getTodaysMonth = () => {
	const date = new Date()
	return new Intl.DateTimeFormat('en-US', {
		month: 'long',
		year: 'numeric',
	}).format(date)
}

// get date in dddd, mmm dd, yyyy with Intl.DateTimeFormat from a date string
export const getFormattedDate = (date: string | Date) => {
	const d = new Date(date)
	return new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(d)
}

export const getRepeatColors = () => {
	const colors = {
		never: 'red',
		daily: 'green',
		weekly: 'yellow',
		monthly: 'purple',
		yearly: 'blue',
	}
	return colors
}

export const getRepeatColor = (repeat: BillRepeat) => {
	const colors = getRepeatColors()
	return colors[repeat]
}

// get first day of the month in date format
export const getFirstDayOfMonth = (date: string | Date) => {
	const d = new Date(date)
	d.setDate(1)
	return d
}

// get last day of the month in date format
export const getLastDayOfMonth = (date: string | Date) => {
	const d = new Date(date)
	d.setMonth(d.getMonth() + 1)
	d.setDate(0)
	return d
}

// get yyyy-mm-dd from a date string or date object or string
export const getDateString = (date: string | Date) => {
	const d = new Date(date)
	return d.toISOString().split('T')[0]
}
