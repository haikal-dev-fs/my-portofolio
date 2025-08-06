# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and SQLite. Features a beautiful design with smooth animations and a complete admin panel for content management.

## 🚀 Features

- **Modern Design**: Clean and responsive design with smooth animations
- **Admin Panel**: Complete content management system at `/admin`
- **SQLite Database**: Local database for portfolio data storage
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Smooth animations and transitions
- **Mobile Responsive**: Optimized for all device sizes
- **Performance Optimized**: Fast loading with Next.js optimizations

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Project Structure

```
src/
├── app/
│   ├── admin/              # Admin panel for content management
│   │   └── page.tsx
│   ├── api/               # API routes
│   │   ├── about/
│   │   ├── projects/
│   │   └── skills/
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── ui/               # Reusable UI components
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── Contact.tsx       # Contact section
│   ├── Footer.tsx        # Footer component
│   ├── Header.tsx        # Navigation header
│   ├── Hero.tsx          # Hero section
│   ├── Projects.tsx      # Projects showcase
│   └── Skills.tsx        # Skills section
└── lib/
    ├── database.ts       # SQLite database configuration
    └── utils.ts          # Utility functions
```

## 🗄️ Database Schema

The SQLite database includes the following tables:

- **about**: Personal information (name, title, bio, contact info)
- **projects**: Portfolio projects with details and links
- **skills**: Technical skills with categories and proficiency levels
- **experiences**: Work experience entries

## ⚙️ Configuration

### Admin Panel

Access the admin panel at `/admin` with the following credentials:

**Default Login:**
- Password: `admin123`

**For Production:**
1. Change the admin password by setting the `ADMIN_PASSWORD` environment variable
2. Create a `.env.local` file:
```env
ADMIN_PASSWORD=your_secure_password_here
```

**Admin Panel Features:**
- Update personal information
- Add/edit/delete projects
- Manage skills and categories
- Update contact information
- Session-based authentication
- Logout functionality

### Customization

1. **Colors**: Modify the color scheme in `tailwind.config.js`
2. **Content**: Use the admin panel or directly edit the database
3. **Animations**: Customize animations in component files
4. **Layout**: Modify component layouts as needed

## 🎨 Customizing Your Portfolio

### Personal Information
1. Visit `/admin` in your browser
2. Update the "About Information" section with your details
3. Add your profile image URL and resume link

### Adding Projects
1. Go to the Projects section in the admin panel
2. Click "Add Project"
3. Fill in project details, technologies, and links
4. Mark important projects as "Featured"

### Skills Management
Skills are automatically populated with sample data. You can modify them by:
1. Accessing the SQLite database directly
2. Or extending the admin panel to include skills management

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## 📝 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Admin Panel Configuration
ADMIN_PASSWORD=your_secure_admin_password

# Next.js Configuration  
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Important for Production:**
- Always change the default admin password
- Use a strong, unique password for the admin panel
- Consider using environment-specific configurations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling utilities
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for the beautiful icons

## 📞 Support

If you have any questions or need help customizing your portfolio, feel free to reach out or create an issue in the repository.

---

Built with ❤️ using Next.js and TypeScript
