<template>
  <div class="theme-switcher">
    <!-- Simple Toggle Button -->
    <button 
      @click="toggleTheme"
      class="theme-toggle"
      :title="`Switch to ${nextThemeLabel} theme`"
    >
      <i :class="themeIcon"></i>
      <span class="theme-label">{{ themeLabel }}</span>
    </button>

    <!-- Advanced Theme Menu (shows on hover/click) -->
    <div class="theme-menu" :class="{ 'menu-open': showMenu }">
      <button 
        @click="showMenu = !showMenu" 
        class="menu-trigger"
        :title="'Theme: ' + themeLabel"
      >
        <i :class="themeIcon"></i>
        <i class="fas fa-chevron-down menu-arrow" :class="{ 'rotated': showMenu }"></i>
      </button>

      <div class="menu-options" v-show="showMenu">
        <button 
          @click="setLightTheme(); showMenu = false"
          class="theme-option"
          :class="{ active: currentMode === 'light' }"
        >
          <i class="fas fa-sun"></i>
          <span>Light</span>
          <i v-if="currentMode === 'light'" class="fas fa-check"></i>
        </button>

        <button 
          @click="setDarkTheme(); showMenu = false"
          class="theme-option"
          :class="{ active: currentMode === 'dark' }"
        >
          <i class="fas fa-moon"></i>
          <span>Dark</span>
          <i v-if="currentMode === 'dark'" class="fas fa-check"></i>
        </button>

        <button 
          @click="setSystemTheme(); showMenu = false"
          class="theme-option"
          :class="{ active: currentMode === 'system' }"
        >
          <i class="fas fa-desktop"></i>
          <span>System</span>
          <span v-if="currentMode === 'system'" class="system-indicator">
            ({{ systemPrefersDark ? 'Dark' : 'Light' }})
          </span>
          <i v-if="currentMode === 'system'" class="fas fa-check"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from '../composables/useTheme'

const {
  currentMode,
  systemPrefersDark,
  toggleTheme,
  setLightTheme,
  setDarkTheme,
  setSystemTheme,
  themeIcon,
  themeLabel,
  nextThemeLabel
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
  position: fixed;
  top: 15px;
  left: 30px;
  z-index: 1502;

  @media (max-width: 768px) {
    top: 10px;
    left: 20px;
  }

  // Simple toggle for basic usage
  .theme-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--bg-surface);
    border: 2px solid var(--border-color);
    color: var(--text-primary);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px var(--shadow-color);

    &:hover {
      border-color: var(--accent-color);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px var(--shadow-color);
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
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--bg-surface);
      border: 2px solid var(--border-color);
      color: var(--text-primary);
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px var(--shadow-color);

      &:hover {
        border-color: var(--accent-color);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px var(--shadow-color);
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
      position: absolute;
      top: calc(100% + 0.5rem);
      left: 0;
      background: var(--bg-surface);
      border: 2px solid var(--border-color);
      border-radius: 12px;
      box-shadow: 0 8px 32px var(--shadow-color);
      overflow: hidden;
      min-width: 160px;
      animation: menuSlideIn 0.2s ease-out;

      .theme-option {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        width: 100%;
        padding: 0.75rem 1rem;
        background: transparent;
        border: none;
        color: var(--text-primary);
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.9rem;

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
          width: 16px;
          text-align: center;
        }

        span {
          flex: 1;
        }

        .system-indicator {
          font-size: 0.8rem;
          color: var(--text-secondary);
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