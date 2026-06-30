<template>
	<div class="resume" data-test="resume">
		<div class="resume-intro">
			<UIHeading :heading="1" centered>{{ content.resume.title }}</UIHeading>
			<p class="resume-address" data-test="resume-address">{{ content.resume.address }}</p>

			<ul class="resume-contact" data-test="resume-contact">
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

		<UICard
			class="resume-section resume-objective"
			data-test="resume-objective"
			:heading="3"
			:title="content.resume.objective.title"
		>
			<p class="objective-headline" data-test="objective-headline">{{ content.resume.objective.headline }}</p>

			<p class="objective-subtitle" data-test="objective-subtitle">{{ content.resume.objective.subtitle }}</p>

			<p>{{ content.resume.objective.copy }}</p>
		</UICard>

		<UICard
			class="resume-section resume-skills"
			data-test="resume-skills"
			:heading="3"
			:title="content.resume.skills.title"
		>
			<div class="skills-grid">
				<div
					v-for="skill in content.resume.skills.categories"
					:key="skill.title"
					class="skill-category"
					data-test="skill-category"
				>
					<UIHeading :heading="4">{{ skill.title }}</UIHeading>
					<p>{{ skill.copy }}</p>
				</div>
			</div>
		</UICard>

		<!-- Professional Experience Timeline (shared with the About view) -->
		<ExperienceTimeline />

		<UICard
			class="resume-section resume-projects"
			data-test="resume-projects"
			:heading="3"
			:title="content.resume.projects.title"
		>
			<ul class="projects-list" data-test="projects-list">
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
		</UICard>

		<UICard
			class="resume-section resume-education"
			data-test="resume-education"
			:heading="3"
			:title="content.resume.education.title"
		>
			<div class="education-card">
				<UIHeading :heading="4">{{ content.resume.education.school }}</UIHeading>

				<span class="education-meta">{{ content.resume.education.location }}</span>

				<ul class="education-list">
					<li>Major: {{ content.resume.education.major }}, {{ content.resume.education.degree }}</li>
					<li>Minor: {{ content.resume.education.minor }}</li>
				</ul>
			</div>
		</UICard>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UICard, UIHeading } from 'ui-components'
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

		:deep(.ui-heading) {
			margin-bottom: $size-8;
		}

		:deep([data-ui-role='title']) {
			color: var(--color-heading);
			font-size: $size-48;
			font-weight: $weight-bold;

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
		border-left: $size-4 solid var(--color-text-secondary);
		border-radius: $size-12;
		box-shadow: 0 $size-2 $size-10 rgba(0, 0, 0, 0.05);
		margin-bottom: $size-32;
		padding: $size-24;

		:deep(.ui-card__content) {
			padding: 0;
		}

		:deep(.ui-card__header) {
			margin: 0 0 $size-16 0;
			padding: 0;

			[data-ui-role='title'] {
				color: var(--color-text-secondary);
				font-size: 1.3rem;
				font-weight: $weight-semibold;
			}
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
			:deep([data-ui-role='title']) {
				color: var(--color-text-secondary);
				font-size: 1.1rem;
				font-weight: $weight-semibold;
				margin: 0 0 $size-8 0;
			}
		}
	}

	.education-card {
		:deep([data-ui-role='title']) {
			color: var(--color-text);
			font-size: 1.1rem;
			font-weight: $weight-semibold;
			margin: 0 0 $size-8 0;
		}

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
