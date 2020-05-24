import { parse } from "node-html-parser"

export const htmlToObject = async html => {
	const parsed = parse(html)
	const items = parsed.querySelectorAll(".product-list-item")
	const finish = []

	for (const item of items) {
		let result = {}
		const decorations = item.querySelectorAll(".image-decoration")
		const images = item.querySelectorAll("picture")
		const descriptions = item.querySelectorAll(".product-list-desc")
		if (decorations.length > 0) {
			for (const decoration of decorations) {
				const text = decoration.childNodes[0].rawText
				result = { ...result, decoration: text }
			}
		}
		if (images.length > 0) {
			for (const image of images) {
				const urls = []
				for (const child of image.childNodes) {
					if (child.rawAttrs) {
						const url =
							child.getAttribute("src") ||
							child.getAttribute("srcset")
						const alt = child.getAttribute("alt")
						const width = child.getAttribute("width")
						const height = child.getAttribute("height")

						if (alt || width || height) {
							if (alt && width && height) {
								urls.push({ url, alt, width, height })
							} else if (width && height) {
								urls.push({ url, width, height })
							} else {
								urls.push({ url, alt })
							}
						} else {
							urls.push({ url })
						}
					}
				}
				result = { ...result, images: urls }
			}
		}
		if (descriptions.length > 0) {
			for (const description of descriptions) {
				const texts = []
				for (const child of description.childNodes) {
					if (child.rawText.trim().length > 0) {
						const content = child.rawText.trim()
						let url = null

						if (child.tagName === "a") {
							url =
								"https://merchnow.com/" +
								child.getAttribute("href")
						}

						if (url) {
							texts.push({ content, url })
						} else {
							texts.push({ content })
						}
					}
				}
				result = { ...result, description: texts }
			}
		}
		finish.push(result)
	}
	return finish
}
