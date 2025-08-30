# Keja Hunter - House Hunting Platform

A comprehensive house hunting platform for Kenya that connects landlords and tenants, making property rental easier and more accessible.

## 🏠 About

Keja Hunter addresses the barriers in house hunting across Kenya by providing a centralized platform where:
- **Landlords** can easily list their available properties for rent
- **Tenants** can browse, search, and find their perfect home
- **Reviews** help build trust through tenant feedback on properties, landlords, and neighborhoods

## 🏗️ Monorepo Structure

This project is part of a larger monorepo containing multiple applications:

\`\`\`
├── keja-hunter/                 # Main house hunting web application (this folder)
│   ├── app/                     # Next.js app directory
│   ├── components/              # React components
│   ├── lib/                     # Utility libraries
│   └── ...
├── ai-chatbot/                  # AI-powered chatbot service
│   ├── src/                     # Chatbot source code
│   ├── models/                  # AI models and training data
│   └── ...
└── shared/                      # Shared utilities and types (if applicable)
\`\`\`

## 🚀 Features

### For Tenants
- **Advanced Property Search**: Filter by location, price range, house size, and amenities
- **AI Smart Search**: Natural language property search (e.g., "2 bedroom apartment in Westlands under 50k")
- **Property Reviews**: Read structured reviews about house condition, landlords, and neighborhoods
- **Tenant Friendliness Score**: Aggregated ratings to help make informed decisions
- **Favorites System**: Save and track interesting properties
- **Detailed Property Views**: High-quality images, comprehensive details, and landlord contact info

### For Landlords
- **Property Management Dashboard**: Add, edit, and manage property listings
- **Analytics**: Track property views, inquiries, and rental income
- **Tenant Communication**: Direct contact with interested tenants
- **Property Status Tracking**: Monitor availability and rental status

### Authentication & User Management
- **Role-based Authentication**: Separate dashboards for landlords and tenants
- **Profile Management**: Comprehensive user profiles with contact information
- **Account Settings**: Security settings, notifications, and preferences

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Authentication**: Custom JWT-based auth with dummy data
- **State Management**: React Context API
- **Deployment**: Vercel

## 📁 Project Structure

\`\`\`
keja-hunter/
├── app/                         # Next.js App Router pages
│   ├── dashboard/
│   │   ├── landlord/           # Landlord dashboard
│   │   └── tenant/             # Tenant property browsing
│   ├── login/                  # Authentication pages
│   ├── register/
│   ├── profile/                # User profile management
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   └── globals.css             # Global styles
├── components/                  # React components
│   ├── auth/                   # Authentication forms
│   ├── browse/                 # Property browsing components
│   ├── dashboard/              # Dashboard-specific components
│   ├── profile/                # Profile management
│   └── ui/                     # Reusable UI components (shadcn/ui)
├── lib/                        # Utility libraries
│   ├── auth.ts                 # Authentication logic & dummy data
│   ├── properties.ts           # Property data types & dummy data
│   └── utils.ts                # General utilities
├── contexts/                   # React Context providers
├── hooks/                      # Custom React hooks
├── public/                     # Static assets
└── types/                      # TypeScript type definitions
\`\`\`

## 🔧 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd keja-hunter
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Credentials

The application uses dummy data for demonstration. Use these credentials to test different user roles:

### Landlord Account
- **Email**: `john.landlord@example.com`
- **Password**: `password123`
- **Features**: Property management dashboard, add/edit listings, view analytics

### Tenant Account
- **Email**: `mary.tenant@example.com`
- **Password**: `password123`
- **Features**: Property browsing, advanced search, reviews, favorites

## 🎨 Design System

The application follows a consistent design system with:
- **Primary Color**: Indigo (#6366f1) - Professional and trustworthy
- **Secondary Color**: Red (#dc2626) - For important actions and alerts
- **Accent Color**: Amber (#f59e0b) - For highlights and success states
- **Typography**: Geist Sans for headings, system fonts for body text
- **Components**: Built with shadcn/ui for consistency and accessibility

## 📱 Key Pages

- **Homepage** (`/`): Landing page with features and call-to-action
- **Authentication** (`/login`, `/register`): User registration and login
- **Landlord Dashboard** (`/dashboard/landlord`): Property management interface
- **Tenant Dashboard** (`/dashboard/tenant`): Property browsing and search
- **Profile** (`/profile`): User profile and account settings

## 🔄 Development Workflow

1. **Component Development**: Components are organized by feature in the `components/` directory
2. **Styling**: Uses Tailwind CSS with custom design tokens in `globals.css`
3. **Type Safety**: Full TypeScript coverage with interfaces in `lib/` files
4. **State Management**: React Context for authentication and global state

## 🚀 Deployment

The application is optimized for deployment on Vercel:

\`\`\`bash
pnpm build
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
