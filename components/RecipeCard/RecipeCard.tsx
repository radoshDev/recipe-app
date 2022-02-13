import { ReactElement } from "react"
import Image from "next/image"
import Link from "next/link"
import styles from "./RecipeCard.module.css"

type Props = {
	title: string
	image: string | null
	slug: string
}

const RecipeCard = ({ image, title, slug }: Props): ReactElement => {
	return (
		<div className={styles.card}>
			<Link href={`/recipes/${slug}`}>
				<a>
					{image && <Image src={image} width={250} height={250} />}
					<h4 className={styles.title}>{title}</h4>
				</a>
			</Link>
		</div>
	)
}

export default RecipeCard
