<template>
  <header>
    <SwitchTheme />
    
    <div class="item" @click="showMenu = !showMenu">
      <i class="toggle off icon" :class="[showMenu ? 'hide-content' : 'show-content']"></i>
      <i class="toggle on icon" :class="[showMenu ? 'show-content' : 'hide-content']"></i>
      <em :class="[showMenu ? 'active' : '']">{{ content.common.global.menu }}</em>
    </div>

    <div class="menu" :class="[showMenu ? 'show-content' : 'hide-content']">
      <router-link 
        v-for="headerNav in content.common.navigation" 
        :key="headerNav.item"
        class="nav-link" 
        :to="headerNav.path" 
        @click="handleNavClick(headerNav.title)"
      >
        <i class="terminal icon"></i> {{ headerNav.title }}
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SwitchTheme from './SwitchTheme.vue'
import contentData from '../data/static.en-us.json'

// Reactive data using Composition API (Vue 3 way!)
const content = ref(contentData)
const showMenu = ref(false)

// Methods using Composition API
const handleNavClick = (title: string) => {
  showMenu.value = false
  // Modern analytics will be added later
  console.log('Navigation clicked:', title)
}
</script>

<style lang="scss" scoped>
header {
  padding-bottom: 0;
  position: relative;
  z-index: 3;

  .item {
    position: absolute;
    top: 15px;
    right: 30px;
    transform: translate(1px, 0);
    transition: all 1s;
    overflow: hidden;
    padding: 0;
    pointer-events: all;
    z-index: 1501;

    @media (max-width: 768px) {
      display: none;
    }

    i {
      font-weight: 900;

      &.on {
        color: #42b883; // Vue green for hover state
      }
    }

    em {
      font-family: serif;

      &.active {
        color: #42b883;
      }
    }
  }

  .menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 50px 30px 40px;
    background: #f8f9fa; // Light background
    pointer-events: all;
    text-align: center;
    z-index: 1500;

    @media (max-width: 768px) {
      position: relative;
      margin: 0 20px;
      padding: 0;
      background: transparent;
      width: 90%;
      z-index: inherit;
    }

    &.hide-content {
      display: none;
      
      @media (max-width: 768px) {
        display: inline-block !important;
      }
    }

    &.show-content {
      display: block;
    }

    .nav-link {
      margin: 30px 0 0;
      padding: 0 10px 5px;
      color: #2c3e50;
      cursor: pointer;
      display: inline-block;
      font: normal 1.6em/1.6 serif;
      letter-spacing: 0.5px;
      text-align: left;
      text-decoration: none;

      @media (max-width: 768px) {
        margin: 0 0 10px;
        padding-bottom: 5px;
        text-align: right;
      }

      &:first-child {
        @media (max-width: 768px) {
          margin-left: 0;
          padding-left: 0;
        }
      }

      &.router-link-active,
      &.current {
        .icon {
          animation: blink 2s steps(5, start) infinite;
          color: #42b883;
        }
      }

      &:hover,
      &.router-link-active,
      &.current {
        color: #42b883;

        .icon {
          color: #42b883;
          visibility: visible;
        }
      }

      .icon {
        color: #2c3e50;
        transition: visibility 1s ease-out;
        font-size: 0.75rem;
        margin-right: 0;
        visibility: hidden;
      }
    }
  }
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>