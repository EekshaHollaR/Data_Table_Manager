# Dynamic Data Table Manager

A modern, feature-rich data table management application built with Next.js 14, Redux Toolkit, and Material-UI. This application provides a sophisticated interface for managing tabular data with advanced features like CSV import/export, inline editing, dynamic columns, and a beautiful dark mode.

![Dynamic Data Table Manager](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Material-UI](https://img.shields.io/badge/Material--UI-5-0081CB)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC)

## 🌐 Live Demo

**Production URL:** [https://data-table-manager-74ur.vercel.app/](https://data-table-manager-74ur.vercel.app/)

## ✨ Features

### Core Features
- ✅ **Dynamic Table Display** - Sortable columns with ascending/descending toggle
- ✅ **Global Search** - Real-time search across all fields
- ✅ **Client-side Pagination** - Navigate through data with 5, 10, or 25 rows per page
- ✅ **Column Management** - Add, remove, and toggle visibility of columns
- ✅ **CSV Import/Export** - Seamless data import and export functionality
- ✅ **Inline Editing** - Edit rows directly in the table with validation
- ✅ **Row Actions** - Edit and delete rows with confirmation dialogs
- ✅ **State Persistence** - Column preferences saved locally with Redux Persist

### Advanced Features
- 🎨 **Dark/Light Mode** - Beautiful theme toggle with smooth transitions
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ♿ **Accessibility** - WCAG compliant with proper ARIA labels
- 🎯 **Type Safety** - Built with TypeScript for robust code
- ⚡ **Performance** - Optimized rendering with React hooks and memoization
- 🎭 **Modern UI/UX** - Professional design with gradient backgrounds and smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

**Clone the repository:**
- git clone <your-repository-url>
- cd dynamic-table-manager-app

**Install dependencies:**
npm install

**Run the development server:**
npm run dev

**Open your browser:**
- Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

- npm run build
- npm start

### Deploy to Vercel

- Install Vercel CLI
- npm i -g vercel
- Deploy
- vercel

## 📁 Project Structure
- dynamic-table-manager-app/ 
- ├── src/
- │ ├── app/
- │ │ ├── layout.tsx # Root layout with providers
- │ │ ├── page.tsx # Home page
- │ │ └── globals.css # Global styles
- │ ├── components/
- │ │ ├── DataTable.tsx # Main table component
- │ │ ├── EditableCell.tsx # Inline cell editor
- │ │ ├── ImportExportButtons.tsx # CSV operations
- │ │ ├── ManageColumnsModal.tsx # Column management
- │ │ └── ThemeToggle.tsx # Theme switcher
- │ ├── redux/
- │ │ ├── store.ts # Redux store configuration
- │ │ ├── provider.tsx # Redux provider wrapper
- │ │ └── features/
- │ │ ├── tableSlice.ts # Table state management
- │ │ └── themeSlice.ts # Theme state management
- │ ├── types/
- │ │ └── table.types.ts # TypeScript interfaces
- │ └── utils/
- │ ├── csvHelpers.ts # CSV utilities
- │ └── theme.ts # MUI theme configuration
- ├── package.json
- ├── tsconfig.json
- ├── next.config.js
- └── README.md


## 🎯 Usage Guide

### Searching Data
Type in the search box to filter data across all columns in real-time. The search is case-insensitive and searches through all visible fields.

### Sorting Columns
Click on any column header to sort data. Click again to toggle between ascending and descending order.

### Managing Columns

1. Click the **"Manage"** button in the toolbar
2. **Add new columns:**
   - Enter column name (e.g., "Department")
   - Enter field name (e.g., "department")
   - Click "Add"
3. **Toggle visibility:** Check/uncheck columns
4. **Delete columns:** Click the delete icon next to any column

### Importing CSV Files

1. Click **"Import CSV"** button
2. Select a CSV file from your computer
3. Data and columns are automatically imported
4. Success notification appears


### Exporting Data

1. Enter desired filename (optional)
2. Click **"Export CSV"** button
3. Only visible columns are exported
4. File downloads automatically

### Editing Rows

1. Click the **edit icon** (pencil) in the Actions column
2. Fields become editable
3. Modify values as needed
4. **Validation:**
   - Age: Must be 0-150
   - Email: Valid email format required
5. Click **save** (checkmark) or **cancel** (X)

### Deleting Rows

1. Click the **delete icon** (trash) in the Actions column
2. Confirm deletion in the dialog
3. Row is permanently removed

### Theme Toggle

Click the **sun/moon icon** in the top right to switch between light and dark modes. Your preference is saved automatically.

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript 5** - Type safety

### State Management
- **Redux Toolkit** - Predictable state container
- **Redux Persist** - State persistence
- **React Redux** - React bindings for Redux

### UI Components
- **Material-UI v5** - Component library
- **Emotion** - CSS-in-JS styling
- **MUI Icons** - Icon components

### Data Processing
- **PapaParse** - CSV parsing library
- **FileSaver.js** - Client-side file saving

### Form Management
- **React Hook Form** - Form validation and handling

### Deployment
- **Vercel** - Hosting and deployment platform

## 🎨 Design System

### Color Palette

**Light Mode:**
- Primary: `#0284c7` (Sky Blue)
- Secondary: `#64748b` (Slate Gray)
- Background: `#f8fafc` (Light Gray)
- Text: `#0f172a` (Dark Slate)

**Dark Mode:**
- Primary: `#38bdf8` (Bright Cyan)
- Secondary: `#94a3b8` (Light Slate)
- Background: `#0f172a` (Deep Navy)
- Text: `#f1f5f9` (Off White)

### Typography
- Font Family: Inter, Roboto, Helvetica Neue, Arial
- Font Sizes: 11px - 30px
- Font Weights: 300 - 700

### Spacing System
- Base unit: 4px
- Scale: 4, 8, 12, 16, 20, 24, 32px

## 📊 Component API

### DataTable Props
The main table component manages all table operations internally through Redux.

### EditableCell Props
- interface EditableCellProps {
- row: TableRow;
- field: string;
- isEditing: boolean;
- onUpdate: (field: string, value: any) => void;
- }

### ManageColumnsModal Props
- interface ManageColumnsModalProps {
- open: boolean;
- onClose: () => void;
- }

## 🔧 Configuration

### Environment Variables

- Create a `.env.local` file (optional):
- API Configuration (for future use)
- NEXT_PUBLIC_API_URL=http://localhost:3000

- Feature Flags
- NEXT_PUBLIC_ENABLE_IMPORT_EXPORT=true
- NEXT_PUBLIC_ENABLE_THEME_TOGGLE=true
- NEXT_PUBLIC_ENABLE_INLINE_EDIT=true

### Next.js Configuration

**next.config.js:**
- /** @type {import('next').NextConfig} */
- const nextConfig = {
- reactStrictMode: true,
- swcMinify: true,
- }

- module.exports = nextConfig


For issues, questions, or suggestions:

- **Email:** [eeksha5.rg@gmail.com](mailto:eeksha5.rg@gmail.com)
- **Live Demo:** [https://data-table-manager-74ur.vercel.app/](https://data-table-manager-74ur.vercel.app/)
- **Create an Issue:** Use GitHub Issues for bug reports and feature requests

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI](https://mui.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [PapaParse](https://www.papaparse.com/)
- [Vercel](https://vercel.com/) for hosting


**Built with ❤️ by Eeksha**

**Live at:** [https://data-table-manager-74ur.vercel.app/](https://data-table-manager-74ur.vercel.app/)

**Contact:** [eeksha5.rg@gmail.com](mailto:eeksha5.rg@gmail.com)