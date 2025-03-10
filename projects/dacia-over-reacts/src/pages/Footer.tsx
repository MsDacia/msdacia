import content from '../media/json/static.en-us.json'

export default function Footer() {
	return (
		<footer>
			<div id="social-media">
				{content.common.social?.map(social => (
					<a
						href={social.url}
						title={social.title}
						key={social.title}
						target="_blank"
						rel="noopener noreferrer"
					>
						<i className={social.icon} />
					</a>
				))}
			</div>

			<p id="copyright">
				<i className={content.common.copyright?.icon} />
				{content.common.copyright?.content}{' '}
				<a href={content.common.global?.url}>{content.common.global?.title}</a>
			</p>
		</footer>
	)
}
