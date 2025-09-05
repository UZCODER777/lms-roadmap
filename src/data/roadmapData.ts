import { Module } from '../types';

export const roadmapData: Module[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Web sahifalar yaratish va foydalanuvchi interfeysi bilan ishlash. Modern frontend texnologiyalarini o\'rganing.',
    completed: false,
    progress: 45,
    difficulty: 'Beginner',
    estimatedHours: 120,
    order: 1,
    topics: [
      {
        id: 'html-basics',
        title: 'HTML Asoslari',
        description: 'Web sahifalarning skeleti - HTML elementlari va strukturasi',
        completed: true,
        duration: '8 soat',
        order: 1,
        lessons: [
          {
            id: 'html-intro',
            title: 'HTML ga kirish',
            description: 'HTML nima va u qanday ishlaydi',
            content: 'HTML (HyperText Markup Language) web sahifalarni yaratish uchun standart markup tilidir.',
            duration: '45 daqiqa',
            completed: true,
            order: 1
          },
          {
            id: 'html-structure',
            title: 'HTML struktura',
            description: 'HTML hujjatining asosiy strukturasi',
            content: 'HTML hujjati DOCTYPE, html, head va body elementlaridan iborat.',
            duration: '1 soat',
            completed: true,
            order: 2
          },
          {
            id: 'html-elements',
            title: 'HTML elementlari',
            description: 'Turli xil HTML elementlari va ularning ishlatilishi',
            content: 'Headings, paragraphs, links, images va boshqa elementlar.',
            duration: '2 soat',
            completed: true,
            order: 3
          },
          {
            id: 'html-forms',
            title: 'HTML formalar',
            description: 'Foydalanuvchi ma\'lumotlarini yig\'ish uchun formalar',
            content: 'Input, textarea, select va boshqa form elementlari.',
            duration: '1.5 soat',
            completed: false,
            order: 4
          }
        ]
      },
      {
        id: 'css-styling',
        title: 'CSS Styling',
        description: 'Sahifalarni bezash va responsive design yaratish',
        completed: true,
        duration: '12 soat',
        order: 2,
        lessons: [
          {
            id: 'css-basics',
            title: 'CSS asoslari',
            description: 'CSS sintaksis va selektorlar',
            content: 'CSS (Cascading Style Sheets) web sahifalarni bezash uchun ishlatiladi.',
            duration: '1 soat',
            completed: true,
            order: 1
          },
          {
            id: 'css-layout',
            title: 'CSS Layout',
            description: 'Flexbox va Grid layout sistemlari',
            content: 'Modern CSS layout texnikalari bilan tanishing.',
            duration: '3 soat',
            completed: true,
            order: 2
          },
          {
            id: 'css-responsive',
            title: 'Responsive Design',
            description: 'Turli qurilmalar uchun moslashuvchan dizayn',
            content: 'Media queries va responsive design printsiplari.',
            duration: '2.5 soat',
            completed: true,
            order: 3
          }
        ]
      },
      {
        id: 'javascript-fundamentals',
        title: 'JavaScript Asoslari',
        description: 'Dinamik web sahifalar uchun dasturlash tili',
        completed: false,
        duration: '20 soat',
        order: 3,
        lessons: [
          {
            id: 'js-variables',
            title: 'O\'zgaruvchilar va ma\'lumot turlari',
            description: 'JavaScript da o\'zgaruvchilar bilan ishlash',
            content: 'var, let, const va turli ma\'lumot turlari.',
            duration: '2 soat',
            completed: true,
            order: 1
          },
          {
            id: 'js-functions',
            title: 'Funksiyalar',
            description: 'JavaScript funksiyalari va ularning turlari',
            content: 'Function declaration, expression va arrow functions.',
            duration: '3 soat',
            completed: false,
            order: 2
          },
          {
            id: 'js-dom',
            title: 'DOM manipulatsiyasi',
            description: 'HTML elementlari bilan JavaScript orqali ishlash',
            content: 'DOM elementlarini tanlash va o\'zgartirish.',
            duration: '4 soat',
            completed: false,
            order: 3
          }
        ]
      },
      {
        id: 'react-framework',
        title: 'React Framework',
        description: 'Modern UI komponentlar yaratish',
        completed: false,
        duration: '25 soat',
        order: 4,
        lessons: [
          {
            id: 'react-intro',
            title: 'React ga kirish',
            description: 'React nima va u qanday ishlaydi',
            content: 'React - bu Facebook tomonidan yaratilgan JavaScript kutubxonasi.',
            duration: '2 soat',
            completed: false,
            order: 1
          },
          {
            id: 'react-components',
            title: 'React komponentlari',
            description: 'Funksional va klass komponentlari',
            content: 'React komponentlarini yaratish va ishlatish.',
            duration: '4 soat',
            completed: false,
            order: 2
          }
        ]
      }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Server tomonidagi dasturlash va ma\'lumotlar bilan ishlash. API yaratish va ma\'lumotlar bazasi bilan ishlash.',
    completed: false,
    progress: 25,
    difficulty: 'Intermediate',
    estimatedHours: 150,
    order: 2,
    topics: [
      {
        id: 'nodejs-basics',
        title: 'Node.js Asoslari',
        description: 'Server-side JavaScript dasturlash muhiti',
        completed: true,
        duration: '15 soat',
        order: 1,
        lessons: [
          {
            id: 'nodejs-intro',
            title: 'Node.js ga kirish',
            description: 'Node.js nima va u qanday o\'rnatiladi',
            content: 'Node.js - bu JavaScript runtime muhiti.',
            duration: '1.5 soat',
            completed: true,
            order: 1
          },
          {
            id: 'nodejs-modules',
            title: 'Node.js modullari',
            description: 'Built-in va npm modullari bilan ishlash',
            content: 'require, module.exports va npm package manager.',
            duration: '3 soat',
            completed: true,
            order: 2
          }
        ]
      },
      {
        id: 'express-framework',
        title: 'Express.js Framework',
        description: 'Web ilovalar uchun framework',
        completed: false,
        duration: '18 soat',
        order: 2,
        lessons: [
          {
            id: 'express-setup',
            title: 'Express o\'rnatish va sozlash',
            description: 'Express loyihasini boshlash',
            content: 'Express.js web framework bilan tanishing.',
            duration: '2 soat',
            completed: false,
            order: 1
          },
          {
            id: 'express-routing',
            title: 'Express routing',
            description: 'URL yo\'nalishlarini boshqarish',
            content: 'GET, POST, PUT, DELETE so\'rovlarini boshqarish.',
            duration: '3 soat',
            completed: false,
            order: 2
          }
        ]
      },
      {
        id: 'database-management',
        title: 'Ma\'lumotlar Bazasi',
        description: 'SQL va NoSQL ma\'lumotlar bazalari bilan ishlash',
        completed: false,
        duration: '20 soat',
        order: 3,
        lessons: [
          {
            id: 'sql-basics',
            title: 'SQL asoslari',
            description: 'Ma\'lumotlar bazasi so\'rovlari',
            content: 'SELECT, INSERT, UPDATE, DELETE so\'rovlari.',
            duration: '4 soat',
            completed: false,
            order: 1
          },
          {
            id: 'mongodb-intro',
            title: 'MongoDB ga kirish',
            description: 'NoSQL ma\'lumotlar bazasi',
            content: 'MongoDB bilan ishlash asoslari.',
            duration: '3 soat',
            completed: false,
            order: 2
          }
        ]
      }
    ]
  },
  {
    id: 'devtools',
    title: 'Development Tools',
    description: 'Dasturlash jarayonini yengillashtiruvchi vositalar. Version control, testing va deployment.',
    completed: false,
    progress: 70,
    difficulty: 'Intermediate',
    estimatedHours: 80,
    order: 3,
    topics: [
      {
        id: 'git-version-control',
        title: 'Git Version Control',
        description: 'Kod versiyalarini boshqarish tizimi',
        completed: true,
        duration: '10 soat',
        order: 1,
        lessons: [
          {
            id: 'git-basics',
            title: 'Git asoslari',
            description: 'Git nima va u qanday ishlaydi',
            content: 'Git - bu distributed version control system.',
            duration: '2 soat',
            completed: true,
            order: 1
          },
          {
            id: 'git-commands',
            title: 'Git buyruqlari',
            description: 'Asosiy Git buyruqlari',
            content: 'add, commit, push, pull va boshqa buyruqlar.',
            duration: '3 soat',
            completed: true,
            order: 2
          }
        ]
      },
      {
        id: 'docker-containerization',
        title: 'Docker Containerization',
        description: 'Containerization va deployment',
        completed: true,
        duration: '12 soat',
        order: 2,
        lessons: [
          {
            id: 'docker-intro',
            title: 'Docker ga kirish',
            description: 'Containerization nima',
            content: 'Docker bilan ilovalarni containerlashtirish.',
            duration: '2.5 soat',
            completed: true,
            order: 1
          },
          {
            id: 'dockerfile',
            title: 'Dockerfile yaratish',
            description: 'Custom Docker image yaratish',
            content: 'Dockerfile yozish va image build qilish.',
            duration: '3 soat',
            completed: true,
            order: 2
          }
        ]
      },
      {
        id: 'testing-debugging',
        title: 'Testing va Debugging',
        description: 'Avtomatik test yozish va debugging',
        completed: false,
        duration: '15 soat',
        order: 3,
        lessons: [
          {
            id: 'unit-testing',
            title: 'Unit Testing',
            description: 'Birlik testlari yozish',
            content: 'Jest va boshqa testing framework lari.',
            duration: '4 soat',
            completed: false,
            order: 1
          },
          {
            id: 'debugging-techniques',
            title: 'Debugging texnikalari',
            description: 'Xatolarni topish va tuzatish',
            content: 'Browser DevTools va debugging strategiyalari.',
            duration: '3 soat',
            completed: false,
            order: 2
          }
        ]
      }
    ]
  },
  {
    id: 'advanced-topics',
    title: 'Advanced Topics',
    description: 'Ilg\'or mavzular va zamonaviy texnologiyalar. Microservices, Cloud Computing va DevOps.',
    completed: false,
    progress: 10,
    difficulty: 'Advanced',
    estimatedHours: 200,
    order: 4,
    topics: [
      {
        id: 'microservices',
        title: 'Microservices Architecture',
        description: 'Mikroservis arxitekturasi va pattern lari',
        completed: false,
        duration: '25 soat',
        order: 1,
        lessons: [
          {
            id: 'microservices-intro',
            title: 'Microservices ga kirish',
            description: 'Mikroservis arxitekturasi nima',
            content: 'Monolith vs Microservices arxitekturasi.',
            duration: '3 soat',
            completed: false,
            order: 1
          }
        ]
      },
      {
        id: 'cloud-computing',
        title: 'Cloud Computing',
        description: 'AWS, Azure, Google Cloud platformalari',
        completed: false,
        duration: '30 soat',
        order: 2,
        lessons: [
          {
            id: 'aws-basics',
            title: 'AWS asoslari',
            description: 'Amazon Web Services bilan tanishuv',
            content: 'EC2, S3, RDS va boshqa AWS xizmatlari.',
            duration: '4 soat',
            completed: false,
            order: 1
          }
        ]
      }
    ]
  }
];