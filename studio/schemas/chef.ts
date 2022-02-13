import { Document } from "./types"

type Chef = {
	name: string
	image: string
	bio: unknown[]
}

const chef: Document<Chef> = {
	name: "chef",
	title: "Chef",
	type: "document",
	fields: [
		{
			name: "name",
			title: "Chef's Name",
			type: "string",
		},
		{
			name: "image",
			title: "Image",
			type: "image",
			options: {
				hotspot: true,
			},
		},
		{
			name: "bio",
			title: "Bio",
			type: "array",
			of: [
				{
					title: "Block",
					type: "block",
					styles: [{ title: "Normal", value: "normal" }],
					lists: [],
				},
			],
		},
	],
}

export default chef
