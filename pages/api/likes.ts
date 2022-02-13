import type { NextApiRequest, NextApiResponse } from "next"
import { sanityClient } from "../../lib/sanity"

sanityClient.config({
	token: process.env.SANITY_TOKEN,
})
type Likes = {
	likes: number
}
export default async function handleLikes(
	request: NextApiRequest,
	response: NextApiResponse<Likes>
): Promise<void> {
	if (request.method === "POST") {
		const { _id } = JSON.parse(request.body)
		const data = await sanityClient
			.patch(_id)
			.setIfMissing({ likes: 0 })
			.inc({ likes: 1 })
			.commit<Likes>()
		response.status(200).json({ likes: data.likes })
		return
	}

	if (request.method === "GET") {
		const data = await sanityClient.fetch(
			`*[_type == "recipe"]{likes, _id, name}`
		)
		response.status(200).json(data)
	}
}
