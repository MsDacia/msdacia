<template>
	<div class="theme-switcher">
		<!-- Simple Toggle Button -->
		<button
			@click="toggleTheme"
			class="theme-toggle"
			:title="`Switch to ${nextThemeLabel} theme`"
		>
			<i :class="themeIcon" />
			<span class="theme-label">{{ themeLabel }}</span>
		</button>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from '../composables/useTheme'

const {
	currentMode,
	nextThemeLabel,
	setDarkTheme,
	setLightTheme,
	setSystemTheme,
	systemPrefersDark,
	themeIcon,
	themeLabel,
	toggleTheme,
} = useTheme()

const showMenu = ref(false)

// Close menu when clicking outside
if (typeof document !== 'undefined') {
	document.addEventListener('click', (e) => {
		const target = e.target as HTMLElement
		if (!target.closest('.theme-switcher')) {
			showMenu.value = false
		}
	})
}
</script>

<style lang="scss" scoped>
.theme-switcher {
	left: 30px;
	position: fixed;
	top: 15px;
	z-index: 1502;

	@media (max-width: 768px) {
		left: 20px;
		top: 10px;
	}

	// Simple toggle for basic usage
	.theme-toggle {
		align-items: center;
		background: var(--bg-surface);
		border-radius: 8px;
		border: 2px solid var(--border-color);
		box-shadow: 0 2px 8px var(--shadow-color);
		color: var(--text-primary);
		cursor: pointer;
		display: flex;
		font-size: 0.9rem;
		font-weight: 500;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		transition: all 0.3s ease;

		&:hover {
			border-color: var(--accent-color);
			box-shadow: 0 4px 12px var(--shadow-color);
			transform: translateY(-1px);
		}

		.theme-label {
			@media (max-width: 480px) {
				display: none;
			}
		}
	}

	// Advanced menu for power users
	.theme-menu {
		position: relative;

		.menu-trigger {
			align-items: center;
			background: var(--bg-surface);
			border-radius: 8px;
			border: 2px solid var(--border-color);
			box-shadow: 0 2px 8px var(--shadow-color);
			color: var(--text-primary);
			cursor: pointer;
			display: flex;
			font-size: 0.9rem;
			gap: 0.5rem;
			padding: 0.5rem 1rem;
			transition: all 0.3s ease;

			&:hover {
				border-color: var(--accent-color);
				box-shadow: 0 4px 12px var(--shadow-color);
				transform: translateY(-1px);
			}

			.menu-arrow {
				font-size: 0.7rem;
				transition: transform 0.3s ease;

				&.rotated {
					transform: rotate(180deg);
				}
			}
		}

		.menu-options {
			animation: menuSlideIn 0.2s ease-out;
			background: var(--bg-surface);
			border-radius: 12px;
			border: 2px solid var(--border-color);
			box-shadow: 0 8px 32px var(--shadow-color);
			left: 0;
			min-width: 160px;
			overflow: hidden;
			position: absolute;
			top: calc(100% + 0.5rem);

			.theme-option {
				align-items: center;
				background: transparent;
				border: none;
				color: var(--text-primary);
				cursor: pointer;
				display: flex;
				font-size: 0.9rem;
				gap: 0.75rem;
				padding: 0.75rem 1rem;
				transition: all 0.2s ease;
				width: 100%;

				&:hover {
					background: var(--bg-hover);
					color: var(--accent-color);
				}

				&.active {
					background: var(--accent-color-light);
					color: var(--accent-color);
					font-weight: 600;
				}

				&:not(:last-child) {
					border-bottom: 1px solid var(--border-color);
				}

				i:first-child {
					text-align: center;
					width: 16px;
				}

				span {
					flex: 1;
				}

				.system-indicator {
					color: var(--text-secondary);
					font-size: 0.8rem;
					font-weight: normal;
				}

				.fa-check {
					color: var(--accent-color);
					font-size: 0.8rem;
				}
			}
		}

		// Hide simple toggle when menu is available
		&.menu-open ~ .theme-toggle {
			display: none;
		}
	}
}

@keyframes menuSlideIn {
	from {
		opacity: 0;
		transform: translateY(-8px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

// Use advanced menu by default, fallback to simple toggle
@media (hover: hover) {
	.theme-toggle {
		display: none;
	}

	.theme-menu {
		display: block;
	}
}

@media (hover: none) {
	.theme-toggle {
		display: flex;
	}

	.theme-menu {
		display: none;
	}
}
</style>
