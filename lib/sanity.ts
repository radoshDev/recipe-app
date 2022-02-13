import {
	createClient,
	createImageUrlBuilder,
	createPreviewSubscriptionHook,
	createPortableTextComponent,
	ClientConfig,
} from "next-sanity"

const config = { projectId: "w9mifk79", dataset: "production" }

const clientConfig: ClientConfig = {
	...config,
	apiVersion: "2021-10-21",
	useCdn: false,
}

export const sanityClient = createClient(clientConfig)

export const usePreviewSubscription = createPreviewSubscriptionHook(config)

const urlBuilder = createImageUrlBuilder(config)
export const urlFor = urlBuilder.image.bind(urlBuilder)

export const PortableText = createPortableTextComponent({
	...config,
	serializers: {},
})
