# Component Pattern Guideline

This document defines the strict component pattern to be used throughout this project. All new components **must** adhere to this structure to ensure consistency, maintainability, and separation of concerns.

## Pattern: Presenter First

This pattern separates the view (UI rendering) from the logic and state management (presenter).

## Directory & File Structure

Components can be divided into atomic design `[category]`.

For any given component named `[ComponentName]`, the required directory structure is as follows:

`/src/components/[category]/[ComponentName]/`

-   `[ComponentName].tsx` (View Component)
-   `[ComponentName].css` (Component Styles)
-   `[ComponentName].presenter.ts` (Presenter Hook)
-   `[ComponentName].types.ts` (Type Definitions)
-   `index.ts` (Module Export)

---

## File Responsibilities

#### `[ComponentName].tsx` (View Component)

-   **Responsibility:** Renders the UI. It is a "dumb" component that receives all data and event handlers as props from its presenter hook. It **must not** contain business logic, state management, or side effects. Its sole purpose is to render the view and compose smaller sub-components.

#### `[ComponentName].css` (Component Styles)

-   **Responsibility:** Contains CSS rules for the main component container. Styles for any child components **must** be co-located with their respective component files.

#### `[ComponentName].presenter.ts` (Presenter Hook)

-   **Responsibility:** Encapsulates all business logic, state (`useState`, `useEffect`), and derived data for the component. It **must** export a custom React hook (e.g., `use[ComponentName]Presenter`) that provides all necessary state, computed values, and event handlers to the View Component.

#### `[ComponentName].types.ts` (Type Definitions)

-   **Responsibility:** Defines all TypeScript interfaces and types specific to the `[ComponentName]` component (e.g., `[ComponentName]Props`). This centralizes type definitions for clarity and type safety.

#### `index.ts` (Module Export)

-   **Responsibility:** Re-exports the main `[ComponentName]` component to provide a clean and consistent import path (e.g., `import { [ComponentName] } from '...';`).

---

## Application of the Pattern

This document serves as the single source of truth for the component architecture. All development of new components or modification of existing ones must align with this prescribed structure. Any deviation is considered a violation of the project's established conventions.