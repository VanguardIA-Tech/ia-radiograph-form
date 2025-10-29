# AI Development Rules

This document outlines the technology stack and coding conventions for this project to ensure consistency and maintainability.

## Tech Stack

This project is built with a modern, component-based architecture. Key technologies include:

-   **Framework**: React with Vite for a fast development experience.
-   **Language**: TypeScript for type safety and improved developer experience.
-   **Styling**: Tailwind CSS for a utility-first styling approach. All styling should be done via Tailwind classes.
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/) is used for the core component library. These are unstyled, accessible components built on top of Radix UI.
-   **Routing**: `react-router-dom` is used for all client-side routing.
-   **Forms**: `react-hook-form` for performance-optimized form state management, paired with `zod` for schema validation.
-   **Icons**: `lucide-react` provides a comprehensive and consistent set of icons.
-   **Notifications**: `sonner` is used for displaying toast notifications to the user.
-   **Data Fetching**: `@tanstack/react-query` is used for managing server state, including caching, refetching, and optimistic updates.

## Library Usage Rules

To maintain consistency, please adhere to the following rules when adding or modifying features:

-   **Styling**:
    -   **ALWAYS** use Tailwind CSS classes for styling.
    -   **DO NOT** create separate `.css` files for components. All styles should be co-located within the component files.
    -   Leverage the theme defined in `tailwind.config.ts` and `src/index.css` for colors, spacing, and fonts.

-   **Components**:
    -   **ALWAYS** prefer using a component from the `src/components/ui/` directory (shadcn/ui) if one fits the need.
    -   When creating new components, place them in `src/components/`.
    -   Keep components small and focused on a single responsibility.

-   **Routing**:
    -   All application routes **MUST** be defined in `src/App.tsx`.
    -   Create new page components in the `src/pages/` directory.

-   **Forms**:
    -   **ALWAYS** use `react-hook-form` to manage form state and validation.
    -   Define validation schemas using `zod`.

-   **State Management**:
    -   For server state (data fetched from an API), **ALWAYS** use `@tanstack/react-query`.
    -   For simple, local component state, use React's `useState` hook.
    -   For state that needs to be shared across multiple components, use React's `useContext` hook.

-   **Notifications**:
    -   Use the `toast` function from `sonner` to provide feedback to the user for actions like form submissions, errors, or other important events.

-   **File Structure**:
    -   **Pages**: `src/pages/`
    -   **Reusable Components**: `src/components/`
    -   **shadcn/ui Components**: `src/components/ui/`
    -   **Custom Hooks**: `src/hooks/`
    -   **Utility Functions**: `src/lib/`