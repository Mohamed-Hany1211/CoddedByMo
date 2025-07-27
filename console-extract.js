// ====================================================
// 🚀 EXTRACT YOUR PROJECTS FROM LOCALSTORAGE
// ====================================================
// Copy and paste this entire script into your browser's console
// while viewing your portfolio at localhost:5173

console.log('🚀 Starting projects extraction...');

try {
    // Get projects from localStorage
    const savedProjects = localStorage.getItem('portfolioProjects');
    
    if (!savedProjects) {
        console.error('❌ No projects found in localStorage!');
        console.log('💡 Make sure you have added some projects to your portfolio first.');
        throw new Error('No projects in localStorage');
    }
    
    const projects = JSON.parse(savedProjects);
    
    if (!Array.isArray(projects) || projects.length === 0) {
        console.error('❌ No valid projects found!');
        throw new Error('Invalid projects data');
    }
    
    console.log(`✅ Found ${projects.length} projects in localStorage!`);
    console.log('📋 Here are your projects:', projects);
    
    // Format projects for JavaScript code
    const formattedProjects = projects.map(project => {
        // Clean up the project object
        const cleanProject = {
            id: project.id,
            title: project.title,
            description: project.description,
            type: project.type,
            technologies: project.technologies,
            githubLink: project.githubLink,
            liveLink: project.liveLink || null,
            images: project.images || [],
            featured: project.featured || false,
            longDescription: project.longDescription || project.description,
            techIconNames: project.techIconNames || []
        };
        
        return JSON.stringify(cleanProject, null, 6);
    });
    
    const jsCode = `  // Your actual projects data extracted from localStorage
  const defaultProjects = [
${formattedProjects.map(project => '    ' + project).join(',\n')}
  ];`;
    
    console.log('\n🎯 COPY THE CODE BELOW AND REPLACE defaultProjects IN YOUR Projects.jsx FILE:');
    console.log('=' .repeat(80));
    console.log(jsCode);
    console.log('=' .repeat(80));
    
    // Also copy to clipboard if possible
    if (navigator.clipboard) {
        navigator.clipboard.writeText(jsCode).then(() => {
            console.log('📋 Code copied to clipboard!');
        }).catch(() => {
            console.log('📋 Could not copy to clipboard, please copy manually from above.');
        });
    }
    
    // Store in a global variable for easy access
    window.extractedProjectsCode = jsCode;
    console.log('\n💡 The code is also available in window.extractedProjectsCode');
    
} catch (error) {
    console.error('❌ Error extracting projects:', error.message);
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Make sure you are on your portfolio website (localhost:5173)');
    console.log('2. Add some projects using the "Add New Project" button');
    console.log('3. Refresh the page and try again');
} 