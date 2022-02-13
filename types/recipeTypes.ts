export interface Recipe {
	_createdAt: string
	_id: string
	_rev: string
	_type: string
	_updatedAt: string
	chef: Chef
	ingredient: Ingredient[]
	instructions: Instruction[]
	likes: number | null
	mainImage: MainImage
	name: string
	slug: Slug
}

interface Chef {
	_ref: string
	_type: string
}

interface Ingredient {
	_key: string
	ingredient: Ingredient2
	unit: string
	wholeNumber?: number
	fraction?: string
}

interface Ingredient2 {
	_ref: string
	_type: string
}

interface Instruction {
	_key: string
	_type: string
	children: Children[]
	markDefs: unknown[]
	style: string
}

interface Children {
	_key: string
	_type: string
	marks: unknown[]
	text: string
}

interface MainImage {
	_type: string
	asset: Asset
	crop?: Crop
	hotspot?: Hotspot
}

interface Asset {
	_ref: string
	_type: string
}

interface Crop {
	_type: string
	bottom: number
	left: number
	right: number
	top: number
}

interface Hotspot {
	_type: string
	height: number
	width: number
	x: number
	y: number
}

interface Slug {
	_type: string
	current: string
}

export interface FilteredRecipe {
	_id: string
	ingredient: FilteredIngredient[]
	instructions: Instruction[]
	likes: number
	mainImage: MainImage
	name: string
	slug: Slug
}

interface FilteredIngredient {
	_key: string
	fraction?: string
	ingredient: { name: string }
	unit: string
	wholeNumber?: number
}
