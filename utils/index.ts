// given a string return a string with the first letter capitalized
export const capitalize = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

// given a number return dollar formatted string with thousands separator
export const formatDollar = (num: number) => {
	return '$ ' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}
