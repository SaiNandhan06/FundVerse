# FundVerse - Complete Technical Summary

## 1. Project Overview

### What the Project Does
FundVerse is a **crowdfunding platform** built with React and Vite, designed to connect creators (students and companies) with backers to fund innovative startup projects. The platform is localized for the Indian market, featuring Indian currency (₹), locations, and culturally relevant content.

### Key Goals
- Enable students and companies to create and publish startup campaigns
- Allow backers to discover, support, and fund campaigns
- Provide separate dashboards for students and companies
- Facilitate secure payment processing (mock implementation)
- Create a seamless user experience with modern UI/UX

### Architecture Style
- **Frontend Framework**: React 19.1.1 (Functional Components with Hooks)
- **Build Tool**: Vite 7.1.7
- **Routing**: React Router DOM v7.9.5
- **Styling**: Tailwind CSS 3.4.18 (Utility-first CSS framework)
- **State Management**: React Hooks (useState, useEffect) - No external state management library
- **Architecture Pattern**: Component-based, Single Page Application (SPA)

---

## 2. Folder and File Structure

```
FundVerse/
├── public/
│   └── vite.svg                    # Vite logo asset
├── src/
│   ├── assets/
│   │   ├── my-logo.png.png        # FundVerse logo image
│   │   └── react.svg              # React logo
│   ├── components/                # Reusable UI components
│   │   ├── Accordion.jsx          # Collapsible FAQ/accordion component
│   │   ├── Button.jsx             # Reusable button with variants
│   │   ├── DashboardCard.jsx      # Metric card for dashboards
│   │   ├── DiscoverFilters.jsx    # Search and filter component
│   │   ├── Footer.jsx             # Global footer component
│   │   ├── Input.jsx              # Form input with icon/error support
│   │   ├── Layout.jsx             # Layout wrapper (unused in current implementation)
│   │   ├── Navbar.jsx             # Global navigation bar
│   │   ├── ProgressBar.jsx         # Animated progress bar
│   │   ├── ProjectCard.jsx        # Campaign/project card component
│   │   ├── ProjectGrid.jsx         # Grid layout for projects
│   │   └── RoleToggle.jsx         # Student/Company role selector
│   ├── pages/                     # Page components
│   │   ├── AuthPage.jsx           # Login/Signup page
│   │   ├── CampaignDetails.jsx    # Individual campaign detail page
│   │   ├── CompanyDashboard.jsx  # Company/admin dashboard
│   │   ├── CreateCampaign.jsx     # Campaign creation landing page
│   │   ├── CreateCampaignForm.jsx # Full campaign creation form
│   │   ├── Discover.jsx          # Campaign discovery/browse page
│   │   ├── Home.jsx               # Landing/home page
│   │   ├── PaymentPage.jsx        # Payment processing page
│   │   ├── StudentDashboard.jsx   # Student dashboard
│   │   └── SupportAmount.jsx      # Contribution amount selection
│   ├── styles/
│   │   └── theme.css              # CSS variables for theme colors
│   ├── App.css                    # App-specific styles (minimal, mostly unused)
│   ├── App.jsx                    # Main app component with routing
│   ├── index.css                  # Global styles and Tailwind imports
│   └── main.jsx                   # Application entry point
├── eslint.config.js               # ESLint configuration
├── index.html                     # HTML entry point
├── package.json                   # Dependencies and scripts
├── package-lock.json              # Locked dependency versions
├── postcss.config.js              # PostCSS configuration for Tailwind
├── tailwind.config.js             # Tailwind CSS configuration
└── vite.config.js                 # Vite build configuration
```

### Brief Purpose of Each File

**Configuration Files:**
- `vite.config.js`: Vite build tool configuration with React plugin
- `tailwind.config.js`: Tailwind CSS theme customization (colors, gradients)
- `postcss.config.js`: PostCSS plugins (Tailwind, Autoprefixer)
- `eslint.config.js`: ESLint rules for code quality
- `package.json`: Project metadata, dependencies, and npm scripts

**Entry Points:**
- `index.html`: HTML template with root div
- `src/main.jsx`: React app initialization, renders App component
- `src/App.jsx`: Main routing configuration and global layout

**Styling:**
- `src/index.css`: Global styles, Tailwind imports, animations
- `src/styles/theme.css`: CSS custom properties for colors
- `src/App.css`: Legacy styles (mostly unused)

**Components:** See Component Documentation section below.

**Pages:** See Component Documentation section below.

---

## 3. Component Documentation

### 3.1 Layout Components

#### Navbar (`src/components/Navbar.jsx`)
- **Purpose**: Global navigation bar with logo, links, search, and login button
- **Props**: None (uses `useLocation` hook internally)
- **State**: None
- **Functions**: None (presentational component)
- **UI Renders**: 
  - Logo (image from assets)
  - Navigation links (Home, Discover, Create) with active state indicators
  - Search input with icon
  - Login button
- **Connections**: 
  - Links to `/`, `/discover`, `/create`, `/login`
  - Uses `useLocation` to highlight active route

