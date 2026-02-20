# Contributing to SmartHarvest Landing Page

## Prerequisites

### Required Software
- **Node.js:** Version 24.x (required)
  - Use nvm: `nvm use 24` or `nvm install 24`
  - Verify: `node --version` should show v24.x.x
- **npm:** Version 10+ (comes with Node.js 24)
- **Git:** Latest stable version

### IDE Recommendations
- **VS Code** (recommended) with extensions:
  - Vue Language Features (Volar)
  - TypeScript Vue Plugin (Volar)
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier

## Getting Started

### 1. Clone & Setup
```bash
# Clone the repository
git clone <repository-url>
cd retro-fit-landing

# Use Node.js 24
nvm use 24

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Development Server
```bash
npm run dev
```
Access the app at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```
Output will be in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

## Project Structure

```
retro-fit-landing/
├── src/
│   ├── components/          # Vue components
│   │   ├── NavigationHeader.vue
│   │   ├── HeroSection.vue
│   │   ├── PostcardBridge.vue
│   │   ├── ComparisonSection.vue
│   │   ├── BentoGrid.vue
│   │   ├── ProcessSection.vue
│   │   ├── ValueProposition.vue
│   │   ├── ClaimCheckModal.vue
│   │   └── FooterSection.vue
│   ├── types/              # TypeScript interfaces
│   │   └── index.ts
│   ├── App.vue            # Root component
│   ├── main.ts            # Application entry
│   ├── style.css          # Global styles
│   └── vite-env.d.ts      # Type declarations
├── planning/              # Project documentation
│   ├── Content Strategy.md
│   ├── Implementation Blueprint.md
│   └── Claude Kickstart Prompt.md
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js     # Tailwind v4 config
├── vite.config.ts
└── README.md
```

## Development Guidelines

### TypeScript Standards

#### ✅ DO: Type Everything
```typescript
// Component Props
interface Props {
  title: string
  count?: number
  onUpdate?: (value: string) => void
}
const props = defineProps<Props>()

// Component Emits
const emit = defineEmits<{
  (e: 'submit', data: FormData): void
  (e: 'cancel'): void
}>()

// Reactive State
const isLoading = ref<boolean>(false)
const userData = ref<User | null>(null)
```

#### ❌ DON'T: Use any or skip types
```typescript
// Bad
const data = ref<any>(null)
const props = defineProps(['title', 'count'])
```

### Vue 3 Composition API

#### ✅ DO: Use `<script setup>`
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  initialCount: number
}
const props = defineProps<Props>()

const count = ref(props.initialCount)
const doubled = computed(() => count.value * 2)
</script>
```

#### ❌ DON'T: Use Options API
```vue
<!-- Bad - Don't use Options API -->
<script lang="ts">
export default {
  data() {
    return { count: 0 }
  }
}
</script>
```

### Tailwind CSS v4

#### ✅ DO: Use v4 Import Syntax
```css
/* style.css */
@import "tailwindcss";
@import 'tailwindcss-primeui';

@layer components {
  .btn-primary {
    @apply bg-industrial-amber text-white px-8 py-4;
  }
}
```

#### ❌ DON'T: Use Old v3 Directives
```css
/* Bad - Don't use v3 syntax */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Component Best Practices

#### ✅ DO: Single File Components with Clear Structure
```vue
<script setup lang="ts">
// 1. Imports
import { ref } from 'vue'
import type { User } from '@/types'

// 2. Props & Emits
interface Props {
  user: User
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update', user: User): void
}>()

// 3. Reactive State
const isEditing = ref(false)

// 4. Computed Properties
const displayName = computed(() => `${props.user.firstName} ${props.user.lastName}`)

// 5. Methods
const handleSave = () => {
  emit('update', props.user)
}
</script>

<template>
  <!-- Clean, semantic HTML -->
  <div class="user-card">
    <h3>{{ displayName }}</h3>
    <button @click="handleSave" class="btn-primary">
      Save
    </button>
  </div>
</template>
```

### Styling Guidelines

#### Brand Colors
```javascript
// Use these custom colors from tailwind.config.js
'forest-green'      // #2D5A27 - Primary
'industrial-amber'  // #F59E0B - Accent/CTA
'tech-slate'        // #1E293B - Text/Modern
```

#### Button Classes
```vue
<!-- Primary CTA -->
<button class="btn-primary">
  Claim Your €2,000 Check
</button>

<!-- Secondary Action -->
<button class="btn-secondary">
  Learn More
</button>
```

#### Responsive Design
```vue
<!-- Mobile-first approach -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <!-- Content -->
</div>
```

### Animation with AOS

```vue
<template>
  <section>
    <div 
      data-aos="fade-up"
      data-aos-delay="100"
    >
      Content appears on scroll
    </div>
  </section>
</template>
```

## Code Quality Checklist

Before committing, ensure:

- [ ] **TypeScript:** No compilation errors (`npm run build`)
- [ ] **Types:** All props, emits, and functions are typed
- [ ] **Responsive:** Tested at mobile (375px), tablet (768px), desktop (1280px+)
- [ ] **Accessibility:** Semantic HTML, proper ARIA labels, keyboard navigation
- [ ] **Performance:** Images optimized, lazy loading where appropriate
- [ ] **Animations:** Smooth on all devices, no jank
- [ ] **Browser Testing:** Chrome, Safari, Firefox, Edge
- [ ] **No Console Logs:** Remove debug statements
- [ ] **Comments Added:** For complex logic

## Testing Your Changes

### Visual Testing
```bash
# Start dev server
npm run dev

# Test responsive design
# - Chrome DevTools: Toggle device toolbar (Cmd+Shift+M / Ctrl+Shift+M)
# - Test at: 375px, 768px, 1024px, 1280px, 1920px

# Test interactions
# - Click all buttons and links
# - Submit forms with valid/invalid data
# - Test modal open/close
# - Verify scroll animations trigger
```

### Build Testing
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Verify:
# - No TypeScript errors
# - Bundle size is reasonable
# - All assets load correctly
```

## Common Tasks

### Adding a New Component

1. Create component file:
```bash
touch src/components/NewComponent.vue
```

2. Define with TypeScript:
```vue
<script setup lang="ts">
interface Props {
  title: string
}
const props = defineProps<Props>()
</script>

<template>
  <div class="new-component">
    <h2>{{ props.title }}</h2>
  </div>
</template>
```

3. Import in parent:
```vue
<script setup lang="ts">
import NewComponent from './components/NewComponent.vue'
</script>

<template>
  <NewComponent title="Hello" />
</template>
```

### Adding New Types

Edit `src/types/index.ts`:
```typescript
export interface NewType {
  id: string
  name: string
  createdAt: Date
}
```

### Updating Tailwind Config

Edit `tailwind.config.js`:
```javascript
export default {
  theme: {
    extend: {
      colors: {
        'new-color': '#123456',
      },
    },
  },
}
```

### Adding Custom CSS Utilities

Edit `src/style.css`:
```css
@layer components {
  .custom-utility {
    @apply px-4 py-2 rounded-lg bg-forest-green text-white;
  }
}
```

## Troubleshooting

### Build Fails with Vite/Vue Errors
**Solution:** Ensure you're using Node.js 24
```bash
nvm use 24
node --version  # Should show v24.x.x
npm install
npm run build
```

### Tailwind Classes Not Applying
**Solution:** Check style.css uses v4 syntax
```css
@import "tailwindcss";  /* ✅ Correct */
@tailwind base;         /* ❌ Wrong (v3 syntax) */
```

### TypeScript Errors
**Solution:** Check tsconfig.json and run type check
```bash
npx vue-tsc --noEmit
```

### PrimeVue Components Not Styled
**Solution:** Verify PrimeVue configuration in main.ts
```typescript
import PrimeVue from 'primevue/config'
app.use(PrimeVue, { ripple: true })
```

### AOS Animations Not Working
**Solution:** Ensure AOS is initialized in main.ts
```typescript
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  offset: 100
})
```

## Git Workflow

### Branching Strategy
```bash
# Create feature branch
git checkout -b feature/new-section

# Make changes
# ...

# Commit with conventional commits
git commit -m "feat: add testimonials section"

# Push to remote
git push origin feature/new-section
```

### Commit Message Format
```
feat: add new feature
fix: resolve bug
docs: update documentation
style: formatting changes
refactor: code restructuring
test: add or update tests
chore: maintenance tasks
```

## Performance Best Practices

### Image Optimization
- Use WebP format
- Add lazy loading: `loading="lazy"`
- Provide width/height attributes
- Use responsive images with `srcset` when needed

### Code Splitting
- Lazy load routes if adding navigation
- Dynamic imports for large components
- Tree-shake unused library code

### Bundle Size
- Keep total bundle under 500KB (gzipped)
- Monitor with `npm run build`
- Use Vite's bundle analyzer if needed

## Accessibility Standards

- **Semantic HTML:** Use `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- **ARIA Labels:** Add where semantic HTML isn't enough
- **Keyboard Navigation:** All interactive elements accessible via Tab
- **Focus States:** Visible focus indicators on all interactive elements
- **Alt Text:** All images have descriptive alt attributes
- **Color Contrast:** Meet WCAG AA standards (4.5:1 for normal text)

## Questions or Issues?

- Check `.cursorrules` for AI development guidelines
- Review `planning/` directory for project documentation
- Consult `README.md` for project overview

---

**Happy Coding!** 🚜 ⚙️ 🌾

Remember: This landing page is designed to convert. Every line of code should serve the goal of getting farmers to claim their free equipment check.
