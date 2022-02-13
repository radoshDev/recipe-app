import { GetStaticProps, NextPage } from "next"
import Head from "next/head"
import RecipeCard from "../components/RecipeCard/RecipeCard"
import { sanityClient, urlFor } from "../lib/sanity"
import { Recipe as RecipeT } from "../types/recipeTypes"

type Recipes = Pick<RecipeT, "_id" | "name" | "slug" | "mainImage">[]
type Props = {
	recipes: Recipes
}

const queryRecipe = `*[_type == "recipe"]{_id, name, slug, mainImage}`

const Home: NextPage<Props> = ({ recipes }: Props) => {
	return (
		<div className="wrapper">
			<Head>
				<title>Alex&apos;s Kitchen 🍍</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="test">
				<h1>My recipes</h1>
				{recipes.length > 0 ? (
					<div className="recipes-container">
						{recipes.map(recipe => (
							<RecipeCard
								title={recipe.name}
								image={urlFor(recipe.mainImage).url()}
								slug={recipe.slug.current}
								key={recipe._id}
							/>
						))}
					</div>
				) : (
					<h3>No recipes found...</h3>
				)}
			</div>
		</div>
	)
}

export async function getStaticProps(): Promise<ReturnType<GetStaticProps>> {
	const recipes = await sanityClient.fetch<Recipes>(queryRecipe)
	return {
		props: {
			recipes,
		},
	}
}

export default Home
