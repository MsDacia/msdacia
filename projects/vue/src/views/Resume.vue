<template>
	<div class="resume">
		<div class="resume-intro">
			<h1>{{ content.resume.title }}</h1>
			<p class="resume-address">{{ content.resume.address }}</p>

			<ul class="resume-contact">
				<li>
					<a :href="`mailto:${content.resume.contact.email}`">{{ content.resume.contact.email }}</a>
				</li>
				<li
					v-for="link in content.resume.contact.links"
					:key="link.title"
				>
					<a
						:href="link.url"
						rel="noopener noreferrer"
						target="_blank"
					>{{ link.title }}</a>
				</li>
			</ul>
		</div>

		<section class="resume-section resume-objective">
			<h3>{{ content.resume.objective.title }}</h3>
			<p class="objective-headline">{{ content.resume.objective.headline }}</p>
			<p class="objective-subtitle">{{ content.resume.objective.subtitle }}</p>
			<p>{{ content.resume.objective.copy }}</p>
		</section>

		<section class="resume-section resume-skills">
			<h3>{{ content.resume.skills.title }}</h3>

			<div class="skills-grid">
				<div
					v-for="skill in content.resume.skills.categories"
					:key="skill.title"
					class="skill-category"
				>
					<h4>{{ skill.title }}</h4>
					<p>{{ skill.copy }}</p>
				</div>
			</div>
		</section>

		<!-- Professional Experience Timeline (shared with the About view) -->
		<ExperienceTimeline />

		<section class="resume-section resume-projects">
			<h3>{{ content.resume.projects.title }}</h3>

			<ul class="projects-list">
				<li
					v-for="project in content.resume.projects.categories"
					:key="project.title"
				>
					<a
						:href="project.url"
						rel="noopener noreferrer"
						target="_blank"
					>{{ project.title }}</a>
				</li>
			</ul>
		</section>

		<section class="resume-section resume-education">
			<h3>{{ content.resume.education.title }}</h3>

			<div class="education-card">
				<h4>{{ content.resume.education.school }}</h4>
				<span class="education-meta">{{ content.resume.education.location }}</span>

				<ul class="education-list">
					<li>Major: {{ content.resume.education.major }}, {{ content.resume.education.degree }}</li>
					<li>Minor: {{ content.resume.education.minor }}</li>
				</ul>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ExperienceTimeline from '../components/ExperienceTimeline.vue'
import contentData from '../data/static.en-us.json'

const content = ref(contentData)

// Expose properties for testing
defineExpose({
	content,
})
</script>

<style lang="scss" scoped>
.resume {
	margin: 0 auto;
	max-width: 1200px;
	padding: 0 $size-16;

	.resume-intro {
		background: var(--color-background);
		border-radius: $size-16;
		margin-bottom: $size-48;
		padding: $size-32;
		text-align: center;

		@include max-width(tablet) {
			padding: $size-24;
		}

		h1 {
			color: var(--color-heading);
			font-size: $size-48;
			font-weight: $weight-bold;
			margin-bottom: $size-8;

			@include max-width(tablet) {
				font-size: 2.2rem;
			}
		}

		.resume-address {
			color: var(--color-text);
			font-size: $size-16;
			font-style: italic;
			margin: 0 0 $size-16 0;
		}

		.resume-contact {
			display: flex;
			flex-wrap: wrap;
			gap: $size-24;
			justify-content: center;
			list-style: none;
			margin: 0;
			padding: 0;

			a {
				color: var(--color-text-secondary);
				font-weight: $weight-medium;
				text-decoration: none;

				&:hover {
					color: #369870;
					text-decoration: underline;
				}
			}
		}
	}

	.resume-section {
		background: var(--color-background);
		border-left: 4px solid var(--color-text-secondary);
		border-radius: 12px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
		margin-bottom: $size-32;
		padding: $size-24;

		h3 {
			color: var(--color-text-secondary);
			font-size: 1.3rem;
			font-weight: $weight-semibold;
			margin-bottom: $size-16;
		}

		h4 {
			color: var(--color-text);
			font-size: 1.1rem;
			font-weight: $weight-semibold;
			margin: 0 0 $size-8 0;
		}

		p {
			color: var(--color-text);
			font-size: $size-16;
			line-height: 1.7;
			margin: 0;
		}
	}

	.resume-objective {
		.objective-headline {
			color: var(--color-text);
			font-weight: $weight-semibold;
			margin-bottom: $size-4;
		}

		.objective-subtitle {
			color: var(--color-text-secondary);
			font-style: italic;
			margin-bottom: $size-16;
		}
	}

	.skills-grid {
		display: grid;
		gap: $size-24;

		@include min-width(tablet) {
			grid-template-columns: repeat(2, 1fr);
		}

		.skill-category {
			h4 {
				color: var(--color-text-secondary);
			}
		}
	}

	.education-card {
		.education-meta {
			color: var(--color-text);
			display: block;
			font-size: 0.9rem;
			font-style: italic;
			margin-bottom: $size-16;
		}

		.education-list {
			list-style: none;
			margin: 0;
			padding: 0;

			li {
				color: var(--color-text);
				line-height: 1.6;
				padding: $size-4 0 $size-4 $size-24;
				position: relative;

				&::before {
					color: var(--color-text-secondary);
					content: '▸';
					font-weight: $weight-bold;
					left: 0;
					position: absolute;
				}
			}
		}
	}

	.projects-list {
		display: flex;
		flex-wrap: wrap;
		gap: $size-24;
		list-style: none;
		margin: 0;
		padding: 0;

		a {
			color: var(--color-text-secondary);
			font-weight: $weight-medium;
			text-decoration: none;

			&:hover {
				color: #369870;
				text-decoration: underline;
			}
		}
	}
}
</style>
