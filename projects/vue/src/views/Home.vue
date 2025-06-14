<template>
  <div class="home">
    <div class="hero-section">
      <h1 class="hero-title">{{ content.common.global.title }}</h1>
      <p class="hero-subtitle">{{ content.common.global.copy }} <em>{{ content.common.global.copy2 }}</em></p>
      <h2 class="tagline">{{ content.common.global.tagline }}</h2>
      
      <div class="quick-links">
        <router-link to="/about" class="cta-button">Learn About Me</router-link>
        <router-link to="/portfolio" class="cta-button secondary">View Portfolio</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import contentData from '../data/static.en-us.json'

const content = ref(contentData)
</script>

<style lang="scss" scoped>
.home {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  
  .hero-section {
    text-align: center;
    max-width: 800px;
    
    .hero-title {
      font-size: 3.5rem;
      font-weight: bold;
      color: #2c3e50;
      margin-bottom: 1rem;
      
      @media (max-width: 768px) {
        font-size: 2.5rem;
      }
    }
    
    .hero-subtitle {
      font-size: 1.2rem;
      color: #6c757d;
      margin-bottom: 2rem;
      line-height: 1.6;
      
      em {
        color: #42b883;
        font-style: italic;
      }
    }
    
    .tagline {
      font-size: 2rem;
      color: #42b883;
      margin-bottom: 3rem;
      font-weight: 300;
      
      @media (max-width: 768px) {
        font-size: 1.5rem;
      }
    }
    
    .quick-links {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      
      .cta-button {
        padding: 1rem 2rem;
        background: #42b883;
        color: white;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 500;
        transition: all 0.3s ease;
        
        &:hover {
          background: #369870;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(66, 184, 131, 0.3);
        }
        
        &.secondary {
          background: transparent;
          color: #42b883;
          border: 2px solid #42b883;
          
          &:hover {
            background: #42b883;
            color: white;
          }
        }
      }
    }
  }
}
</style>