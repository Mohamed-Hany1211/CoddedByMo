# Mohamed Hany - Portfolio Website

A stunning, modern, and highly interactive portfolio website for Mohamed Hany, a Full Stack Web Developer specializing in backend development with expertise in the MERN stack.

## 🌟 Features

### ✨ Design & UI
- **Modern Dark Theme** with glassmorphism effects
- **Responsive Design** that works perfectly on all devices
- **Smooth Animations** using GSAP and Framer Motion
- **Interactive Elements** with hover effects and micro-interactions
- **Professional Typography** using Inter font family
- **Custom Scrollbar** with gradient styling

### 🎭 Animations & Interactions
- **Loading Screen** with progress bar and animated logo
- **Typewriter Effect** for hero section text
- **Scroll-triggered Animations** for section reveals
- **Parallax Effects** for background elements
- **Staggered Animations** for project cards
- **Interactive Cursor** effects
- **Smooth Scrolling** between sections

### 📱 Sections

#### 🏠 Hero Section
- Animated introduction with typewriter effect
- Professional photo placeholder
- MERN stack technology icons
- Call-to-action buttons
- Social media links
- Scroll indicator

#### 👨‍💻 About Section
- Personal introduction and background
- Skills visualization with animated progress bars
- Technology categories (Frontend, Backend, Database, Tools & DevOps)
- Experience highlights
- Interactive skill cards

#### 🚀 Projects Section
- **Dynamic Project Management System**
- **Filtering System** (All, Frontend, Backend, Full Stack)
- **Search Functionality** across projects
- **Project Modal** with detailed view
- **Image Galleries** for frontend/fullstack projects
- **Technology Stack Display** with icons
- **GitHub and Live Demo Links**
- **Featured Projects** highlighting

#### 📬 Contact Section
- **Contact Form** with validation
- **Contact Information** display
- **Social Media Links** with hover effects
- **Form Submission** simulation (ready for EmailJS integration)
- **Success/Error Messages**

#### 🔗 Navigation
- **Fixed Navigation Bar** with scroll effects
- **Smooth Scrolling** to sections
- **Active Section Highlighting**
- **Mobile-Responsive Menu**
- **Animated Navigation Items**

### 🛠 Technical Features

#### **Animation Libraries**
- **GSAP** for complex animations and scroll triggers
- **Framer Motion** for React component animations
- **AOS (Animate On Scroll)** for scroll-based animations
- **React Tilt** for 3D tilt effects
- **React Intersection Observer** for viewport detection

#### **Modern Technologies**
- **React.js 19.1.0** with modern hooks
- **Vite** for fast development and building
- **CSS Modules** for component-scoped styling
- **React Icons** for consistent iconography
- **EmailJS** integration ready for contact form

#### **Performance Optimizations**
- **Lazy Loading** for images
- **Code Splitting** for optimal bundle size
- **Optimized Animations** targeting 60fps
- **Modern CSS** with GPU acceleration
- **Responsive Images** with WebP support ready

### 🎨 Design Elements

#### **Color Scheme**
- **Primary Gradient**: Purple to Blue (#667eea to #764ba2)
- **Background**: Deep navy/black gradients
- **Accent Colors**: Electric blue, green, purple
- **Text**: White with various opacity levels

#### **Visual Effects**
- **Glassmorphism**: Translucent cards with backdrop blur
- **Gradient Backgrounds**: Animated floating orbs
- **Custom Shadows**: Multiple shadow utilities
- **Border Radius**: Consistent rounded corners
- **Hover Effects**: Scale, glow, and transform animations

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohamedhany/portfolio
   cd portfolio/CoddedByMo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
CoddedByMo/
├── src/
│   ├── Components/
│   │   ├── Navigation.jsx & Navigation.module.css
│   │   ├── Hero.jsx & Hero.module.css
│   │   ├── About.jsx & About.module.css
│   │   ├── Projects.jsx & Projects.module.css
│   │   ├── Contact.jsx & Contact.module.css
│   │   ├── Footer.jsx & Footer.module.css
│   │   └── Loading.jsx & Loading.module.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── public/
│   └── vite.svg
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Customization

### Adding New Projects

Edit the `projects` array in `src/Components/Projects.jsx`:

```javascript
const newProject = {
  id: 5,
  title: "Your Project Name",
  description: "Project description",
  type: "fullstack", // frontend, backend, fullstack
  technologies: ["React", "Node.js", "MongoDB"],
  githubLink: "https://github.com/username/repo",
  liveLink: "https://your-demo.com", // optional
  images: ["image1.jpg", "image2.jpg"], // for frontend/fullstack
  featured: false,
  longDescription: "Detailed project description",
  techIcons: [SiReact, SiNodedotjs, SiMongodb]
};
```

### Updating Personal Information

1. **Hero Section**: Edit `src/Components/Hero.jsx`
2. **About Section**: Edit `src/Components/About.jsx`
3. **Contact Information**: Edit `src/Components/Contact.jsx`
4. **Skills**: Update skills data in `src/Components/About.jsx`

### Customizing Colors

Update CSS custom properties in `src/App.css`:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #your-color-1, #your-color-2);
  --background-dark: #your-background-color;
}
```

## 🔧 Dependencies

### Core Dependencies
- **react**: ^19.1.0
- **react-dom**: ^19.1.0
- **gsap**: ^3.12.2
- **framer-motion**: ^10.16.4
- **aos**: ^2.3.4
- **react-icons**: ^4.7.1
- **react-intersection-observer**: ^9.5.2
- **react-tilt**: ^1.0.2
- **@emailjs/browser**: Latest

### Development Dependencies
- **vite**: ^7.0.4
- **@vitejs/plugin-react**: ^4.6.0
- **eslint**: ^9.30.1

## 🌐 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile browsers**: iOS Safari 14+, Chrome Mobile 90+

## 📱 Responsive Breakpoints

- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## ⚡ Performance

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: <2s
- **Largest Contentful Paint**: <3s
- **Cumulative Layout Shift**: <0.1

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - **Framework**: Vite
   - **Root Directory**: CoddedByMo
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Netlify
1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - **Base Directory**: CoddedByMo
   - **Build Command**: `npm run build`
   - **Publish Directory**: `CoddedByMo/dist`

### GitHub Pages
```bash
npm run build
npm run deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **GSAP** for powerful animations
- **Framer Motion** for React animations
- **React Icons** for beautiful icons
- **Inter Font** for modern typography
- **Vite** for fast development experience

## 📞 Contact

**Mohamed Hany**
- Email: mohamed.hany@email.com
- LinkedIn: [linkedin.com/in/mohamedhany](https://linkedin.com/in/mohamedhany)
- GitHub: [github.com/mohamedhany](https://github.com/mohamedhany)
- Portfolio: [your-portfolio-url.com](https://your-portfolio-url.com)

---

⭐ **Star this repository if you found it helpful!**
