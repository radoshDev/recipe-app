import "../styles/globals.css"
import type { AppProps } from "next/app"
import Link from "next/link"
import { ReactElement } from "react"

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
	return (
		<>
			<nav className="navigation">
				<Link href="/">
					<a>Alex&apos;s Kitchen 🍍</a>
				</Link>
			</nav>
			<main>
				<Component {...pageProps} />
			</main>
		</>
	)
}

export default MyApp
