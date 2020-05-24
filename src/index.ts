import fetch from "node-fetch"
import { htmlToObject } from "./htmlToJson"
const BASEURL = "https://merchnow.com/catalogs/showList?"

/**
 * @param {string} string - A string to search for.
 * @param {Number} number - Offset for the API, if limit === itemsReturned, you can get next items with offset
 * @return {Array} Array - Array of object's that includes all result's
 */
export const merchSearch = async (string, offset = 0) => {
	try {
		const response = await (
			await fetch(
				BASEURL +
					"name=" +
					string.replace(/\s/g, "-") +
					"&offset= " +
					offset +
					"&format=json"
			)
		).json()

		const Content = await htmlToObject(response.Content)

		return { ...response, Content }
	} catch (err) {
		if (err) {
			return err
		}
		throw err
	}
}
