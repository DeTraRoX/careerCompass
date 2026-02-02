const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('../models/Question');
const Career = require('../models/Career');
const User = require('../models/User');
const connectDB = require('../config/database');

dotenv.config();

const sampleQuestions = [
  {
    question: 'What type of work environment do you prefer?',
    options: [
      {
        text: 'Working with computers and technology',
        categories: { technology: 5, analytical: 3, creativity: 1, management: 1, communication: 1 },
      },
      {
        text: 'Leading teams and making decisions',
        categories: { management: 5, communication: 4, analytical: 2, technology: 1, creativity: 1 },
      },
      {
        text: 'Creating artistic or creative content',
        categories: { creativity: 5, communication: 3, technology: 2, analytical: 1, management: 1 },
      },
      {
        text: 'Analyzing data and solving problems',
        categories: { analytical: 5, technology: 3, management: 2, creativity: 1, communication: 1 },
      },
    ],
    category: 'general',
  },
  {
    question: 'How do you prefer to solve problems?',
    options: [
      {
        text: 'Write code or use technical tools',
        categories: { technology: 5, analytical: 4, creativity: 2, management: 1, communication: 1 },
      },
      {
        text: 'Collaborate with a team and delegate',
        categories: { management: 5, communication: 4, analytical: 2, technology: 1, creativity: 1 },
      },
      {
        text: 'Think creatively and design solutions',
        categories: { creativity: 5, analytical: 3, communication: 3, technology: 2, management: 1 },
      },
      {
        text: 'Analyze data and research thoroughly',
        categories: { analytical: 5, technology: 3, management: 2, creativity: 1, communication: 2 },
      },
    ],
    category: 'general',
  },
  {
    question: 'What interests you most?',
    options: [
      {
        text: 'Programming and software development',
        categories: { technology: 5, analytical: 4, creativity: 2, management: 1, communication: 1 },
      },
      {
        text: 'Business strategy and leadership',
        categories: { management: 5, communication: 4, analytical: 3, technology: 1, creativity: 1 },
      },
      {
        text: 'Design, art, and creative expression',
        categories: { creativity: 5, communication: 3, technology: 2, analytical: 1, management: 1 },
      },
      {
        text: 'Research and data analysis',
        categories: { analytical: 5, technology: 3, management: 2, creativity: 1, communication: 2 },
      },
    ],
    category: 'general',
  },
  {
    question: 'What skills do you enjoy developing?',
    options: [
      {
        text: 'Coding languages and technical skills',
        categories: { technology: 5, analytical: 4, creativity: 2, management: 1, communication: 1 },
      },
      {
        text: 'Leadership and team management',
        categories: { management: 5, communication: 4, analytical: 2, technology: 1, creativity: 1 },
      },
      {
        text: 'Artistic and design skills',
        categories: { creativity: 5, communication: 3, technology: 2, analytical: 1, management: 1 },
      },
      {
        text: 'Statistical and analytical methods',
        categories: { analytical: 5, technology: 3, management: 2, creativity: 1, communication: 1 },
      },
    ],
    category: 'general',
  },
  {
    question: 'How do you prefer to communicate?',
    options: [
      {
        text: 'Through code and technical documentation',
        categories: { technology: 4, analytical: 3, communication: 2, creativity: 2, management: 1 },
      },
      {
        text: 'In meetings and presentations',
        categories: { communication: 5, management: 4, analytical: 2, technology: 1, creativity: 2 },
      },
      {
        text: 'Through visual designs and creative work',
        categories: { creativity: 5, communication: 4, technology: 2, analytical: 1, management: 1 },
      },
      {
        text: 'Through reports and data visualization',
        categories: { analytical: 5, communication: 3, technology: 3, creativity: 2, management: 1 },
      },
    ],
    category: 'general',
  },
  {
    question: 'What type of projects do you find most rewarding?',
    options: [
      {
        text: 'Building software applications and systems',
        categories: { technology: 5, analytical: 4, creativity: 2, management: 1, communication: 1 },
      },
      {
        text: 'Leading a team to achieve business goals',
        categories: { management: 5, communication: 4, analytical: 2, technology: 1, creativity: 1 },
      },
      {
        text: 'Designing user experiences and visual interfaces',
        categories: { creativity: 5, communication: 3, technology: 2, analytical: 1, management: 1 },
      },
      {
        text: 'Analyzing trends and making data-driven recommendations',
        categories: { analytical: 5, technology: 3, management: 2, creativity: 1, communication: 2 },
      },
    ],
    category: 'general',
  },
  {
    question: 'How do you prefer to learn new things?',
    options: [
      {
        text: 'Hands-on practice and building projects',
        categories: { technology: 5, analytical: 3, creativity: 2, management: 1, communication: 1 },
      },
      {
        text: 'Through mentorship and collaborative learning',
        categories: { management: 4, communication: 5, analytical: 2, technology: 1, creativity: 1 },
      },
      {
        text: 'Experimenting with creative approaches',
        categories: { creativity: 5, analytical: 2, communication: 2, technology: 2, management: 1 },
      },
      {
        text: 'Research, reading, and structured courses',
        categories: { analytical: 5, technology: 3, management: 2, creativity: 1, communication: 1 },
      },
    ],
    category: 'general',
  },
  {
    question: 'What motivates you most in your work?',
    options: [
      {
        text: 'Solving complex technical challenges',
        categories: { technology: 5, analytical: 4, creativity: 2, management: 1, communication: 1 },
      },
      {
        text: 'Achieving team success and organizational goals',
        categories: { management: 5, communication: 4, analytical: 2, technology: 1, creativity: 1 },
      },
      {
        text: 'Creating something beautiful and innovative',
        categories: { creativity: 5, communication: 3, technology: 2, analytical: 1, management: 1 },
      },
      {
        text: 'Discovering insights from data and research',
        categories: { analytical: 5, technology: 3, management: 2, creativity: 1, communication: 2 },
      },
    ],
    category: 'general',
  },
  {
    question: 'What is your ideal work schedule?',
    options: [
      {
        text: 'Flexible hours, focused on deep work and coding',
        categories: { technology: 5, analytical: 3, creativity: 2, management: 1, communication: 1 },
      },
      {
        text: 'Structured schedule with regular team meetings',
        categories: { management: 4, communication: 5, analytical: 2, technology: 1, creativity: 1 },
      },
      {
        text: 'Creative hours when inspiration strikes',
        categories: { creativity: 5, analytical: 1, communication: 2, technology: 2, management: 1 },
      },
      {
        text: 'Regular hours with time for research and analysis',
        categories: { analytical: 5, technology: 2, management: 2, creativity: 1, communication: 2 },
      },
    ],
    category: 'general',
  },
  {
    question: 'How do you handle stress and deadlines?',
    options: [
      {
        text: 'Focus on the technical solution and code systematically',
        categories: { technology: 5, analytical: 4, creativity: 1, management: 1, communication: 1 },
      },
      {
        text: 'Delegate tasks and coordinate with the team',
        categories: { management: 5, communication: 4, analytical: 2, technology: 1, creativity: 1 },
      },
      {
        text: 'Use creative problem-solving and think outside the box',
        categories: { creativity: 5, analytical: 2, communication: 2, technology: 2, management: 1 },
      },
      {
        text: 'Analyze the situation and prioritize based on data',
        categories: { analytical: 5, technology: 3, management: 2, creativity: 1, communication: 2 },
      },
    ],
    category: 'general',
  },
  {
    question: 'What kind of impact do you want to make?',
    options: [
      {
        text: 'Build innovative technology solutions',
        categories: { technology: 5, analytical: 3, creativity: 3, management: 1, communication: 1 },
      },
      {
        text: 'Lead teams and drive business growth',
        categories: { management: 5, communication: 4, analytical: 3, technology: 1, creativity: 1 },
      },
      {
        text: 'Create engaging user experiences and designs',
        categories: { creativity: 5, communication: 4, technology: 2, analytical: 1, management: 1 },
      },
      {
        text: 'Provide insights that inform important decisions',
        categories: { analytical: 5, communication: 3, technology: 2, management: 2, creativity: 1 },
      },
    ],
    category: 'general',
  },
  {
    question: 'What subjects did you enjoy most in school?',
    options: [
      {
        text: 'Mathematics, Computer Science, and Physics',
        categories: { technology: 5, analytical: 4, creativity: 1, management: 1, communication: 1 },
      },
      {
        text: 'Business, Economics, and Leadership courses',
        categories: { management: 5, communication: 4, analytical: 3, technology: 1, creativity: 1 },
      },
      {
        text: 'Arts, Design, and Creative Writing',
        categories: { creativity: 5, communication: 3, technology: 1, analytical: 1, management: 1 },
      },
      {
        text: 'Statistics, Research Methods, and Social Sciences',
        categories: { analytical: 5, communication: 3, technology: 2, management: 2, creativity: 1 },
      },
    ],
    category: 'general',
  },
  {
    question: 'What type of work-life balance do you prefer?',
    options: [
      {
        text: 'Work independently, focus on technical excellence',
        categories: { technology: 5, analytical: 3, creativity: 2, management: 1, communication: 1 },
      },
      {
        text: 'Collaborate frequently, attend networking events',
        categories: { management: 4, communication: 5, analytical: 2, technology: 1, creativity: 2 },
      },
      {
        text: 'Flexible schedule to pursue creative projects',
        categories: { creativity: 5, communication: 2, technology: 2, analytical: 1, management: 1 },
      },
      {
        text: 'Structured routine with time for research and learning',
        categories: { analytical: 5, technology: 3, management: 2, creativity: 1, communication: 1 },
      },
    ],
    category: 'general',
  },
  {
    question: 'What type of challenges do you enjoy solving?',
    options: [
      {
        text: 'Complex programming and system architecture problems',
        categories: { technology: 5, analytical: 4, creativity: 2, management: 1, communication: 1 },
      },
      {
        text: 'Organizational and team coordination challenges',
        categories: { management: 5, communication: 4, analytical: 2, technology: 1, creativity: 1 },
      },
      {
        text: 'Creative design and user experience challenges',
        categories: { creativity: 5, communication: 3, technology: 2, analytical: 1, management: 1 },
      },
      {
        text: 'Data analysis and research-based problems',
        categories: { analytical: 5, technology: 3, management: 2, creativity: 1, communication: 2 },
      },
    ],
    category: 'general',
  },
  {
    question: 'How do you prefer to work with others?',
    options: [
      {
        text: 'Independently, with occasional code reviews',
        categories: { technology: 5, analytical: 3, creativity: 2, management: 1, communication: 1 },
      },
      {
        text: 'In teams, leading and coordinating efforts',
        categories: { management: 5, communication: 4, analytical: 2, technology: 1, creativity: 1 },
      },
      {
        text: 'Collaboratively on creative projects',
        categories: { creativity: 5, communication: 4, technology: 2, analytical: 1, management: 1 },
      },
      {
        text: 'In research groups, sharing data and insights',
        categories: { analytical: 5, communication: 3, technology: 2, management: 2, creativity: 1 },
      },
    ],
    category: 'general',
  },
  {
    question: 'What career growth path appeals to you most?',
    options: [
      {
        text: 'Technical expert and senior developer',
        categories: { technology: 5, analytical: 4, creativity: 2, management: 1, communication: 1 },
      },
      {
        text: 'Management and leadership roles',
        categories: { management: 5, communication: 4, analytical: 3, technology: 1, creativity: 1 },
      },
      {
        text: 'Creative director or design lead',
        categories: { creativity: 5, communication: 3, technology: 2, analytical: 1, management: 2 },
      },
      {
        text: 'Senior analyst or research specialist',
        categories: { analytical: 5, technology: 3, management: 2, creativity: 1, communication: 2 },
      },
    ],
    category: 'general',
  },
  {
    question: 'What tools do you enjoy working with?',
    options: [
      {
        text: 'Programming languages, IDEs, and development tools',
        categories: { technology: 5, analytical: 3, creativity: 2, management: 1, communication: 1 },
      },
      {
        text: 'Project management and collaboration tools',
        categories: { management: 4, communication: 5, analytical: 2, technology: 1, creativity: 1 },
      },
      {
        text: 'Design software and creative tools',
        categories: { creativity: 5, communication: 2, technology: 2, analytical: 1, management: 1 },
      },
      {
        text: 'Data analysis and visualization tools',
        categories: { analytical: 5, technology: 3, management: 2, creativity: 1, communication: 1 },
      },
    ],
    category: 'general',
  },
  {
    question: 'What kind of work environment suits you best?',
    options: [
      {
        text: 'Tech startup or software company',
        categories: { technology: 5, analytical: 3, creativity: 2, management: 1, communication: 1 },
      },
      {
        text: 'Corporate or consulting firm',
        categories: { management: 4, communication: 5, analytical: 3, technology: 1, creativity: 1 },
      },
      {
        text: 'Creative agency or design studio',
        categories: { creativity: 5, communication: 3, technology: 2, analytical: 1, management: 1 },
      },
      {
        text: 'Research institution or analytics firm',
        categories: { analytical: 5, technology: 3, management: 2, creativity: 1, communication: 2 },
      },
    ],
    category: 'general',
  },
  {
    question: 'How important is continuous learning to you?',
    options: [
      {
        text: 'Very important - I love learning new technologies',
        categories: { technology: 5, analytical: 3, creativity: 2, management: 1, communication: 1 },
      },
      {
        text: 'Important - I enjoy learning leadership and business skills',
        categories: { management: 4, communication: 5, analytical: 2, technology: 1, creativity: 1 },
      },
      {
        text: 'Important - I like exploring new creative techniques',
        categories: { creativity: 5, analytical: 2, communication: 2, technology: 2, management: 1 },
      },
      {
        text: 'Very important - I enjoy learning new analytical methods',
        categories: { analytical: 5, technology: 3, management: 2, creativity: 1, communication: 1 },
      },
    ],
    category: 'general',
  },
  {
    question: 'What role do you prefer in group projects?',
    options: [
      {
        text: 'Technical lead or developer',
        categories: { technology: 5, analytical: 3, creativity: 2, management: 1, communication: 1 },
      },
      {
        text: 'Project manager or team coordinator',
        categories: { management: 5, communication: 4, analytical: 2, technology: 1, creativity: 1 },
      },
      {
        text: 'Designer or creative contributor',
        categories: { creativity: 5, communication: 3, technology: 2, analytical: 1, management: 1 },
      },
      {
        text: 'Researcher or data analyst',
        categories: { analytical: 5, technology: 3, management: 2, creativity: 1, communication: 2 },
      },
    ],
    category: 'general',
  },
];

