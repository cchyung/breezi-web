export const parseFileExtension = (filePath: string) => {
	const re = /(?:\.([^.]+))?$/
	const ext = re.exec(filePath)[1]
	return ext
}

export const filePathWithoutExtension = (filePath: string) => {
	const re = /(?:\.([^.]+))?$/
	const ext = re.exec(filePath)[1]
	return filePath.replace(`.${ext}`, "")
}

export const parseFileNameFromPathWithoutExtension = (filePath: string) => {
	const re = /(?:\.([^.]+))?$/
	const ext = re.exec(filePath)[1]
	const fileName = filePath.replace(`.${ext}`, "").split("/").pop()
	return fileName
}