#### Footer (`src/components/Footer.jsx`)
- **Purpose**: Global footer with links, contact info, and social media
- **Props**: None
- **State**: None
- **Functions**: None
- **UI Renders**: 
  - Logo and description
  - Quick Links section
  - Support section
  - Contact information (email, phone, address)
  - Social media icons (Facebook, Twitter, Instagram, LinkedIn)
  - Copyright and legal links
- **Connections**: Links to various routes (Home, Browse, Launch, etc.)

### 3.2 Form Components

#### Button (`src/components/Button.jsx`)
- **Purpose**: Reusable button component with variants and sizes
- **Props**: 
  - `children` (ReactNode): Button content
  - `variant` (string): 'primary' | 'secondary' | 'outline' (default: 'primary')
  - `size` (string): 'sm' | 'md' | 'lg' (default: 'md')
  - `className` (string): Additional CSS classes
  - `onClick` (function): Click handler
  - `type` (string): Button type (default: 'button')
  - `...props`: Other HTML button attributes
- **State**: None
- **Functions**: None (presentational)
- **UI Renders**: Styled button with hover effects
- **Connections**: Used throughout the app for actions

#### Input (`src/components/Input.jsx`)
- **Purpose**: Form input with label, icon, and error support
- **Props**: 
  - `label` (string): Input label
  - `icon` (ReactNode): Optional icon element
  - `error` (string): Error message to display
  - `className` (string): Additional CSS classes
  - `...props`: Standard input attributes
- **State**: None
- **Functions**: None
- **UI Renders**: Label, input field with optional icon, error message
- **Connections**: Used in forms across the app

#### Accordion (`src/components/Accordion.jsx`)
- **Purpose**: Collapsible content component
- **Props**: 
  - `title` (string): Accordion header text
  - `content` (string): Content to display when expanded
- **State**: 
  - `isOpen` (boolean): Controls expanded/collapsed state
- **Functions**: 
  - Toggle function via `setIsOpen`
- **UI Renders**: Clickable header with expand/collapse icon, content panel
- **Connections**: Used in CampaignDetails for FAQs and Risks sections

### 3.3 Display Components

#### ProgressBar (`src/components/ProgressBar.jsx`)
- **Purpose**: Animated progress bar for funding goals
- **Props**: 
  - `value` (number): Progress percentage (0-100)
  - `size` (string): 'sm' | 'md' (default: 'md')
- **State**: None
- **Functions**: None
- **UI Renders**: Background bar with animated filled portion
- **Connections**: Used in ProjectCard, CampaignDetails, StudentDashboard

#### ProjectCard (`src/components/ProjectCard.jsx`)
- **Purpose**: Card component displaying campaign/project information
- **Props**: 
  - `image` (string): Project image URL
  - `category` (string): Project category
  - `title` (string): Project title
  - `description` (string): Project description
  - `creator` (string): Creator name
  - `raised` (string): Amount raised (formatted)
  - `goal` (string): Funding goal (formatted)
  - `fundedPercent` (string): Percentage funded
  - `backers` (string): Number of backers
  - `daysLeft` (string): Days remaining
  - `projectId` (string/number): Project identifier
- **State**: None
- **Functions**: None
- **UI Renders**: 
  - Project image with category badge
  - Title, description, creator info
  - Progress bar
  - Stats (raised, goal, backers, days left)
  - Action buttons (View Details, Support)
- **Connections**: 
  - Links to `/campaign/:id` and `/support`
  - Used by ProjectGrid

#### ProjectGrid (`src/components/ProjectGrid.jsx`)
- **Purpose**: Grid layout displaying multiple project cards
- **Props**: None
- **State**: None (contains hardcoded project data)
- **Functions**: None
- **UI Renders**: Responsive grid (1 col mobile, 2 tablet, 3 desktop) of ProjectCard components
- **Connections**: 
  - Uses ProjectCard component
  - Used by Discover page

#### DashboardCard (`src/components/DashboardCard.jsx`)
- **Purpose**: Metric card for dashboard statistics
- **Props**: 
  - `title` (string): Card title
  - `value` (string/number): Metric value
  - `icon` (ReactNode): Optional icon
  - `subtitle` (string): Optional subtitle
  - `iconBg` (string): Icon background class
- **State**: None
- **Functions**: None
- **UI Renders**: Card with title, value, optional icon and subtitle
- **Connections**: Used in dashboards (currently not actively used)

#### DiscoverFilters (`src/components/DiscoverFilters.jsx`)
- **Purpose**: Search and filter controls for campaign discovery
- **Props**: None
- **State**: 
  - `searchQuery` (string): Search input value
  - `category` (string): Selected category filter
  - `sortBy` (string): Selected sort option
- **Functions**: 
  - State setters for search, category, sort
- **UI Renders**: 
  - Search input with icon
  - Category dropdown
  - Sort dropdown
  - "More Filters" button
  - Results count
- **Connections**: Used by Discover page

### 3.4 Page Components

#### Home (`src/pages/Home.jsx`)
- **Purpose**: Landing page with hero section, stats, and value propositions
- **Props**: None
- **State**: 
  - `isVisible` (boolean): Controls stats animation visibility
