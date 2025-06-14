<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <div class="project-year-badge">{{ project.year }}</div>
        <button @click="closeModal" class="close-button">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="modal-body">
        <div class="project-image-section">
          <div class="project-image-large">
            <div class="placeholder-image">
              <i class="fas fa-image"></i>
              <span>{{ project.name }}</span>
            </div>
            <div class="project-timeline-badge">{{ project.timeline }}</div>
          </div>
        </div>

        <div class="project-details">
          <div class="project-header">
            <h2 class="project-title">{{ project.name }}</h2>
            <p class="project-client">{{ project.client }}</p>
          </div>

          <div class="project-meta-grid">
            <div class="meta-item">
              <i class="fas fa-calendar"></i>
              <span class="meta-label">Year</span>
              <span class="meta-value">{{ project.year }}</span>
            </div>
            
            <div class="meta-item">
              <i class="fas fa-clock"></i>
              <span class="meta-label">Duration</span>
              <span class="meta-value">{{ project.timeline }}</span>
            </div>
            
            <div class="meta-item">
              <i class="fas fa-building"></i>
              <span class="meta-label">Client</span>
              <span class="meta-value">{{ project.client }}</span>
            </div>
            
            <div v-if="project.link" class="meta-item">
              <i class="fas fa-external-link-alt"></i>
              <span class="meta-label">Live Site</span>
              <a 
                :href="project.link" 
                target="_blank"
                class="meta-value live-link"
                @click="handleLiveClick"
              >
                Visit Project
                <i class="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>

          <div class="technologies-section">
            <h3>Technologies & Skills</h3>
            <div class="technology-tags">
              <span 
                v-for="tag in project.tags" 
                :key="tag"
                class="tech-tag"
                :class="getTechCategory(tag)"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <div class="project-actions">
            <button v-if="project.link" @click="openLiveProject" class="action-btn primary">
              <i class="fas fa-external-link-alt"></i>
              View Live Project
            </button>
            
            <button @click="closeModal" class="action-btn secondary">
              <i class="fas fa-arrow-left"></i>
              Back to Portfolio
            </button>
          </div>
        </div>
      </div>
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
  project: Project
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

// Methods
const closeModal = () => {
  emit('close')
}

const openLiveProject = () => {
  if (props.project.link) {
    window.open(props.project.link, '_blank')
    handleLiveClick()
  }
}

const handleLiveClick = () => {
  console.log('Live project clicked:', props.project.name)
  // Analytics will be added later
}

const getTechCategory = (tech: string): string => {
  const frameworks = ['Vue', 'React', 'AngularJS', 'jQuery', 'Backbone']
  const styling = ['CSS', 'CSS3', 'SASS', 'LESS', 'Bootstrap', 'Responsive']
  const backend = ['PHP', 'Java', 'Node', 'MySQL', 'APIs', 'API']
  const tools = ['Grunt', 'Gulp', 'Webpack', 'Git', 'GitHub', 'Bitbucket', 'Docker']
  const cms = ['WordPress', 'Drupal', 'Craft CMS', 'Adobe CQ', 'Hybris']

  if (frameworks.some(f => tech.includes(f))) return 'framework'
  if (styling.some(s => tech.includes(s))) return 'styling'
  if (backend.some(b => tech.includes(b))) return 'backend'
  if (tools.some(t => tech.includes(t))) return 'tools'
  if (cms.some(c => tech.includes(c))) return 'cms'
  
  return 'other'
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
  backdrop-filter: blur(4px);

  @media (max-width: 768px) {
    padding: 1rem;
    align-items: flex-start;
    overflow-y: auto;
  }
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;

  @media (max-width: 768px) {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e9ecef;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }

  .project-year-badge {
    background: #42b883;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    font-size: 1rem;
  }

  .close-button {
    background: #f8f9fa;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover {
      background: #e9ecef;
      transform: scale(1.1);
    }

    i {
      color: #6c757d;
      font-size: 1.2rem;
    }
  }
}

.modal-body {
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
}

.project-image-section {
  margin-bottom: 2rem;

  .project-image-large {
    position: relative;
    height: 300px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    @media (max-width: 768px) {
      height: 200px;
    }

    .placeholder-image {
      text-align: center;
      color: #6c757d;

      i {
        font-size: 4rem;
        margin-bottom: 1rem;
        display: block;

        @media (max-width: 768px) {
          font-size: 3rem;
        }
      }

      span {
        font-size: 1.2rem;
        font-weight: 500;

        @media (max-width: 768px) {
          font-size: 1rem;
        }
      }
    }

    .project-timeline-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: rgba(255, 255, 255, 0.9);
      color: #2c3e50;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-weight: 500;
      backdrop-filter: blur(10px);
    }
  }
}

.project-details {
  .project-header {
    margin-bottom: 2rem;

    .project-title {
      font-size: 2rem;
      font-weight: 700;
      color: #2c3e50;
      margin: 0 0 0.5rem 0;
      line-height: 1.3;

      @media (max-width: 768px) {
        font-size: 1.6rem;
      }
    }

    .project-client {
      color: #42b883;
      font-weight: 600;
      margin: 0;
      font-size: 1.2rem;
    }
  }

  .project-meta-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;

    .meta-item {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      i {
        color: #42b883;
        font-size: 1.2rem;
      }

      .meta-label {
        font-size: 0.8rem;
        color: #6c757d;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .meta-value {
        font-weight: 600;
        color: #2c3e50;

        &.live-link {
          color: #42b883;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.3s ease;

          &:hover {
            color: #369870;
          }
        }
      }
    }
  }

  .technologies-section {
    margin-bottom: 2rem;

    h3 {
      color: #2c3e50;
      margin-bottom: 1rem;
      font-size: 1.3rem;
    }

    .technology-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;

      .tech-tag {
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 500;
        border: 2px solid;
        transition: all 0.3s ease;

        &.framework {
          background: rgba(66, 184, 131, 0.1);
          color: #42b883;
          border-color: #42b883;
        }

        &.styling {
          background: rgba(255, 193, 7, 0.1);
          color: #ffc107;
          border-color: #ffc107;
        }

        &.backend {
          background: rgba(220, 53, 69, 0.1);
          color: #dc3545;
          border-color: #dc3545;
        }

        &.tools {
          background: rgba(108, 117, 125, 0.1);
          color: #6c757d;
          border-color: #6c757d;
        }

        &.cms {
          background: rgba(13, 110, 253, 0.1);
          color: #0d6efd;
          border-color: #0d6efd;
        }

        &.other {
          background: rgba(111, 66, 193, 0.1);
          color: #6f42c1;
          border-color: #6f42c1;
        }

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
      }
    }
  }

  .project-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;

    @media (max-width: 480px) {
      flex-direction: column;
    }

    .action-btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;

      &.primary {
        background: #42b883;
        color: white;

        &:hover {
          background: #369870;
          transform: translateY(-2px);
        }
      }

      &.secondary {
        background: #f8f9fa;
        color: #495057;
        border: 2px solid #dee2e6;

        &:hover {
          background: #e9ecef;
          border-color: #adb5bd;
        }
      }
    }
  }
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>