<template>
  <div class="modern-portfolio">
    <!-- Portfolio Header -->
    <div class="portfolio-header">
      <h1>{{ content.portfolio.title }}</h1>
      <p class="portfolio-description" v-html="content.portfolio.copy"></p>
      
      <!-- Portfolio Stats -->
      <div class="portfolio-stats">
        <div class="stat-item">
          <span class="stat-number">{{ totalProjects }}</span>
          <span class="stat-label">Projects</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ totalClients }}</span>
          <span class="stat-label">Clients</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ yearRange }}</span>
          <span class="stat-label">Years</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ totalTechnologies }}</span>
          <span class="stat-label">Technologies</span>
        </div>
      </div>
    </div>

    <!-- Search and Filter Controls -->
    <div class="controls-section">
      <div class="search-controls">
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search projects, clients, or technologies..."
            class="search-input"
          >
          <button 
            v-if="searchQuery" 
            @click="clearSearch"
            class="clear-search"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="view-controls">
          <button 
            @click="viewMode = 'grid'"
            :class="{ active: viewMode === 'grid' }"
            class="view-btn"
          >
            <i class="fas fa-th"></i> Grid
          </button>
          <button 
            @click="viewMode = 'list'"
            :class="{ active: viewMode === 'list' }"
            class="view-btn"
          >
            <i class="fas fa-list"></i> List
          </button>
        </div>
      </div>

      <!-- Technology Filter Tags -->
      <div class="filter-section">
        <h3>Filter by Technology:</h3>
        <div class="tag-filters">
          <button 
            @click="selectedTag = null"
            :class="{ active: selectedTag === null }"
            class="filter-tag all-tag"
          >
            All Projects ({{ totalProjects }})
          </button>
          <button 
            v-for="tag in popularTags"
            :key="tag.name"
            @click="selectedTag = tag.name"
            :class="{ active: selectedTag === tag.name }"
            class="filter-tag"
          >
            {{ tag.name }} ({{ tag.count }})
          </button>
        </div>
        
        <button 
          v-if="!showAllTags && allTags.length > 12"
          @click="showAllTags = true"
          class="show-more-tags"
        >
          Show {{ allTags.length - 12 }} more technologies...
        </button>
        
        <div v-if="showAllTags" class="all-tags">
          <button 
            v-for="tag in allTags.slice(12)"
            :key="tag.name"
            @click="selectedTag = tag.name"
            :class="{ active: selectedTag === tag.name }"
            class="filter-tag"
          >
            {{ tag.name }} ({{ tag.count }})
          </button>
        </div>
      </div>
    </div>

    <!-- Results Summary -->
    <div class="results-summary" v-if="filteredProjects.length !== totalProjects">
      <p>
        Showing {{ filteredProjects.length }} of {{ totalProjects }} projects
        <span v-if="selectedTag"> tagged with "{{ selectedTag }}"</span>
        <span v-if="searchQuery"> matching "{{ searchQuery }}"</span>
      </p>
      <button @click="clearFilters" class="clear-filters">
        <i class="fas fa-times"></i> Clear Filters
      </button>
    </div>

    <!-- Project Grid/List -->
    <div class="projects-container">
      <ProjectGrid 
        :projects="filteredProjects"
        :view-mode="viewMode"
        @project-click="openProjectModal"
      />
    </div>

    <!-- Project Detail Modal -->
    <ProjectModal 
      v-if="selectedProject"
      :project="selectedProject"
      @close="closeProjectModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ProjectGrid from '../components/ProjectGrid.vue'
import ProjectModal from '../components/ProjectModal.vue'
import contentData from '../data/static.en-us.json'

// Reactive data
const content = ref(contentData)
const searchQuery = ref('')
const selectedTag = ref<string | null>(null)
const viewMode = ref<'grid' | 'list'>('grid')
const showAllTags = ref(false)
const selectedProject = ref<any>(null)

// Computed properties
const totalProjects = computed(() => content.value.portfolio.projects.length)

const totalClients = computed(() => {
  const clients = new Set(content.value.portfolio.projects.map(p => p.client))
  return clients.size
})