- **Functions**: 
  - `useEffect`: Sets up IntersectionObserver for scroll animations
- **UI Renders**: 
  - Hero section with gradient background, CTA buttons
  - Stats grid (Total Funded, Projects, Backers, Cities)
  - "Why Choose FundVerse?" section with 3 feature cards
- **Connections**: 
  - Links to `/discover` and `/create`
  - Uses global Navbar and Footer

#### AuthPage (`src/pages/AuthPage.jsx`)
- **Purpose**: Login and signup page with role selection
- **Props**: None
- **State**: 
  - `activeTab` (string): 'login' | 'signup'
  - `role` (string): 'student' | 'company'
  - `showToast` (boolean): Toast notification visibility
  - `loginForm` (object): { email, password }
  - `signupForm` (object): { name, email, password, confirmPassword }
- **Functions**: 
  - `handleLoginSubmit`: Validates credentials and navigates to dashboard
  - `handleSignupSubmit`: Shows success toast
  - `handleLoginChange`: Updates login form state
  - `handleSignupChange`: Updates signup form state
  - `handleSocialLogin`: Placeholder for social auth
- **UI Renders**: 
  - Split layout: left panel (gradient with role selection), right panel (forms)
  - Login form with dummy credentials display
  - Signup form
  - Social login buttons (Google, LinkedIn)
  - "Back to Home" button
- **Connections**: 
  - Navigates to `/student/dashboard` or `/company/dashboard` on login
  - Uses dummy credentials: student@fundverse.com / student123, company@fundverse.com / company123

#### Discover (`src/pages/Discover.jsx`)
- **Purpose**: Campaign discovery/browse page
- **Props**: None
- **State**: None
- **Functions**: None
- **UI Renders**: 
  - Page header
  - DiscoverFilters component
  - ProjectGrid component
- **Connections**: 
  - Uses DiscoverFilters and ProjectGrid components
  - Uses global Navbar and Footer

#### CreateCampaign (`src/pages/CreateCampaign.jsx`)
- **Purpose**: Landing page for campaign creation
- **Props**: None
- **State**: None
- **Functions**: None
- **UI Renders**: 
  - Centered card with heading and CTA button
- **Connections**: 
  - Links to `/create/form`

#### CreateCampaignForm (`src/pages/CreateCampaignForm.jsx`)
- **Purpose**: Comprehensive campaign creation form
- **Props**: None
- **State**: 
  - `formData` (object): All form fields (title, tagline, category, description, funding details, visuals, contact info)
  - `errors` (object): Validation error messages
  - `showPreview` (boolean): Preview modal visibility
  - `showSuccess` (boolean): Success modal visibility
- **Functions**: 
  - `handleInputChange`: Updates form data and clears errors
  - `handleMilestoneChange`: Updates milestone fields
  - `addMilestone`: Adds new milestone
  - `removeMilestone`: Removes milestone
  - `validateForm`: Validates all required fields
  - `handlePreview`: Shows preview modal
  - `handleSubmit`: Submits form and redirects
  - `formatCurrency`: Formats amounts with ₹ symbol
- **UI Renders**: 
  - Multi-section form (Basic Details, Description, Funding, Visuals, Contact)
  - File upload inputs with previews
  - Dynamic milestone management
  - Preview modal
  - Success modal with auto-redirect
- **Connections**: 
  - Navigates to `/discover` on successful submission

#### CampaignDetails (`src/pages/CampaignDetails.jsx`)
- **Purpose**: Individual campaign detail page with tabs and sidebar
- **Props**: None (uses `useParams` for campaign ID)
- **State**: 
  - `activeTab` (string): Current tab ('story', 'team', 'timeline', 'budget', 'updates', 'faqs')
  - `liked` (boolean): Like button state
- **Functions**: 
  - Tab switching via `setActiveTab`
  - Like toggle via `setLiked`
- **UI Renders**: 
  - Hero section with campaign info, stats, progress bar
  - Action buttons (Support, Like, Share)
  - Tabbed content (Story, Team, Timeline, Budget, Updates, FAQs)
  - Impact & Benefits section
  - Project Gallery
  - Risks & Challenges accordion
  - Sidebar with Support Tiers and Recent Backers
- **Connections**: 
  - Links to `/support` for contributions
  - Uses ProgressBar, Accordion, Button components

#### StudentDashboard (`src/pages/StudentDashboard.jsx`)
- **Purpose**: Student user dashboard with profile, projects, and analytics
- **Props**: None
- **State**: 
  - `activeSection` (string): Current section ('overview', 'projects', 'analytics', etc.)
  - `sidebarOpen` (boolean): Sidebar expanded/collapsed state (persisted in localStorage)
- **Functions**: 
  - `handleMyProjects`: Navigates to projects page
  - `getStatusColor`: Returns color class based on project status
- **UI Renders**: 
  - Collapsible sidebar with navigation menu
  - Profile section with avatar, college, major, stats
  - My Projects grid with progress bars
  - Funding Analytics cards
  - Recent Supporters table
- **Connections**: 
  - Navigates to `/student/projects` (placeholder page)
  - Uses localStorage to persist sidebar state

