# 🚀 Modern Portfolio Website

A stunning, responsive portfolio website built with Next.js, featuring smooth animations, an admin panel, and SQLite database integration. Perfect for showcasing your projects and professional experience.

## ✨ Features

### 🎨 Design & UI
- **Modern Dark Theme** with elegant black & gold color scheme
- **Smooth Animations** powered by Framer Motion
- **Responsive Design** that looks great on all devices
- **Custom Smooth Scrolling** with unique content animations
- **Interactive Components** with hover effects and micro-interactions

### 🛡️ Admin Panel
- **Secure Authentication** with fixed password (`adminkal`)
- **Profile Management** - Edit your personal information, bio, skills, and contact details
- **Project Management** - Add, edit, and organize your projects
- **Real-time Updates** - Changes reflect immediately on the frontend

### 🗄️ Database
- **SQLite Database** for lightweight, file-based storage
- **Drizzle ORM** for type-safe database operations
- **Database Seeding** with sample data
- **Automatic Migrations** for schema updates

### 📱 Sections
- **Hero Section** with animated introduction and skills showcase
- **About Section** with professional experience timeline
- **Projects Section** with filterable project gallery
- **Contact Section** with working contact form
- **Smooth Navigation** between sections

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: SQLite with Drizzle ORM
- **Icons**: Lucide React
- **Development**: Turbopack for fast development

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup database**
   ```bash
   # Generate and apply database migrations
   npx drizzle-kit push
   
   # Seed the database with sample data
   npx tsx scripts/seed.ts
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx drizzle-kit generate` - Generate new migrations
- `npx drizzle-kit push` - Push schema to database
- `npx tsx scripts/seed.ts` - Seed database with sample data

## 🔧 Configuration

### Admin Panel Access
- Navigate to `/admin`
- Enter password: `adminkal`
- Start editing your profile and projects

### Database Location
- SQLite database is stored in `./data/portfolio.db`
- Database is automatically created on first run

### Customization
- Colors can be customized in `tailwind.config.ts`
- Animations can be modified in component files
- Database schema in `src/lib/db/schema.ts`

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── admin/             # Admin panel pages
│   │   ├── api/               # API routes
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── HeroSection.tsx    # Hero section component
│   │   ├── AboutSection.tsx   # About section component
│   │   ├── ProjectsSection.tsx # Projects section component
│   │   ├── ContactSection.tsx  # Contact section component
│   │   ├── Navbar.tsx         # Navigation component
│   │   └── SmoothScrollContainer.tsx
│   └── lib/
│       └── db/                # Database configuration
│           ├── schema.ts      # Database schema
│           ├── index.ts       # Database connection
│           └── migrations/    # Database migrations
├── scripts/
│   └── seed.ts               # Database seeding script
├── data/
│   └── portfolio.db          # SQLite database file
├── drizzle.config.ts         # Drizzle configuration
└── tailwind.config.ts        # Tailwind configuration
```

## 🎨 Customization Guide

### 1. Personal Information
Access the admin panel at `/admin` to update:
- Name and job title
- Bio and description
- Contact information
- Skills and technologies
- Social media links

### 2. Projects
Add your projects through the admin panel:
- Project title and description
- Technologies used
- Demo and GitHub links
- Project categories
- Featured projects

### 3. Colors & Theme
Modify colors in `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    black: "#0a0a0a",      // Main background
    gold: "#FFD700",       // Accent color
    "dark-gold": "#B8860B", // Hover states
  }
}
```

### 4. Typography
Change fonts in `src/app/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap');
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms
1. Build the project: `npm run build`
2. Upload the `.next` folder and dependencies
3. Set up environment variables if needed

## 🔒 Security Notes

- The admin password is hardcoded for simplicity
- For production, consider implementing proper authentication
- Use environment variables for sensitive configuration
- Enable HTTPS in production

## 📱 Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support with minor animation differences
- Mobile browsers: Optimized responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support & Issues

If you encounter any issues:
1. Check the console for error messages
2. Ensure all dependencies are installed
3. Verify database is properly set up
4. Create an issue on GitHub with details

## 🎯 Future Enhancements

- [ ] Blog system integration
- [ ] Advanced project filtering
- [ ] Image upload for projects
- [ ] Contact form email integration
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Analytics integration
- [ ] SEO optimizations
- [ ] Progressive Web App features

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.

**Live Demo**: [Your Portfolio URL]
**Admin Panel**: [Your Portfolio URL]/admin
