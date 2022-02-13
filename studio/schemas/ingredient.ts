import { Document } from "./types"

type Ingredient = {
	name: string
	image: string
	notes: string
}

const ingredient: Document<Ingredient> = {
	name: "ingredient",
	title: "Ingredient",
	type: "document",
	fields: [
		{
			name: "name",
			title: "Ingredient name",
			type: "string",
		},
		{
			name: "image",
			title: "Image",
			type: "image",
		},
		{
			name: "notes",
			title: "Notes",
			type: "text",
		},
	],
}

export default ingredient
