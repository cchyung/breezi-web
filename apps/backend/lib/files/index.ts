import fs from "fs"
import path from "path"

/**
 * Fetches all schema files in the schema folder to generate
 * schema files for
 * @param dir the directory to search
 * @param inclusive whether to include direct dir items
 * @param filter a function to filter the files
 * @returns file references
 */
export const listFiles = (dir: string, filter?: (filePath: string) => boolean) => {
	let filePaths: string[] = []

	fs.readdirSync(dir).forEach((filePath) => {
		const fullItemPath = path.join(dir, filePath)
		if (fs.statSync(fullItemPath).isDirectory()) {
			const recursiveResults = listFiles(fullItemPath)
			filePaths = filePaths.concat(recursiveResults)
		} else {
			filePaths.push(fullItemPath)
		}
	})

	return filter ? filePaths.filter(filter) : filePaths
}

/**
 * Recursively searches upward parent directories for file.
 * Will stop when it finds the first file or reaches the root
 * @param dir the directory to start
 * @param file the file to find
 */
export const parentSearch = (dir, file) => {
	if (fs.readdirSync(dir).includes(file)) {
		return path.resolve(dir, file)
	}

	const parentDir = path.resolve(dir, "..")
	if (parentDir === dir) {
		return null
	}
	return parentSearch(parentDir, file)
}