const sampleCareers = [
  {
    title: 'Software Developer',
    description: 'Software developers design, develop, and maintain software applications. They work on various platforms including web, mobile, and desktop applications.',
    requiredSkills: ['Programming Languages (JavaScript, Python, Java)', 'Problem Solving', 'Version Control (Git)', 'Software Development Lifecycle', 'Database Management'],
    roadmap: {
      education: 'Bachelor\'s degree in Computer Science or related field',
      skills: 'Learn programming languages, data structures, algorithms, and software design patterns',
      certifications: 'AWS Certified Developer, Google Cloud Professional Developer, Microsoft Certified: Azure Developer',
      internship: 'Complete internships at tech companies to gain real-world experience',
      job: 'Start as Junior Developer, progress to Senior Developer, then Lead Developer or Architect',
    },
    salaryRange: {
      min: 500000,
      max: 2500000,
      currency: 'INR',
    },
    growthOpportunities: 'High demand with 22% growth expected. Opportunities in AI, cloud computing, and mobile development.',
    category: 'technology',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
    videos: [
      {
        title: 'How to Become a Software Developer',
        url: 'https://www.youtube.com/watch?v=zOjov-2OZ0E',
        description: 'Complete guide to becoming a software developer',
      },
      {
        title: 'Software Development Career Path',
        url: 'https://www.youtube.com/watch?v=0KQyyBwB8vE',
        description: 'Understanding the software development career journey',
      },
    ],
    resources: [
      {
        title: 'FreeCodeCamp - Full Stack Development',
        url: 'https://www.freecodecamp.org',
        type: 'course',
        description: 'Free comprehensive coding bootcamp',
      },
      {
        title: 'The Pragmatic Programmer',
        url: 'https://www.amazon.com/Pragmatic-Programmer-journey-mastery-Anniversary/dp/0135957052',
        type: 'book',
        description: 'Essential book for software developers',
      },
      {
        title: 'Stack Overflow',
        url: 'https://stackoverflow.com',
        type: 'website',
        description: 'Q&A platform for developers',
      },
    ],
    notes: 'Software development is a rapidly growing field with excellent career prospects. Focus on building projects, contributing to open source, and continuous learning.',
  },
  {
    title: 'Data Analyst',
    description: 'Data analysts collect, process, and perform statistical analyses on large datasets. They help organizations make data-driven decisions.',
    requiredSkills: ['SQL', 'Python/R', 'Data Visualization', 'Statistical Analysis', 'Excel', 'Business Intelligence Tools'],
    roadmap: {
      education: 'Bachelor\'s degree in Statistics, Mathematics, Computer Science, or Business',
      skills: 'Master SQL, Python/R, data visualization tools (Tableau, Power BI), and statistical methods',
      certifications: 'Google Data Analytics Certificate, Microsoft Certified: Data Analyst Associate, IBM Data Science Professional Certificate',
      internship: 'Intern at companies with data teams to work on real analytics projects',
      job: 'Start as Junior Data Analyst, advance to Senior Analyst, then Data Scientist or Analytics Manager',
    },
    salaryRange: {
      min: 450000,
      max: 1500000,
      currency: 'INR',
    },
    growthOpportunities: 'Strong growth with 25% increase expected. Growing demand in healthcare, finance, and e-commerce sectors.',
    category: 'analytical',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    videos: [
      {
        title: 'Data Analyst Career Guide',
        url: 'https://www.youtube.com/watch?v=5NgNicANyqM',
        description: 'Complete overview of data analyst career',
      },
      {
        title: 'Data Analysis with Python',
        url: 'https://www.youtube.com/watch?v=r-uOLxNrNk8',
        description: 'Learn data analysis skills',
      },
    ],
    resources: [
      {
        title: 'Kaggle Learn',
        url: 'https://www.kaggle.com/learn',
        type: 'course',
        description: 'Free data science courses',
      },
      {
        title: 'Data Science Handbook',
        url: 'https://jakevdp.github.io/PythonDataScienceHandbook/',
        type: 'book',
        description: 'Comprehensive data science guide',
      },
      {
        title: 'Tableau Public',
        url: 'https://public.tableau.com',
        type: 'website',
        description: 'Data visualization platform',
      },
    ],
    notes: 'Data analysis skills are in high demand across all industries. Master SQL, Python, and visualization tools to excel in this field.',
  },
  {
    title: 'Project Manager',
    description: 'Project managers plan, execute, and oversee projects from start to finish. They coordinate teams, manage resources, and ensure projects meet deadlines and budgets.',
    requiredSkills: ['Leadership', 'Communication', 'Risk Management', 'Agile/Scrum', 'Budget Management', 'Stakeholder Management'],
    roadmap: {
      education: 'Bachelor\'s degree in Business, Management, or related field. MBA preferred for senior roles',
      skills: 'Develop leadership skills, learn project management methodologies (PMP, Agile, Scrum)',
      certifications: 'PMP (Project Management Professional), Certified ScrumMaster (CSM), PRINCE2',
      internship: 'Gain experience through project coordinator or assistant roles',
      job: 'Start as Project Coordinator, become Project Manager, then Senior PM or Program Manager',
    },
    salaryRange: {
      min: 600000,
      max: 2000000,
      currency: 'INR',
    },
    growthOpportunities: 'Steady growth with opportunities in IT, construction, healthcare, and consulting industries.',
    category: 'management',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800',
    videos: [
      {
        title: 'Project Management Career Path',
        url: 'https://www.youtube.com/watch?v=YQ2Wi3Jh3X0',
        description: 'Understanding project management careers',
      },
      {
        title: 'Agile Project Management',
        url: 'https://www.youtube.com/watch?v=Z9QbYZh1YXY',
        description: 'Learn agile methodologies',
      },
    ],
    resources: [
      {
        title: 'PMI - Project Management Institute',
        url: 'https://www.pmi.org',
        type: 'website',
        description: 'Professional project management resources',
      },
      {
        title: 'The Lean Startup',
        url: 'https://www.amazon.com/Lean-Startup-Entrepreneurs-Continuous-Innovation/dp/0307887898',
        type: 'book',
        description: 'Essential reading for project managers',
      },
      {
        title: 'Coursera - Project Management',
        url: 'https://www.coursera.org/professional-certificates/google-project-management',
        type: 'course',
        description: 'Google Project Management Certificate',
      },
    ],
    notes: 'Project management requires strong leadership and communication skills. Consider getting PMP certification for better career prospects.',
  },
  {
    title: 'UX/UI Designer',
    description: 'UX/UI designers create user-friendly interfaces and experiences for digital products. They focus on usability, aesthetics, and user satisfaction.',
    requiredSkills: ['Design Tools (Figma, Adobe XD)', 'User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'Usability Testing'],
    roadmap: {
      education: 'Bachelor\'s degree in Design, Human-Computer Interaction, or related field',
      skills: 'Master design tools, learn user research methods, understand design principles and psychology',
      certifications: 'Google UX Design Certificate, Adobe Certified Expert, Nielsen Norman Group UX Certification',
      internship: 'Work on design projects at startups or design agencies',
      job: 'Start as Junior Designer, progress to Senior Designer, then Lead Designer or Design Manager',
    },
    salaryRange: {
      min: 500000,
      max: 1800000,
      currency: 'INR',
    },
    growthOpportunities: 'High demand with 13% growth. Growing need in tech companies, agencies, and product companies.',
    category: 'creativity',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    videos: [
      {
        title: 'UX/UI Design Career Guide',
        url: 'https://www.youtube.com/watch?v=llK4z7Vqo2E',
        description: 'Complete guide to UX/UI design career',
      },
      {
        title: 'Figma Tutorial for Beginners',
        url: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8',
        description: 'Learn Figma design tool',
      },
    ],
    resources: [
      {
        title: 'Google UX Design Certificate',
        url: 'https://www.coursera.org/professional-certificates/google-ux-design',
        type: 'course',
        description: 'Professional UX design certification',
      },
      {
        title: 'Don\'t Make Me Think',
        url: 'https://www.amazon.com/Dont-Make-Think-Revisited-Usability/dp/0321965515',
        type: 'book',
        description: 'Classic UX design book',
      },
      {
        title: 'Dribbble',
        url: 'https://dribbble.com',
        type: 'website',
        description: 'Design inspiration and portfolio platform',
      },
    ],
    notes: 'UX/UI design combines creativity with user psychology. Build a strong portfolio and stay updated with design trends.',
  },
  {
    title: 'Marketing Manager',
    description: 'Marketing managers develop and execute marketing strategies to promote products and services. They manage campaigns, analyze market trends, and coordinate with sales teams.',
    requiredSkills: ['Digital Marketing', 'Content Creation', 'Analytics', 'SEO/SEM', 'Social Media Management', 'Communication'],
    roadmap: {
      education: 'Bachelor\'s degree in Marketing, Business, or Communications. MBA beneficial',
      skills: 'Learn digital marketing tools, content creation, SEO, social media, and analytics platforms',
      certifications: 'Google Analytics Certification, HubSpot Content Marketing, Facebook Blueprint, Google Ads Certification',
      internship: 'Gain experience through marketing internships or entry-level marketing roles',
      job: 'Start as Marketing Coordinator, become Marketing Manager, then Senior Manager or Director of Marketing',
    },
    salaryRange: {
      min: 500000,
      max: 2000000,
      currency: 'INR',
    },
    growthOpportunities: 'Steady growth with increasing focus on digital marketing. Opportunities in various industries.',
    category: 'communication',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    videos: [
      {
        title: 'Digital Marketing Career Guide',
        url: 'https://www.youtube.com/watch?v=ZVuHLPl69mM',
        description: 'Understanding digital marketing careers',
      },
      {
        title: 'SEO Fundamentals',
        url: 'https://www.youtube.com/watch?v=xsVTqzratPs',
        description: 'Learn SEO basics',
      },
    ],
    resources: [
      {
        title: 'Google Digital Marketing Course',
        url: 'https://learndigital.withgoogle.com/digitalgarage',
        type: 'course',
        description: 'Free Google digital marketing course',
      },
      {
        title: 'Influence: The Psychology of Persuasion',
        url: 'https://www.amazon.com/Influence-Psychology-Persuasion-Robert-Cialdini/dp/006124189X',
        type: 'book',
        description: 'Understanding consumer psychology',
      },
      {
        title: 'HubSpot Academy',
        url: 'https://academy.hubspot.com',
        type: 'website',
        description: 'Free marketing and sales courses',
      },
    ],
    notes: 'Digital marketing is constantly evolving. Stay updated with latest trends, tools, and platforms. Analytics skills are crucial.',
  },
];

const seedData = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Wait a bit for connection to be ready
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Clear existing data
    await Question.deleteMany({});
    await Career.deleteMany({});

    // Insert questions
    const insertedQuestions = await Question.insertMany(sampleQuestions);
    console.log(`${insertedQuestions.length} questions inserted`);

    // Insert careers
    const insertedCareers = await Career.insertMany(sampleCareers);
    console.log(`${insertedCareers.length} careers inserted`);

    console.log('Data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run seeder
if (require.main === module) {
  seedData();
}

module.exports = { sampleQuestions, sampleCareers };