#### CompanyDashboard (`src/pages/CompanyDashboard.jsx`)
- **Purpose**: Company/admin dashboard with campaign management
- **Props**: None
- **State**: 
  - `activeSection` (string): Current section
  - `searchQuery` (string): Search input value
  - `sidebarOpen` (boolean): Sidebar state (persisted in localStorage)
- **Functions**: 
  - `handleSwitchRole`: Navigates to student dashboard
  - `getStatusBadge`: Returns badge color class based on status
- **UI Renders**: 
  - Collapsible sidebar
  - Top navbar with search
  - Company summary header with gradient
  - Recent Campaigns table
  - Admin Insights cards (Top Category, Most Funded, Pending Reviews, Total Backers)
- **Connections**: 
  - Links to `/discover` and `/student/dashboard`
  - Uses localStorage for sidebar state

#### SupportAmount (`src/pages/SupportAmount.jsx`)
- **Purpose**: Contribution amount selection page
- **Props**: None (uses `useLocation` for state)
- **State**: 
  - `selectedAmount` (number): Selected predefined amount
  - `customAmount` (string): Custom amount input
  - `isAnonymous` (boolean): Anonymous contribution flag
- **Functions**: 
  - `handleAmountSelect`: Sets selected amount
  - `handleCustomAmountChange`: Validates and sets custom amount
  - `handleContinue`: Navigates to payment page with state
- **UI Renders**: 
  - Logo at top-left
  - Campaign info card
  - Predefined amount buttons (₹500, ₹1000, ₹2500, ₹5000, ₹10000)
  - Custom amount input
  - Anonymous checkbox
  - Continue button
  - Summary sidebar card
- **Connections**: 
  - Navigates to `/support/payment` with contribution data
  - Links to `/discover` and `/`

#### PaymentPage (`src/pages/PaymentPage.jsx`)
- **Purpose**: Payment processing page
- **Props**: None (uses `useLocation` for state)
- **State**: 
  - `paymentMethod` (string): 'card' | 'upi'
  - `formData` (object): { fullName, email, cardNumber, expiry, cvc }
- **Functions**: 
  - `handleInputChange`: Updates form data
  - `handleCardNumberChange`: Formats card number with spaces
  - `handleExpiryChange`: Formats expiry as MM/YY
  - `handleCvcChange`: Limits CVC to 3 digits
  - `handleSubmit`: Shows success alert and navigates
  - `handleBack`: Returns to support amount page
- **UI Renders**: 
  - Gradient header with logo
  - Payment form (Card or UPI)
  - Support summary sidebar
  - Platform fee calculation (5%)
- **Connections**: 
  - Navigates to `/company/dashboard` after payment
  - Returns to `/support` on back

### 3.5 Utility Components

#### Layout (`src/components/Layout.jsx`)
- **Purpose**: Layout wrapper (currently unused in App.jsx)
- **Props**: `children` (ReactNode)
- **State**: None
- **Functions**: None
- **UI Renders**: Navbar, main content, Footer (conditionally)
- **Connections**: Not actively used (App.jsx handles layout directly)

#### RoleToggle (`src/components/RoleToggle.jsx`)
- **Purpose**: Student/Company role selector button group
- **Props**: 
  - `role` (string): Current role
  - `onRoleChange` (function): Role change handler
- **State**: None
- **Functions**: None
- **UI Renders**: Two toggle buttons with active state
- **Connections**: Used in AuthPage

---

## 4. React Router Summary

### All Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Home` | Landing page |
| `/login` | `AuthPage` | Login/Signup page |
| `/create` | `CreateCampaign` | Campaign creation landing |
| `/create/form` | `CreateCampaignForm` | Full campaign form |
| `/discover` | `Discover` | Campaign discovery page |
| `/campaign/:id` | `CampaignDetails` | Individual campaign page |
| `/student/dashboard` | `StudentDashboard` | Student dashboard |
| `/student/projects` | Placeholder div | Coming soon page |
| `/company/dashboard` | `CompanyDashboard` | Company dashboard |
| `/support` | `SupportAmount` | Contribution amount selection |
| `/support/payment` | `PaymentPage` | Payment processing |

### Navigation Flow

**Public Flow:**
1. Home (`/`) → Discover (`/discover`) → Campaign Details (`/campaign/:id`) → Support (`/support`) → Payment (`/support/payment`)

**Campaign Creation Flow:**
2. Home (`/`) → Create (`/create`) → Create Form (`/create/form`) → Discover (`/discover`)

**Authentication Flow:**
3. Home (`/`) → Login (`/login`) → Student Dashboard (`/student/dashboard`) OR Company Dashboard (`/company/dashboard`)

**Dashboard Navigation:**
4. Student Dashboard → My Projects (`/student/projects`) [placeholder]
5. Company Dashboard → Discover (`/discover`) OR Switch Role → Student Dashboard

### Route Configuration

- **Router**: `BrowserRouter` (wraps entire app)
- **Conditional Layout**: Navbar and Footer hidden on `/signup` and `/support/payment`
- **State Passing**: Routes pass data via `location.state` (SupportAmount → PaymentPage)

