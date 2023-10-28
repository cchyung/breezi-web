import { parentSearch } from "lib/files"

export const loadConfig = () => {
	require("dotenv").config({
		path: parentSearch(__dirname, ".env"),
	})
}
