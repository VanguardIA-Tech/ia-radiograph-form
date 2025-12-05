# Copilot Instructions for ia-radiograph-form

## Project Overview
A multi-step diagnostic form (Raio-X) built with React/Vite that collects company information and AI usage metrics. The form progresses through 3 steps with client-side validation, localStorage persistence, and generates reports via WhatsApp/email integration.

## Architecture

### Component Structure
- **RaioXForm.tsx** (252 lines): Main orchestrator managing form state, step navigation, validation, and localStorage persistence
  - Maintains 3 form steps via `currentStep` state
  - Validates each step before progression with Portuguese toast error messages
  - Persists form data to localStorage with key `"vanguardia-form-data"`
- **FormStep1.tsx**: Company metadata (name, role, employees, sector)
- **FormStep2.tsx**: Priority areas, focus areas, AI usage level, efficiency bottleneck
- **FormStep3.tsx**: Email/WhatsApp contact info and consent
- **FormSuccess.tsx**: Confirmation screen after submission
- **FormHeader/FormProgress.tsx**: UI chrome components

### Data Flow Pattern
1. RaioXForm holds centralized `formData` state (untyped object)
2. Each step component receives props: `formData` (read) and `updateFormData` callback (write)
3. Navigation: `validateStep()` checks required fields before `setCurrentStep()`
4. Persistence: `useEffect` syncs formData to localStorage after each update

### Key Implementation Details
- **Language**: Portuguese (UI text, validation messages, placeholder values)
- **No API integration yet**: Form completes with success screen; backend submission not implemented
- **localStorage Strategy**: Automatic persistence on every form update with JSON serialization
- **Validation Approach**: Per-step validation in switch statement; 1-3 priority areas max; text field trimming for empty check

## Development Workflow

```bash
npm run dev         # Start Vite dev server (port 8080)
npm run build       # Production build
npm run build:dev   # Development mode build
npm run lint        # ESLint check
npm run preview     # Preview production build locally
```

## Code Conventions

### Styling
- **Tailwind CSS only** via className—never create `.css` files
- Import shadcn/ui components from `@/components/ui/` (e.g., Button, Input, Select, Label)
- Theme colors and spacing defined in `tailwind.config.ts` and `src/index.css`
- Example: `<Button className="h-12 mt-4">Text</Button>`

### Forms & Validation
- Use `react-hook-form` for production forms (not yet in current steps)
- Validation schemas with `zod`
- Current implementation uses basic state + manual validation; future refactoring should adopt react-hook-form

### Notifications
- `sonner` toast for all user feedback
  - `toast.error("message")` for validation failures
  - Pattern: Check condition → `toast.error()` → `return false` in validateStep()

### UI Components
- Prefer shadcn/ui Select for dropdowns (SelectTrigger, SelectValue, SelectContent, SelectItem)
- Input component for text (with className="h-12" for standard height)
- Label with icon patterns: `<Label className="flex items-center gap-2">` + lucide icon

### Path Aliases
- Import from `@/` prefix (maps to `./src/`)
- Example: `import { Button } from "@/components/ui/button"`

## Common Tasks

**Add a new form field**:
1. Add field to FormStepX component with Select or Input
2. Add updateFormData call on change
3. Add validation check in RaioXForm.validateStep()
4. Field auto-persists via existing useEffect

**Add a new step**:
1. Create FormStepN.tsx with props pattern: `{ formData, updateFormData }`
2. Increment TOTAL_STEPS constant
3. Add validation case in validateStep()
4. Import and render in RaioXForm's step switch/conditional

**Debug form state**:
- Check localStorage: `localStorage.getItem("vanguardia-form-data")`
- Add console.log in updateFormData or step transitions
- Browser DevTools: Application tab → Local Storage

## File Structure
```
src/
  components/
    RaioXForm.tsx         (form orchestrator)
    FormStep[1-3].tsx     (step content)
    FormHeader.tsx        (form title/description)
    FormProgress.tsx      (step indicator)
    FormSuccess.tsx       (success screen)
    ui/                   (shadcn/ui components)
  pages/
    Index.tsx             (renders RaioXForm)
  App.tsx                 (routing, React Query, providers)
```

## Dependencies of Note
- `@tanstack/react-query`: Configured but not yet used (for future API integration)
- `sonner`: Toast notifications
- `lucide-react`: Icons (Building2, User, Users, Briefcase, ArrowRight, ArrowLeft)
- `react-router-dom`: Routing (currently minimal—single Index page)
- `shadcn/ui`: Component library built on Radix UI

## Lovable Platform Notes
- Project generated via [Lovable](https://lovable.dev) (UI generation tool)
- Uses `lovable-tagger` plugin in dev mode for component tracking
- Changes sync between Lovable and Git; both are valid edit points