---

## 5. Functions & Utilities

### 5.1 Form Validation Functions

#### `validateForm` (CreateCampaignForm.jsx)
- **Purpose**: Validates all required form fields
- **Parameters**: None (uses component state)
- **Return Value**: `boolean` (true if valid, false otherwise)
- **Where Used**: CreateCampaignForm component
- **Validation Rules**:
  - Campaign title: Required, non-empty
  - Tagline: Required, non-empty
  - Category: Required selection
  - Description: Required, minimum 50 characters
  - Target amount: Required, > 0
  - Minimum contribution: Required, > 0
  - Deadline: Required date
  - Creator name: Required, non-empty
  - Email: Required, valid email format
  - Organization: Required for students
  - City: Required, non-empty
  - State: Required, non-empty
  - Cover image: Required file
  - ID proof: Required file

### 5.2 Formatting Functions

#### `formatCurrency` (CreateCampaignForm.jsx)
- **Purpose**: Formats numeric amounts with ₹ symbol and Indian numbering
- **Parameters**: `amount` (number/string)
- **Return Value**: `string` (e.g., "₹1,25,000")
- **Where Used**: CreateCampaignForm preview modal

#### `toLocaleString('en-IN')` (Multiple files)
- **Purpose**: Formats numbers with Indian numbering system (lakhs, crores)
- **Parameters**: Number value
- **Return Value**: Formatted string
- **Where Used**: Throughout app for currency display

### 5.3 Input Formatting Functions

#### `handleCardNumberChange` (PaymentPage.jsx)
- **Purpose**: Formats card number with spaces (XXXX XXXX XXXX XXXX)
- **Parameters**: Event object
- **Return Value**: None (updates state)
- **Where Used**: PaymentPage card number input

#### `handleExpiryChange` (PaymentPage.jsx)
- **Purpose**: Formats expiry date as MM/YY
- **Parameters**: Event object
- **Return Value**: None (updates state)
- **Where Used**: PaymentPage expiry input

#### `handleCvcChange` (PaymentPage.jsx)
- **Purpose**: Limits CVC input to 3 digits
- **Parameters**: Event object
- **Return Value**: None (updates state)
- **Where Used**: PaymentPage CVC input

### 5.4 Status/Color Helper Functions

#### `getStatusColor` (StudentDashboard.jsx)
- **Purpose**: Returns Tailwind color classes based on project status
- **Parameters**: `status` (string): 'Active' | 'Pending' | 'Completed'
- **Return Value**: `string` (Tailwind classes)
- **Where Used**: StudentDashboard project cards

#### `getStatusBadge` (CompanyDashboard.jsx)
- **Purpose**: Returns badge color classes based on campaign status
- **Parameters**: `status` (string): 'Active' | 'Completed' | 'Pending'
- **Return Value**: `string` (Tailwind classes)
- **Where Used**: CompanyDashboard campaigns table

### 5.5 Navigation Functions

#### `handleLoginSubmit` (AuthPage.jsx)
- **Purpose**: Validates credentials and navigates to appropriate dashboard
- **Parameters**: Event object
- **Return Value**: None (navigates via `useNavigate`)
- **Where Used**: AuthPage login form
- **Logic**: Compares input against DUMMY_CREDENTIALS, navigates based on role

#### `handleContinue` (SupportAmount.jsx)
- **Purpose**: Validates amount and navigates to payment page
- **Parameters**: None
- **Return Value**: None (navigates with state)
- **Where Used**: SupportAmount continue button

#### `handleSubmit` (PaymentPage.jsx, CreateCampaignForm.jsx)
- **Purpose**: Processes form submission
- **Parameters**: Event object
- **Return Value**: None (shows alert/redirects)
- **Where Used**: Payment and campaign creation forms

---

## 6. Design System Summary

### 6.1 Color Palette

**Primary Colors:**
- `fundverseIndigo`: `#4F46E5` - Primary gradient start
- `fundverseBlue`: `#3B82F6` - Primary gradient end, buttons
- `fundverseAccent`: `#2563EB` - Button blue, progress bars
- `fundverseAccentHover`: `#1E40AF` - Button hover state

**Background Colors:**
- `fundverseCardBg`: `#FFFFFF` - Card backgrounds
- `fundverseBg`: `#F9FAFB` - App background
- `fundverseBgLight`: `#F9FAFB` - Light backgrounds (alias)

**Border & Divider:**
- `fundverseBorder`: `#E5E7EB` - Borders, dividers
- `fundverseGrayLight`: `#E5E7EB` - Light gray (alias)

**Text Colors:**
- `fundverseHeading`: `#111827` - Main titles, headings
- `fundverseBody`: `#374151` - Paragraphs, body text
- `fundverseMuted`: `#6B7280` - Helper text, muted content
- `fundverseGrayDark`: `#252422` - Dark gray (legacy)

**Status Colors:**
- `fundverseSuccess`: `#10B981` - Success, positive states
- `fundverseWarning`: `#F59E0B` - Warning, rank badges
- `fundverseError`: `#DC2626` - Error, danger states

