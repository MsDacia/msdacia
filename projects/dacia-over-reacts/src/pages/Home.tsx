import content from '../media/json/static.en-us.json'

export default function Home() {
	return (
		<div className="copy">
			<h1>{content.common.global?.prefix ?? ''}{content.common.global?.name ?? ''}</h1>

			<p><em>{content.common.global?.copy ?? ''}</em></p>

			<h2>{content.common.global?.copy2 ?? ''}</h2>

			<p>{content.common.global?.tagline ?? ''}</p>
		</div>
	);
}
