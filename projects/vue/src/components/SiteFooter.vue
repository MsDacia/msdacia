<template>
	<footer>
		<div id="social-media">
			<a
				v-for="social in content.common.social"
				:key="social.title"
				:href="social.url"
				:title="social.title"
				target="_blank"
				@click="handleSocialClick(social.title)"
				class="social-link"
			>
				<i :class="getFontAwesomeClass(social.icon)" />
			</a>
		</div>

		<p id="copyright">
			<i class="far fa-copyright" />
			{{ content.common.copyright.content }}
			<a
				:href="content.common.global.url"
				@click="handleHomeClick(content.common.global.title)"
				class="home-link"
			>
				{{ content.common.global.title }}
			</a>
		</p>
	</footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import contentData from '../data/static.en-us.json'

// Reactive data using Composition API (Vue 3 way!)
const content = ref(contentData)

// Methods using Composition API
const handleSocialClick = (title: string) => {
	// Modern analytics will be added later
	console.log('Social media clicked:', title)
}

const handleHomeClick = (title: string) => {
	console.log('Home link clicked:', title)
}

// Convert Semantic UI icon classes to FontAwesome classes
const getFontAwesomeClass = (semanticClass: string): string => {
	const iconMap: { [key: string]: string } = {
		'facebook icon': 'fab fa-facebook-f',
		'linkedin icon': 'fab fa-linkedin-in',
		'twitter icon': 'fab fa-twitter',
		'instagram icon': 'fab fa-instagram',
		'github icon': 'fab fa-github',
		'bitbucket icon': 'fab fa-bitbucket'
	}

	return iconMap[semanticClass] || 'fas fa-link'
}
</script>

<style lang="scss" scoped>
footer {
	background: #f8f9fa;
	border-top: 1px solid #e9ecef;
	font-size: 1rem;
	padding: 2rem 0;
	position: relative;
	text-align: center;
	z-index: 2;

	#social-media {
		align-content: center;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-bottom: 1rem;

		.social-link {
			border-radius: 50%;
			color: #6c757d;
			margin: 0 0.5rem 0.5rem 0;
			padding: 0.5rem;
			text-align: center;
			text-decoration: none;
			transition: all 0.3s ease;

			&:last-of-type {
				i {
					margin-right: 0;
				}
			}

			&:hover {
				background: rgba(66, 184, 131, 0.1);
				color: #42b883;
				cursor: pointer;
				transform: translateY(-2px);

				i {
					color: #42b883;
				}
			}

			i {
				font-size: 1.4rem;
				transition: color 0.3s ease;

				&:hover {
					color: #42b883;
				}
			}
		}
	}

	#copyright {
		font-size: 0.9rem;
		color: #6c757d;
		margin: 0;

		@media (max-width: 768px) {
			font-size: 0.8rem;
			margin-top: 0.5rem;
		}

		.home-link {
			color: #42b883;
			margin-left: 0.25rem;
			text-decoration: none;
			transition: color 0.3s ease;

			&:hover {
				color: #369870;
				text-decoration: underline;
			}
		}

		i {
			color: #6c757d;
			font-size: 0.8rem;
			margin-right: 0.25rem;
		}
	}
}
</style>
