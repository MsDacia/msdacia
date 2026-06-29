<template>
	<div class="theme-switcher" data-test="theme-switcher">
		<!-- Simple Toggle Button (touch devices) -->
		<UIButton
			button-style="text"
			class="theme-toggle"
			data-test="theme-toggle"
			:title="`Switch to ${nextThemeLabel} theme`"
			@click="toggleTheme"
		>
			<UIIcon :icon="themeIcon" />
			<span class="theme-label">{{ themeLabel }}</span>
		</UIButton>

		<!-- Advanced Menu (pointer devices) -->
		<div class="theme-menu" :class="{ 'menu-open': showMenu }">
			<UIButton
				button-style="text"
				class="menu-trigger"
				data-test="menu-trigger"
				:title="`Theme: ${themeLabel}`"
				@click="showMenu = !showMenu"
			>
				<UIIcon :icon="themeIcon" />
				<span class="theme-label">{{ themeLabel }}</span>
				<UIIcon icon="SVGChevronDown" class="menu-arrow" data-test="menu-arrow" :class="{ rotated: showMenu }" />
			</UIButton>

			<div v-show="showMenu" class="menu-options" data-test="menu-options">
				<UIButton
					v-for="option in themeOptions"
					:key="option.mode"
					button-style="text"
					class="theme-option"
					data-test="theme-option"
					:class="{ active: currentMode === option.mode }"
					@click="selectTheme(option)"
				>
					<UIIcon :icon="option.icon" />

					<span>
						{{ option.label }}
						<span v-if="option.mode === 'system'" class="system-indicator">
							({{ systemPrefersDark ? 'Dark' : 'Light' }})
						</span>
					</span>

					<UIIcon v-if="currentMode === option.mode" icon="SVGCheck" class="check-icon" data-test="check-icon" />
				</UIButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UIButton, UIIcon } from 'ui-components'
import { useTheme, type ThemeMode } from '../composables/useTheme'

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

interface ThemeOption {
	mode: ThemeMode
	label: string
	icon: string
	apply: () => void
}

const themeOptions: ThemeOption[] = [
	{
		apply: setLightTheme,
		icon: 'SVGSun',
		label: 'Light',
		mode: 'light',
	},
	{
		apply: setDarkTheme,
		icon: 'SVGMoon',
		label: 'Dark',
		mode: 'dark',
	},
	{
		apply: setSystemTheme,
		icon: 'SVGComputerMonitor',
		label: 'System',
		mode: 'system',
	},
]

const selectTheme = (option: ThemeOption) => {
	option.apply()
	showMenu.value = false
}

// Expose properties for testing
defineExpose({
	showMenu,
	currentMode,
	nextThemeLabel,
	selectTheme,
	setDarkTheme,
	setLightTheme,
	setSystemTheme,
	systemPrefersDark,
	themeIcon,
	themeLabel,
	themeOptions,
	toggleTheme,
})

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

	@include max-width(tablet) {
		left: $size-20;
		top: $size-10;
	}

	// Simple toggle for basic usage
	.theme-toggle {
		align-items: center;
		background: var(--bg-surface);
		border-radius: $size-8;
		box-shadow: 0 $size-2 $size-8 var(--shadow-color);
		color: var(--text-primary);
		cursor: pointer;
		display: flex;
		font-size: 0.9rem;
		font-weight: $weight-medium;
		gap: $size-8;
		padding: $size-8 $size-16;
		transition: all 0.3s ease;

		&:hover {
			border-color: var(--accent-color);
			box-shadow: 0 $size-4 $size-12 var(--shadow-color);
			transform: translateY(-1px);
		}

		.theme-label {
			@include max-width(mobile) {
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
			border-radius: $size-8;
			border: $size-2 solid var(--border-color);
			box-shadow: 0 $size-2 $size-8 var(--shadow-color);
			color: var(--text-primary);
			cursor: pointer;
			display: flex;
			font-size: 0.9rem;
			gap: $size-8;
			padding: $size-8 $size-16;
			transition: all 0.3s ease;

			&:hover {
				border-color: var(--accent-color);
				box-shadow: 0 $size-4 $size-12 var(--shadow-color);
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
			border-radius: $size-12;
			border: $size-2 solid var(--border-color);
			box-shadow: 0 $size-8 $size-32 var(--shadow-color);
			left: 0;
			min-width: 160px;
			overflow: hidden;
			position: absolute;
			top: calc(100% + $size-8);

			.theme-option {
				align-items: center;
				background: transparent;
				border: none;
				color: var(--text-primary);
				cursor: pointer;
				display: flex;
				font-size: 0.9rem;
				gap: $size-12;
				padding: $size-12 $size-16;
				transition: all 0.2s ease;
				width: 100%;

				&:hover {
					background: var(--bg-hover);
					color: var(--accent-color);
				}

				&.active {
					background: var(--accent-color-light);
					color: var(--accent-color);
					font-weight: $weight-semibold;
				}

				&:not(:last-child) {
					border-bottom: 1px solid var(--border-color);
				}

				[data-ui="icon"]:first-child {
					height: $size-16;
					text-align: center;
					width: $size-16;
				}

				span {
					flex: 1;
				}

				.system-indicator {
					color: var(--text-secondary);
					font-size: 0.8rem;
					font-weight: $weight-normal;
				}

				.check-icon {
					color: var(--accent-color);
					height: 0.8rem;
					width: 0.8rem;
				}
			}
		}

		// Hide simple toggle when menu is available
		&.menu-open ~ .theme-toggle {
			display: none;
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
</style>
