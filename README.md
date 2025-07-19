# TanStack Form Demo Application

A full-stack demonstration application showcasing advanced form handling with TanStack Form, featuring React frontend with TypeScript and Express backend.

## 🚀 Features

- **Advanced Form Validation**: Client-side and server-side validation using Zod schemas
- **TanStack Form Integration**: Leveraging `@tanstack/react-form` for powerful form state management
- **Modern React Stack**: Built with React 19, TypeScript, and Vite
- **Responsive UI**: Styled with Tailwind CSS and Radix UI components
- **Full-Stack Architecture**: Express backend with CORS support
- **Developer Experience**: Hot reload, TypeScript support, and comprehensive tooling

## 📁 Project Structure

```
tanstackform/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── routes/        # TanStack Router routes
│   │   └── integrations/  # Third-party integrations
│   ├── package.json
│   └── vite.config.ts
├── backend/           # Express server
│   ├── server.ts
│   └── package.json
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **TanStack Form** - Advanced form state management
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Server state management
- **Zod** - Schema validation
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Vite** - Fast build tool

### Backend
- **Express** - Web framework
- **TypeScript** - Type-safe server development
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Development auto-restart

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (recommended package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tanstackform
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   pnpm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   pnpm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   pnpm dev
   ```
   Server will run on `http://localhost:3000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   pnpm dev
   ```
   Frontend will run on `http://localhost:5173`

## 📋 Form Features Demonstrated

### Validation
- **Email validation** with proper email format checking
- **Password requirements** with minimum length validation
- **Name fields** with required validation
- **Address validation** including:
  - Required address line 1
  - Optional address line 2
  - City validation
  - State validation (2-character requirement)
  - ZIP code validation (5-character requirement)

### Advanced Form Handling
- **Async validation** with server-side checks
- **Global form error handling** using TanStack Form's error map
- **Field-level validation** with real-time feedback
- **Form submission** with loading states and error handling
- **Toast notifications** for user feedback

### Key Implementation Details

The application demonstrates proper TanStack Form usage, including:

```typescript
// Setting global form errors
form.setErrorMap({
  onSubmit: {
    form: 'Your error message here',
    fields: {},
  },
});

// Accessing form errors
const formState = useStore(form.store, (state) => state);
const globalError = formState.errorMap?.onSubmit?.form;
```

## 🧪 Testing

Run the test suite:
```bash
cd frontend
pnpm test
```

## 🏗️ Building for Production

```bash
cd frontend
pnpm build
```

## 📚 Learning Resources

- [TanStack Form Documentation](https://tanstack.com/form)
- [TanStack Router Documentation](https://tanstack.com/router)
- [TanStack Query Documentation](https://tanstack.com/query)
- [Zod Documentation](https://zod.dev/)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Note**: This is a demonstration application showcasing TanStack Form capabilities. It includes examples of complex form validation, error handling, and integration with modern React patterns.