const yearRange = computed(() => {
  const years = content.value.portfolio.projects.map(p => parseInt(p.year))
  const minYear = Math.min(...years)
  const maxYear = Math.max(...years)
  return `${maxYear - minYear + 1}`
})

const allTags = computed(() => {
  const tagMap = new Map<string, number>()
  
  content.value.portfolio.projects.forEach(project => {
    project.tags.forEach(tag => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
    })
  })
  
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})

const popularTags = computed(() => allTags.value.slice(0, 12))

const totalTechnologies = computed(() => allTags.value.length)

const filteredProjects = computed(() => {
  let projects = content.value.portfolio.projects

  // Filter by selected tag
  if (selectedTag.value) {
    projects = projects.filter(project => 
      project.tags.includes(selectedTag.value)
    )
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    projects = projects.filter(project =>
      project.name.toLowerCase().includes(query) ||
      project.client.toLowerCase().includes(query) ||
      project.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Sort by year (newest first)
  return projects.sort((a, b) => parseInt(b.year) - parseInt(a.year))
})

// Methods
const clearSearch = () => {
  searchQuery.value = ''
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedTag.value = null
}

const openProjectModal = (project: any) => {
  selectedProject.value = project
}

const closeProjectModal = () => {
  selectedProject.value = null
}
</script>

<style lang="scss" scoped>
.modern-portfolio {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
}

.portfolio-header {
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 3rem;
    color: #2c3e50;
    margin-bottom: 1rem;
    font-weight: 700;

    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  }

  .portfolio-description {
    font-size: 1.1rem;
    color: #6c757d;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto 2rem;

    :deep(a) {
      color: #42b883;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .portfolio-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    max-width: 600px;
    margin: 0 auto;

    .stat-item {
      background: white;
      padding: 1rem;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      border: 1px solid #e9ecef;

      .stat-number {
        display: block;
        font-size: 2rem;
        font-weight: 700;
        color: #42b883;
        margin-bottom: 0.25rem;
      }

      .stat-label {
        font-size: 0.9rem;
        color: #6c757d;
        font-weight: 500;
      }
    }
  }
}

.controls-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  .search-controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .search-box {
      position: relative;
      flex: 1;

      i.fa-search {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: #6c757d;
      }

      .search-input {
        width: 100%;
        padding: 0.75rem 1rem 0.75rem 2.5rem;
        border: 2px solid #e9ecef;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s ease;

        &:focus {
          outline: none;
          border-color: #42b883;
        }
      }

      .clear-search {
        position: absolute;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #6c757d;
        cursor: pointer;
        padding: 0.5rem;

        &:hover {
          color: #42b883;
        }
      }
    }

    .view-controls {
      display: flex;
      gap: 0.5rem;

      .view-btn {
        padding: 0.75rem 1rem;
        border: 2px solid #e9ecef;
        background: white;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;

        &:hover {
          border-color: #42b883;
          color: #42b883;
        }

        &.active {
          background: #42b883;
          color: white;
          border-color: #42b883;
        }
      }
    }
  }

  .filter-section {
    h3 {
      color: #2c3e50;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }

    .tag-filters {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;

      .filter-tag {
        padding: 0.5rem 1rem;
        border: 1px solid #dee2e6;
        background: white;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;

        &:hover {
          border-color: #42b883;
          color: #42b883;
        }

        &.active {
          background: #42b883;
          color: white;
          border-color: #42b883;
        }

        &.all-tag {
          font-weight: 600;
          border-color: #42b883;
          color: #42b883;

          &.active {
            background: #42b883;
            color: white;
          }
        }
      }
    }

    .show-more-tags {
      background: none;
      border: none;
      color: #42b883;
      cursor: pointer;
      font-size: 0.9rem;
      text-decoration: underline;

      &:hover {
        color: #369870;
      }
    }

    .all-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1rem;
    }
  }
}

.results-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }

  p {
    margin: 0;
    color: #6c757d;
    font-size: 0.9rem;
  }

  .clear-filters {
    background: #dc3545;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.3s ease;

    &:hover {
      background: #c82333;
    }
  }
}

.projects-container {
  min-height: 400px;
}
</style>