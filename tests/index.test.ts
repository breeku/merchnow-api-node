import { getCatalog } from "../src/index"

it("returns array of objects", async () => {
	expect.assertions(1)
	const result = await getCatalog("hail the sun")
	expect(result).toBeDefined()
})