**Footer Gradient:**
- `fundverseFooterStart`: `#EEF2FF` - Footer gradient start
- `fundverseFooterEnd`: `#DBEAFE` - Footer gradient end

**Legacy Colors:**
- `fundverseOrange`: `#EB5E28` - Orange accent (used in AuthPage)
- `iconBlue`: `#2563EB` - Icon blue
- `iconIndigo`: `#4F46E5` - Icon indigo
- `mutedText`: `#6B7280` - Muted text (alias)

### 6.2 Gradients

**Primary Gradient:**
- `fundverse-gradient`: `linear-gradient(135deg, #4F46E5, #3B82F6)`
- Used in: Hero sections, buttons, cards

**Footer Gradient:**
- `fundverse-footer`: `linear-gradient(180deg, #EEF2FF, #DBEAFE)`
- Used in: Footer background

### 6.3 Typography

**Font Family:**
- System font stack: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`

**Font Sizes:**
- Headings: `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl` (Tailwind scale)
- Body: `text-base`, `text-sm`, `text-lg`
- Muted: `text-sm`, `text-xs`

**Font Weights:**
- Bold: `font-bold` (headings)
- Semibold: `font-semibold` (subheadings, buttons)
- Medium: `font-medium` (labels)
- Normal: Default (body text)

### 6.4 Global Styles

**Animations:**
- `slide-in`: Slide from left with fade (0.5s)
- `fade-in`: Fade in animation (0.5s)
- Applied via `animate-slide-in` and `animate-fade-in` classes

**Transitions:**
- Global transition: `150ms` for color, background, border, transform
- Custom transitions: `duration-200`, `duration-300` for specific components

**Spacing:**
- Consistent padding: `p-4`, `p-6`, `p-8`
- Consistent gaps: `gap-4`, `gap-6`, `gap-8`
- Max width containers: `max-w-7xl`

### 6.5 Component-Level Styling

**Cards:**
- Background: `bg-[#FFFFFF]` or `bg-white`
- Border: `border border-[#E5E7EB]`
- Shadow: `shadow-md`, `hover:shadow-lg`
- Border radius: `rounded-lg` or `rounded-xl`

**Buttons:**
- Primary: `bg-[#3B82F6]` with `hover:bg-[#2563EB]`
- Outline: `border-2 border-[#3B82F6]` with hover fill
- Transitions: `transition-all duration-300`

**Inputs:**
- Border: `border border-[#E5E7EB]`
- Focus: `focus:ring-2 focus:ring-[#3B82F6]`
- Error: `border-[#DC2626]` with error message

---

## 7. State Management Summary

### 7.1 useState Usage

**Local Component State:**
- Form inputs: All forms use `useState` for controlled inputs
- UI state: Modals, tabs, sidebars, accordions
- Selection state: Amount selection, payment method, role selection

**Key State Variables:**

**AuthPage:**
- `activeTab`: Controls login/signup tab
- `role`: Student or company selection
- `loginForm`, `signupForm`: Form data

**CreateCampaignForm:**
- `formData`: Complete form state object
- `errors`: Validation error messages
- `showPreview`, `showSuccess`: Modal visibility

**StudentDashboard / CompanyDashboard:**
- `activeSection`: Current dashboard section
- `sidebarOpen`: Sidebar expanded/collapsed (persisted)

**SupportAmount:**
- `selectedAmount`: Predefined amount selection
- `customAmount`: Custom amount input
- `isAnonymous`: Anonymous contribution flag

**PaymentPage:**
- `paymentMethod`: Card or UPI selection
- `formData`: Payment form fields

**CampaignDetails:**
- `activeTab`: Current content tab
- `liked`: Like button state

### 7.2 useEffect Usage

**Sidebar Persistence:**
- `StudentDashboard`, `CompanyDashboard`: Save/restore sidebar state from localStorage
- Runs on mount and when `sidebarOpen` changes

**Scroll Animations:**
- `Home`: IntersectionObserver for stats section fade-in
- Cleanup on unmount

**Scroll to Top:**
- `CreateCampaignForm`: Scrolls to top on mount

### 7.3 Custom Hooks

**None** - The project uses only built-in React hooks.

### 7.4 Data Flow

**Top-Down (Props):**
- App.jsx → Pages → Components
- Parent components pass data to children

**State Lifting:**
- Form state managed in page components
- Child components receive callbacks for updates

**Route State:**
- `useLocation().state`: Passes data between routes
  - SupportAmount → PaymentPage (amount, project info)
  - CreateCampaignForm → Discover (campaign data)

**Local Storage:**
- Sidebar state persisted in `localStorage`
- Keys: `studentSidebarOpen`, `companySidebarOpen`

**No Global State:**
- No Context API, Redux, or other global state management
- All state is component-local or passed via routes

---

## 8. Backend API or Data Handling

### 8.1 API Calls

**None** - The application is fully frontend-only with no backend API integration.

### 8.2 Data Structures

**Hardcoded Data:**

**ProjectGrid (Discover page):**
- Array of 6 project objects with: id, image, category, title, description, creator, raised, goal, fundedPercent, backers, daysLeft

**StudentDashboard:**
- `studentProfile`: Object with name, college, major, ongoingProjects, totalRaised, profilePicture
- `myProjects`: Array of 2 project objects
- `analytics`: Object with totalCampaigns, successRate, totalBackers
- `recentSupporters`: Array of supporter objects

**CompanyDashboard:**
- `companySummary`: Object with name, role, totalStartups, totalFunds, activeCampaigns
- `recentCampaigns`: Array of 3 campaign objects
- `adminInsights`: Object with topCategory, mostFunded, pendingReviews, totalBackers

**CampaignDetails:**
- `campaign`: Object with title, description, creator, stats, supportTiers, recentBackers

**AuthPage:**
- `DUMMY_CREDENTIALS`: Object with student and company credentials

### 8.3 Mock Data Patterns

- All data is hardcoded in components
- No data fetching or API calls
- Form submissions show alerts but don't persist data
- File uploads create object URLs for preview but don't upload

---

## 9. Dependencies Summary

### 9.1 Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.1.1 | React library |
| `react-dom` | ^19.1.1 | React DOM rendering |
| `react-router-dom` | ^7.9.5 | Client-side routing |

### 9.2 Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@eslint/js` | ^9.36.0 | ESLint core |
| `@types/react` | ^19.1.16 | TypeScript types for React |
| `@types/react-dom` | ^19.1.9 | TypeScript types for React DOM |
| `@vitejs/plugin-react` | ^5.0.4 | Vite plugin for React |
| `autoprefixer` | ^10.4.21 | CSS vendor prefixing |
| `eslint` | ^9.36.0 | JavaScript linter |
| `eslint-plugin-react-hooks` | ^5.2.0 | ESLint rules for React hooks |
| `eslint-plugin-react-refresh` | ^0.4.22 | ESLint rules for React Fast Refresh |
| `globals` | ^16.4.0 | Global variables for ESLint |
| `postcss` | ^8.5.6 | CSS post-processor |
| `tailwindcss` | ^3.4.18 | Utility-first CSS framework |
| `vite` | ^7.1.7 | Build tool and dev server |

### 9.3 Library Usage

**React Router DOM:**
- `BrowserRouter`: Wraps app for routing
- `Routes`, `Route`: Route configuration
- `Link`: Navigation links
- `useNavigate`: Programmatic navigation
- `useLocation`: Access route state and pathname
- `useParams`: Access route parameters

**React Hooks:**
- `useState`: Component state management
- `useEffect`: Side effects and lifecycle
- `useRef`: DOM references (Home page for IntersectionObserver)

**Tailwind CSS:**
- Utility classes for all styling
- Custom color palette in `tailwind.config.js`
- Custom gradients and animations

---

## 10. Inter-component Connections

### 10.1 Component Dependencies

**App.jsx depends on:**
- All page components
- Navbar, Footer

**Discover depends on:**
- DiscoverFilters
- ProjectGrid

**ProjectGrid depends on:**
- ProjectCard

**CampaignDetails depends on:**
- ProgressBar
- Accordion
- Button

**CreateCampaignForm:**
- Standalone (no child component dependencies)

**StudentDashboard / CompanyDashboard:**
- Standalone (no child component dependencies)

**SupportAmount / PaymentPage:**
- Standalone (no child component dependencies)

### 10.2 Props Flow

**Top-Down Flow:**
1. App.jsx → Pages (no props, uses routing)
2. Discover → DiscoverFilters, ProjectGrid (no props)
3. ProjectGrid → ProjectCard (props: project data)
4. CampaignDetails → ProgressBar, Accordion, Button (props: data/variants)

### 10.3 Routing Connections

**Navigation via Links:**
- Navbar links to: `/`, `/discover`, `/create`, `/login`
- Footer links to: Various routes
- ProjectCard links to: `/campaign/:id`, `/support`
- Buttons navigate via `useNavigate()` hook

**State Passing via Routes:**
- SupportAmount → PaymentPage: `{ amount, projectName, creatorName, isAnonymous }`
- CreateCampaignForm → Discover: (redirect only, no state)

### 10.4 Shared Data Patterns

**No Shared State:**
- Each component manages its own state
- No Context API or global state
- Data passed via route state when needed

**Local Storage:**
- Sidebar state shared between sessions (not between components)

---

## 11. Edge Cases & Special Considerations

### 11.1 Edge Cases Handled

**Form Validation:**
- Empty required fields
- Invalid email format
- Negative amounts
- File upload validation
- Minimum description length (50 chars)

**Input Formatting:**
- Card number: Auto-formatting with spaces, max 16 digits
- Expiry: Auto-formatting as MM/YY, max 4 digits
- CVC: Max 3 digits, numeric only
- Custom amount: Numeric validation

**Navigation:**
- Missing route state: Default values used (SupportAmount, PaymentPage)
- Invalid credentials: Alert shown (AuthPage)
- Back navigation: Preserves state where possible

**Responsive Design:**
- Sidebar: Collapses on mobile (< 768px)
- Grid layouts: 1 col mobile, 2 tablet, 3 desktop
- Forms: Stack on mobile, side-by-side on desktop

### 11.2 Reusable Logic

**Status Color Mapping:**
- `getStatusColor` (StudentDashboard)
- `getStatusBadge` (CompanyDashboard)
- Could be extracted to utility function

**Currency Formatting:**
- `toLocaleString('en-IN')` used throughout
- `formatCurrency` in CreateCampaignForm
- Could be centralized utility

**Form Validation:**
- Validation logic in CreateCampaignForm
- Could be extracted to custom hook or utility

### 11.3 Performance Considerations

**Optimizations:**
- No unnecessary re-renders (local state management)
- Lazy loading: Not implemented (all components loaded upfront)
- Image optimization: Uses object URLs for previews, no optimization
- Code splitting: Not implemented (single bundle)

**Potential Improvements:**
- Implement React.lazy() for route-based code splitting
- Optimize images (WebP, lazy loading)
- Memoize expensive computations
- Virtualize long lists (if needed)

### 11.4 Accessibility Considerations

**Current State:**
- Semantic HTML: Partially used
- ARIA labels: Not implemented
- Keyboard navigation: Basic support
- Focus management: Default browser behavior
- Screen reader support: Limited

**Improvements Needed:**
- Add ARIA labels to interactive elements
- Implement focus traps in modals
- Add skip navigation links
- Ensure color contrast meets WCAG standards

---

## 12. Build/Deploy Instructions

### 12.1 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Server runs on http://localhost:5173 (default Vite port)
```

### 12.2 Production Build

```bash
# Build for production
npm run build

# Output directory: dist/
# Contains optimized, minified assets
```

### 12.3 Preview Production Build

```bash
# Preview production build locally
npm run preview
```

### 12.4 Linting

```bash
# Run ESLint
npm run lint
```

### 12.5 Deployment Considerations

**Static Site Hosting:**
- Can be deployed to: Vercel, Netlify, GitHub Pages, AWS S3, etc.
- Requires: `dist/` folder from build
- Router: Must configure server to serve `index.html` for all routes (SPA routing)

**Environment Variables:**
- None currently used
- No API endpoints to configure

**Build Output:**
- HTML, CSS, JS bundles
- Assets (images, fonts)
- No server-side code

---

## 13. Additional Important Information

### 13.1 Localization

**Indian Context:**
- Currency: Indian Rupees (₹) with `toLocaleString('en-IN')` formatting
- Dates: DD/MM/YYYY format
- Phone: Indian format (+91)
- Locations: Indian cities (Bangalore, Hyderabad, Chennai, etc.)
- Names: Indian names in dummy data
- Projects: India-focused (AgriTech, HealthTech, EdTech for Indian market)

### 13.2 Authentication

**Dummy Credentials:**
- Student: `student@fundverse.com` / `student123`
- Company: `company@fundverse.com` / `company123`
- No real authentication backend
- Credentials hardcoded in AuthPage component

### 13.3 File Uploads

**Mock Implementation:**
- File inputs accept files
- `URL.createObjectURL()` used for previews
- No actual upload to server
- Files stored in component state only

### 13.4 Payment Processing

**Mock Implementation:**
- Payment form collects data
- Platform fee calculated (5%)
- Shows success alert
- No real payment gateway integration
- Redirects to dashboard after "payment"

### 13.5 Data Persistence

**No Backend:**
- All data is hardcoded or in component state
- Form submissions don't persist
- No database or API calls
- LocalStorage only used for sidebar preferences

### 13.6 Browser Compatibility

**Modern Browsers:**
- Requires ES6+ support
- React 19 requires modern browser
- Vite requires modern build environment
- No polyfills included

### 13.7 Known Limitations

1. **No Backend**: All data is mock/hardcoded
2. **No Real Authentication**: Dummy credentials only
3. **No File Upload**: Files only previewed, not saved
4. **No Payment Processing**: Mock implementation only
5. **No Data Persistence**: Form submissions don't save
6. **No Error Boundaries**: No global error handling
7. **No Loading States**: No async operations to show loading
8. **No Pagination**: All projects shown at once
9. **No Search Functionality**: Search input doesn't filter
10. **No Real-time Updates**: Static data only

---

## 14. Code Quality & Standards

### 14.1 Code Style

- **Functional Components**: All components are functional (no class components)
- **Hooks**: Consistent use of React hooks
- **Naming**: camelCase for variables/functions, PascalCase for components
- **File Structure**: One component per file, default export

### 14.2 ESLint Configuration

- **Rules**: Recommended React hooks rules
- **React Refresh**: Enabled for Fast Refresh
- **Unused Vars**: Error for unused variables (except constants)

### 14.3 Best Practices Followed

- Component composition
- Props validation (via usage, not PropTypes)
- Controlled inputs
- Conditional rendering
- Key props in lists

### 14.4 Areas for Improvement

- Add PropTypes or TypeScript for type safety
- Extract reusable utilities
- Implement error boundaries
- Add unit tests
- Implement proper loading states
- Add accessibility improvements

---

## End of Technical Summary

This document provides a complete overview of the FundVerse React + Vite project codebase. All information is based on actual code analysis and is accurate as of the current state of the project.

