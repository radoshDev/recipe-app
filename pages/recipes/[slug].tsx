import { useMemo, useState } from "react"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import {
	sanityClient,
	urlFor,
	PortableText,
	usePreviewSubscription,
} from "../../lib/sanity"
import { FilteredRecipe } from "../../types/recipeTypes"

const queryRecipe = `*[_type == "recipe" && slug.current == $slug][0]{
	_id, 
	name, 
	slug, 
	mainImage, 
	ingredient[]{_key, unit, wholeNumber, fraction, ingredient->{name}},
	instructions,
	likes
}`

type Props = {
	recipe: FilteredRecipe
	preview: boolean
}

const Recipe: NextPage<Props> = ({ recipe: data, preview }: Props) => {
	const { data: recipe } = usePreviewSubscription<FilteredRecipe>(queryRecipe, {
		params: { slug: data?.slug.current },
		initialData: data,
		enabled: preview,
	})
	const router = useRouter()
	const [likes, setLikes] = useState(recipe.likes)
	const imageUrl = useMemo(
		() => urlFor(recipe.mainImage).width(1000).url(),
		[recipe.mainImage.asset._ref]
	)
	const addLike = async (): Promise<void> => {
		try {
			const response = await fetch("/api/likes", {
				method: "POST",
				body: JSON.stringify({ _id: recipe._id }),
			})
			const likesData: { likes: number } = await response.json()
			setLikes(likesData.likes)
		} catch (error) {
			console.log(error)
		}
	}
	if (router.isFallback) {
		return <div>Loading...</div>
	}
	return (
		<article>
			<h1>{recipe.name}</h1>
			<button type="button" className="likes-btn" onClick={addLike}>
				{likes} ❤️
			</button>
			<main style={{ display: "flex", gap: "20px" }}>
				{imageUrl && (
					<Image src={imageUrl} width={500} height={500} alt={recipe.name} />
				)}
				<div>
					<ul>
						{recipe.ingredient?.map(
							({ _key, ingredient, unit, fraction, wholeNumber }) => (
								<li key={_key}>
									{wholeNumber} {fraction} {unit}
									<br />
									{ingredient.name}
								</li>
							)
						)}
					</ul>
					<PortableText blocks={recipe.instructions} />
				</div>
			</main>
		</article>
	)
}
type Slug = {
	slug: string
}
export async function getStaticPaths(): Promise<
	ReturnType<GetStaticPaths<Slug>>
> {
	const paths = await sanityClient.fetch<{ params: Slug }[]>(`
		*[_type == "recipe" && defined(slug.current)]{
			"params": {"slug": slug.current}
		}
	`)
	return {
		paths,
		fallback: true,
	}
}

export const getStaticProps: GetStaticProps<Props, Slug> = async ({
	params,
}) => {
	if (!params) throw new Error("Not passed params")
	const recipe = await sanityClient.fetch<FilteredRecipe>(queryRecipe, params)
	return {
		props: { recipe, preview: true },
	}
}

export default Recipe
