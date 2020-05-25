import { parse } from "node-html-parser"
import { Icontent, Iimages, Idescription } from "./interfaces"

const getDecoration = (decorations: any[]): string => {
	let str = ""
	if (decorations.length > 0) {
		for (const decoration of decorations) {
			const text: string = decoration.childNodes[0].rawText
			str += text
		}
	}
	return str
}

const getDescriptions = (descriptions: any[]): Idescription[] => {
	const texts = []
	if (descriptions.length > 0) {
		for (const description of descriptions) {
			for (const child of description.childNodes) {
				if (child.rawText.trim().length > 0) {
					const tag: string = child.tagName
					const content: string = child.rawText.trim()
					let url = ""

					if (tag === "a") {
						url =
							"https://merchnow.com/" + child.getAttribute("href")
					}

					if (url !== "" || tag) {
						if (url !== "" && tag) {
							texts.push({ content, url, tag })
						} else if (tag) {
							texts.push({ content, tag })
						} else {
							texts.push({ content, url })
						}
					} else {
						texts.push({ content })
					}
				}
			}
		}
	}
	return texts
}

const getImages = (images: any[]): Iimages => {
	let imgs = {}
	if (images.length > 0) {
		for (const image of images) {
			for (const child of image.childNodes) {
				if (child.rawAttrs) {
					const url: string = child.getAttribute("src")
					const alt: string = child.getAttribute("alt")

					if (url && alt) {
						const sm: string = url.replace(
							"imageproductmd",
							"imageproductsm"
						)
						const md: string = url
						const lg: string = url.replace(
							"imageproductmd",
							"imageproductlg"
						)
						const xl: string = url.replace(
							"imageproductmd",
							"imageproductxl"
						)

						imgs = { sm, md, lg, xl, alt }
					}
				}
			}
		}
	}
	return imgs
}

export const catalogToObject = (html: string): Icontent[] => {
	const parsed: any = parse(html)
	const items = parsed.querySelectorAll(".product-list-item")
	const result: Icontent[] = []

	for (const item of items) {
		const decorations = item.querySelectorAll(".image-decoration")
		const images = item.querySelectorAll("picture")
		const descriptions = item.querySelectorAll(".product-list-desc")

		const obj: Icontent = {
			decoration: getDecoration(decorations),
			description: getDescriptions(descriptions),
			images: getImages(images)
		}

		result.push(obj)
	}
	return result
}
