import fetch from "node-fetch"
import { catalogToObject } from "./htmlParser"
import { Icatalog, Icontent } from "./interfaces"
const BASEURL = "https://merchnow.com/catalogs/showList?"

/**
 * @param {string} string - A string to search for.
 * @param {Number} number - Offset for the API, if limit === itemsReturned, you can get next items with offset
 * @return {JSON} JSON - Resulting JSON
 */
export const getCatalog = async (
	string: string,
	offset = 0
): Promise<Icatalog> => {
	try {
		const response: Icatalog = await (
			await fetch(
				BASEURL +
					"name=" +
					string.replace(/\s/g, "-") +
					"&offset= " +
					offset +
					"&format=json"
			)
		).json()

		const Content: Array<Icontent> = catalogToObject(
			response.Content as string
		)

		return { ...response, Content }
	} catch (err) {
		if (err) {
			return err
		}
		throw err
	}
}
