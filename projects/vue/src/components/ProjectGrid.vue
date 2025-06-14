<template>
  <div class="project-grid" :class="`view-${viewMode}`">
    <div 
      v-for="project in projects" 
      :key="project.id"
      class="project-card"
      @click="$emit('project-click', project)"
    >
      <div class="project-image">
        <div class="placeholder-image">
          <i class="fas fa-image"></i>
          <span>{{ project.name }}</span>
        </div>
        <div class="project-year">{{ project.year }}</div>
        <div class="project-timeline">{{ project.timeline }}</div>
      </div>
      
      <div class="project-content">
        <div class="project-header">
          <h3 class="project-title">{{ project.name }}</h3>
          <p class="project-client">{{ project.client }}</p>
        </div>
        
        <div class="project-tags">
          <span 
            v-for="tag in project.tags.slice(0, viewMode === 'grid' ? 4 : 8)" 
            :key="tag"
            class="tag"
          >
            {{ tag }}
          </span>
          <span 
            v-if="project.tags.length > (viewMode === 'grid' ? 4 : 8)"
            class="tag more-tags"
          >
            +{{ project.tags.length - (viewMode === 'grid' ? 4 : 8) }} more
          </span>
        </div>
        
        <div class="project-footer">
          <div class="project-meta">
            <span class="meta-item">
              <i class="fas fa-calendar"></i>
              {{ project.year }}
            </span>
            <span class="meta-item">
              <i class="fas fa-clock"></i>
              {{ project.timeline }}
            </span>
            <span v-if="project.link" class="meta-item">
              <i class="fas fa-external-link-alt"></i>
              Live Site
            </span>
          </div>
          
          <button class="view-details">
            View Details
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-if="projects.length === 0" class="empty-state">
      <i class="fas fa-search"></i>
      <h3>No projects found</h3>
      <p>Try adjusting your search criteria or filters.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Project {
  id: number
  name: string
  client: string
  year: string
  timeline: string
  tags: string[]
  link?: string
  image: string
}

interface Props {
  projects: Project[]
  viewMode: 'grid' | 'list'
}

defineProps<Props>()
defineEmits<{
  'project-click': [project: Project]
}>()
</script>

<style lang="scss" scoped>
.project-grid {
  display: grid;
  gap: 2rem;

  &.view-grid {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &.view-list {
    grid-template-columns: 1fr;
    gap: 1rem;

    .project-card {
      display: flex;
      flex-direction: row;
      height: auto;

      @media (max-width: 768px) {
        flex-direction: column;
      }

      .project-image {
        width: 200px;
        height: 150px;
        flex-shrink: 0;

        @media (max-width: 768px) {
          width: 100%;
          height: 200px;
        }
      }

      .project-content {
        flex: 1;
        padding: 1.5rem;
      }
    }
  }

  .project-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid #e9ecef;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
      border-color: #42b883;

      .view-details {
        background: #369870;
        transform: translateX(4px);
      }
    }

    .project-image {
      position: relative;
      height: 200px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      
      .placeholder-image {
        text-align: center;
        color: #6c757d;
        
        i {
          font-size: 3rem;
          margin-bottom: 0.5rem;
          display: block;
        }
        
        span {
          font-size: 0.9rem;
          font-weight: 500;
        }
      }

      .project-year {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background: #42b883;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-weight: 600;
        font-size: 0.9rem;
      }

      .project-timeline {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(255, 255, 255, 0.9);
        color: #2c3e50;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-weight: 500;
        font-size: 0.8rem;
        backdrop-filter: blur(10px);
      }
    }

    .project-content {
      padding: 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;

      .project-header {
        margin-bottom: 1rem;

        .project-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #2c3e50;
          margin: 0 0 0.5rem 0;
          line-height: 1.3;
        }

        .project-client {
          color: #42b883;
          font-weight: 500;
          margin: 0;
          font-size: 1rem;
        }
      }

      .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;

        .tag {
          background: #f8f9fa;
          color: #495057;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid #e9ecef;

          &.more-tags {
            background: #42b883;
            color: white;
            border-color: #42b883;
          }
        }
      }

      .project-footer {
        margin-top: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;

        @media (max-width: 480px) {
          flex-direction: column;
          align-items: stretch;
        }

        .project-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;

          @media (max-width: 480px) {
            justify-content: center;
          }

          .meta-item {
            color: #6c757d;
            font-size: 0.8rem;
            display: flex;
            align-items: center;
            gap: 0.25rem;

            i {
              color: #42b883;
            }
          }
        }

        .view-details {
          background: #42b883;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          white-space: nowrap;

          &:hover {
            background: #369870;
          }
        }
      }
    }
  }

  .empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 4rem 2rem;
    color: #6c757d;

    i {
      font-size: 4rem;
      margin-bottom: 1rem;
      color: #dee2e6;
    }

    h3 {
      color: #495057;
      margin-bottom: 0.5rem;
    }

    p {
      margin: 0;
      font-size: 1rem;
    }
  }
}
</style>