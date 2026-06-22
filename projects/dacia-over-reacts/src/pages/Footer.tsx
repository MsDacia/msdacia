import content from '../media/json/static.en-us.json'

export default function Footer() {
	return (
		<footer>
			<div id="social-media">
				{content.common.social?.map(social =>
					<a
						key={social.title}
						href={social.url}
						rel="noopener noreferrer"
						target="_blank"
						title={social.title}
					>
						<i className={social.icon} />
					</a>
				)}
			</div>

			<p id="copyright">
				<i className={content.common.copyright?.icon} />
				{content.common.copyright?.content}{' '}
				<a href={content.common.global?.url}>{content.common.global?.title}</a>
			</p>
		</footer>
	)
}
