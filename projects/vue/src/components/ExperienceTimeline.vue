<template>
  <div class="experience-timeline">
    <div class="timeline-header">
      <h2>{{ content.resume.experiences.title }}</h2>
      <p class="timeline-subtitle">My professional journey in front-end development</p>
    </div>

    <div class="timeline">
      <div 
        v-for="job in content.resume.experiences.job" 
        :key="job.id"
        class="timeline-item"
        :class="{ 'expanded': expandedJob === job.id }"
      >
        <div class="timeline-marker"></div>
        
        <div class="job-card" @click="toggleJob(job.id)">
          <div class="job-header">
            <div class="job-title-section">
              <h3 class="job-title">{{ job.title }}</h3>
              <div class="company-info">
                <h4 class="company-name">{{ job.company }}</h4>
                <span class="job-location">{{ job.location }}</span>
              </div>
            </div>
            
            <div class="job-meta">
              <span class="job-date">{{ job.date }}</span>
              <i 
                class="fas fa-chevron-down expand-icon" 
                :class="{ 'rotated': expandedJob === job.id }"
              ></i>
            </div>
          </div>

          <div class="job-content" v-show="expandedJob === job.id">
            <div class="responsibilities">
              <h5>Key Responsibilities & Achievements:</h5>
              <ul class="responsibility-list">
                <li 
                  v-for="(point, index) in job.points" 
                  :key="index"
                  class="responsibility-item"
                  v-html="point"
                ></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import contentData from '../data/static.en-us.json'

// Reactive data using Composition API (Vue 3 way!)
const content = ref(contentData)
const expandedJob = ref<number | null>(null)

// Methods using Composition API
const toggleJob = (jobId: number) => {
  expandedJob.value = expandedJob.value === jobId ? null : jobId
}
</script>

<style lang="scss" scoped>
.experience-timeline {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;

  .timeline-header {
    text-align: center;
    margin-bottom: 3rem;

    h2 {
      font-size: 2.5rem;
      color: #2c3e50;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    .timeline-subtitle {
      font-size: 1.1rem;
      color: #6c757d;
      margin: 0;
    }
  }

  .timeline {
    position: relative;
    
    // Timeline vertical line
    &::before {
      content: '';
      position: absolute;
      left: 30px;
      top: 0;
      bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, #42b883 0%, #369870 100%);
      border-radius: 2px;
      
      @media (max-width: 768px) {
        left: 20px;
      }
    }
  }

  .timeline-item {
    position: relative;
    margin-bottom: 2rem;
    padding-left: 80px;
    
    @media (max-width: 768px) {
      padding-left: 60px;
    }

    .timeline-marker {
      position: absolute;
      left: 18px;
      top: 24px;
      width: 24px;
      height: 24px;
      background: #42b883;
      border: 4px solid #fff;
      border-radius: 50%;
      box-shadow: 0 2px 10px rgba(66, 184, 131, 0.3);
      z-index: 2;
      
      @media (max-width: 768px) {
        left: 8px;
        width: 20px;
        height: 20px;
      }
    }

    .job-card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: 1px solid #e9ecef;
      cursor: pointer;
      transition: all 0.3s ease;
      overflow: hidden;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        border-color: #42b883;
      }

      .job-header {
        padding: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        border-bottom: 1px solid #f8f9fa;

        @media (max-width: 768px) {
          flex-direction: column;
          gap: 1rem;
        }

        .job-title-section {
          flex: 1;

          .job-title {
            font-size: 1.3rem;
            color: #2c3e50;
            margin: 0 0 0.5rem 0;
            font-weight: 600;
            line-height: 1.3;
          }

          .company-info {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;

            .company-name {
              font-size: 1.1rem;
              color: #42b883;
              margin: 0;
              font-weight: 500;
            }

            .job-location {
              font-size: 0.9rem;
              color: #6c757d;
              font-style: italic;
            }
          }
        }

        .job-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          
          @media (max-width: 768px) {
            width: 100%;
            justify-content: space-between;
          }

          .job-date {
            font-size: 0.9rem;
            color: #6c757d;
            font-weight: 500;
            white-space: nowrap;
          }

          .expand-icon {
            color: #42b883;
            font-size: 1rem;
            transition: transform 0.3s ease;

            &.rotated {
              transform: rotate(180deg);
            }
          }
        }
      }

      .job-content {
        padding: 0 1.5rem 1.5rem;
        animation: slideDown 0.3s ease-out;

        .responsibilities {
          h5 {
            font-size: 1rem;
            color: #2c3e50;
            margin: 0 0 1rem 0;
            font-weight: 600;
          }

          .responsibility-list {
            list-style: none;
            padding: 0;
            margin: 0;

            .responsibility-item {
              position: relative;
              padding: 0.5rem 0 0.5rem 1.5rem;
              color: #495057;
              line-height: 1.6;
              border-bottom: 1px solid #f8f9fa;

              &:last-child {
                border-bottom: none;
              }

              &::before {
                content: '▸';
                position: absolute;
                left: 0;
                top: 0.5rem;
                color: #42b883;
                font-weight: bold;
              }

              &:hover {
                background: rgba(66, 184, 131, 0.02);
                border-radius: 4px;
              }
            }
          }
        }
      }
    }

    &.expanded .job-card {
      border-color: #42b883;
      box-shadow: 0 8px 30px rgba(66, 184, 131, 0.15);
    }
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Enhanced responsive design
@media (max-width: 768px) {
  .experience-timeline {
    padding: 1rem;

    .timeline-header {
      margin-bottom: 2rem;

      h2 {
        font-size: 2rem;
      }

      .timeline-subtitle {
        font-size: 1rem;
      }
    }

    .timeline-item .job-card .job-header {
      padding: 1rem;

      .job-title-section .job-title {
        font-size: 1.1rem;
      }
    }

    .timeline-item .job-card .job-content {
      padding: 0 1rem 1rem;
    }
  }
}
</style>