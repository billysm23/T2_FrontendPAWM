export const lessons = [
    {
        _id: '1',
        title: 'Introduction to Computational Thinking',
        description: 'Learn the fundamentals of computational thinking and its key concepts.',
        duration: '30 minutes',
        practiceTime: '1-2 hours',
        level: 'Beginner',
        sections: 4,
        
        // Overview Section
        learningObjectives: [
            'Understand the core concepts of computational thinking',
            'Learn how to break down complex problems',
            'Identify patterns in problem-solving scenarios',
            'Apply computational thinking to real-world situations'
        ],

        prerequisites: [
            'Basic problem-solving skills',
            'No programming experience required',
            'Basic math knowledge (arithmetic and logic)'
        ],

        topics: [
            {
                title: 'Decomposition',
                description: 'Breaking down complex problems into smaller parts',
                icon: '🔍'
            },
            {
                title: 'Pattern Recognition',
                description: 'Identifying similarities and trends in problems',
                icon: '🎯'
            },
            {
                title: 'Abstraction',
                description: 'Focusing on important information while ignoring irrelevant details',
                icon: '💡'
            },
            {
                title: 'Algorithm Design',
                description: 'Creating step-by-step solutions to problems',
                icon: '📝'
            }
        ],

        // Content Section
        content: `
            <div class="section">
                <h2>What is Computational Thinking?</h2>
                <p>Computational Thinking (CT) is a problem-solving process that includes a number of characteristics and dispositions. CT is essential to the development of computer applications, but it can also be used to support problem solving across all disciplines, including math, science, and the humanities.</p>
            </div>

            <div class="section">
                <h2>Core Components</h2>
                <p>Computational thinking consists of four key components that work together to solve complex problems.</p>
            </div>
        `,

        keyConcepts: [
            {
                title: 'Decomposition',
                description: 'Breaking down complex problems into smaller, manageable parts.',
                example: 'Making a sandwich:\n1. Gather ingredients\n2. Prepare bread\n3. Add condiments\n4. Layer ingredients\n5. Close sandwich'
            },
            {
                title: 'Pattern Recognition',
                description: 'Finding similarities or patterns in problems that can help solve them more efficiently.',
                example: 'Weather patterns:\nIdentifying that it often rains after specific cloud formations appear'
            },
            {
                title: 'Abstraction',
                description: 'Focusing on important information and filtering out unnecessary details.',
                example: 'Using a map:\nShowing roads and cities while omitting terrain details for navigation purposes'
            },
            {
                title: 'Algorithm Design',
                description: 'Creating a series of ordered steps to solve a problem.',
                example: 'Morning routine:\n1. Wake up\n2. Brush teeth\n3. Take shower\n4. Get dressed\n5. Eat breakfast'
            }
        ],

        interactiveExamples: [
            {
                title: 'Pattern Recognition Game',
                description: 'Identify patterns in sequences of numbers and shapes',
                type: 'game'
            },
            {
                title: 'Decomposition Exercise',
                description: 'Break down a complex task into smaller steps',
                type: 'exercise'
            }
        ],

        practiceProblems: [
            {
                title: 'Daily Routine Analysis',
                description: 'Break down your morning routine into its smallest steps.',
                hint: 'Think about every single action you take from waking up to leaving your house.'
            },
            {
                title: 'Pattern Finding',
                description: 'Identify patterns in daily weather changes over a month.',
                hint: 'Look for relationships between temperature, humidity, and cloud coverage.'
            }
        ],

        // Resources Section
        additionalReading: [
            {
                title: 'Computational Thinking: A Digital Age Skill for Everyone',
                description: 'An in-depth look at why CT is important in modern education',
                url: 'https://example.com/ct-education',
                type: 'article'
            },
            {
                title: 'Problem Solving with Computational Thinking',
                description: 'Practical examples of CT in everyday life',
                url: 'https://example.com/ct-practical',
                type: 'guide'
            }
        ],

        videos: [
            {
                title: 'Introduction to Computational Thinking',
                url: 'https://example.com/video1',
                duration: '10:30',
                thumbnail: '/thumbnails/video1.jpg'
            },
            {
                title: 'Real-world Applications of CT',
                url: 'https://example.com/video2',
                duration: '15:45',
                thumbnail: '/thumbnails/video2.jpg'
            }
        ],

        documents: [
            {
                title: 'CT Concepts Cheatsheet',
                description: 'Quick reference guide for all CT concepts',
                url: '/documents/ct-cheatsheet.pdf',
                size: '1.2 MB'
            },
            {
                title: 'Practice Exercises Workbook',
                description: 'Collection of exercises to practice CT',
                url: '/documents/ct-workbook.pdf',
                size: '2.8 MB'
            }
        ],

        externalLinks: [
            {
                title: 'CS Unplugged',
                description: 'Free learning activities for CT without computers',
                url: 'https://csunplugged.org'
            },
            {
                title: 'MIT Scratch',
                description: 'Visual programming environment to practice CT',
                url: 'https://scratch.mit.edu'
            }
        ]
    },
    {
        _id: '2',
        title: 'Problem-Solving Strategies',
        description: 'Explore various problem-solving strategies and techniques used in computational thinking.',
        duration: '45 minutes',
        practiceTime: '2-3 hours',
        level: 'Intermediate',
        sections: 4,

        learningObjectives: [
            'Master different problem-solving approaches',
            'Learn to choose the right strategy for different problems',
            'Practice applying various problem-solving techniques',
            'Develop systematic thinking skills'
        ],

        prerequisites: [
            'Introduction to Computational Thinking',
            'Basic logical thinking skills',
            'Understanding of basic problem analysis'
        ],

        topics: [
            {
                title: 'Problem Analysis',
                description: 'Techniques for understanding and defining problems',
                icon: '🔎'
            },
            {
                title: 'Solution Design',
                description: 'Approaches to designing effective solutions',
                icon: '✏️'
            },
            {
                title: 'Strategy Selection',
                description: 'Choosing the right approach for different problems',
                icon: '🎯'
            },
            {
                title: 'Solution Evaluation',
                description: 'Methods for testing and improving solutions',
                icon: '⚖️'
            }
        ],

        content: `
            <div class="section">
                <h2>Understanding Problem-Solving Strategies</h2>
                <p>Problem-solving strategies are systematic approaches to tackle complex problems. These strategies help in organizing thoughts and approaching problems methodically.</p>
            </div>

            <div class="section">
                <h2>Common Problem-Solving Approaches</h2>
                <ul>
                    <li>Divide and Conquer</li>
                    <li>Working Backwards</li>
                    <li>Pattern Recognition</li>
                    <li>Simplification</li>
                </ul>
            </div>
        `,

        keyConcepts: [
            {
                title: 'Divide and Conquer',
                description: 'Breaking down a complex problem into smaller, manageable subproblems.',
                example: 'Sorting a large list:\n1. Split list in half\n2. Sort each half\n3. Merge sorted halves'
            },
            {
                title: 'Working Backwards',
                description: 'Starting from the desired result and working backwards to the initial state.',
                example: 'Maze solving:\nStart from the end point and find a path to the start'
            },
            {
                title: 'Pattern Recognition',
                description: 'Identifying recurring patterns that can simplify problem-solving.',
                example: 'Fibonacci sequence:\nEach number is the sum of the two preceding numbers'
            },
            {
                title: 'Solution Optimization',
                description: 'Improving solutions for better efficiency or effectiveness.',
                example: 'Route optimization:\nFinding shorter or faster paths between locations'
            }
        ],

        interactiveExamples: [
            {
                title: 'Strategy Selection Game',
                description: 'Practice choosing the best strategy for different scenarios',
                type: 'interactive'
            },
            {
                title: 'Problem Decomposition Tool',
                description: 'Interactive tool for breaking down complex problems',
                type: 'tool'
            }
        ],

        practiceProblems: [
            {
                title: 'Route Planning',
                description: 'Plan the most efficient route for delivering packages to multiple locations.',
                hint: 'Consider using maps and calculating different route combinations.'
            },
            {
                title: 'Resource Allocation',
                description: 'Distribute limited resources among multiple projects efficiently.',
                hint: 'Think about priorities and constraints for each project.'
            }
        ],

        additionalReading: [
            {
                title: 'Advanced Problem-Solving Techniques',
                description: 'Comprehensive guide to problem-solving methodologies',
                url: 'https://example.com/problem-solving',
                type: 'article'
            },
            {
                title: 'Case Studies in Problem Solving',
                description: 'Real-world examples of problem-solving strategies',
                url: 'https://example.com/case-studies',
                type: 'study'
            }
        ],

        videos: [
            {
                title: 'Problem-Solving Strategies Overview',
                url: 'https://example.com/strategies-video',
                duration: '12:45',
                thumbnail: '/thumbnails/strategies.jpg'
            },
            {
                title: 'Advanced Problem Analysis',
                url: 'https://example.com/analysis-video',
                duration: '18:20',
                thumbnail: '/thumbnails/analysis.jpg'
            }
        ],

        documents: [
            {
                title: 'Problem-Solving Handbook',
                description: 'Comprehensive guide to various strategies',
                url: '/documents/handbook.pdf',
                size: '2.4 MB'
            },
            {
                title: 'Strategy Selection Guide',
                description: 'How to choose the right problem-solving approach',
                url: '/documents/strategy-guide.pdf',
                size: '1.8 MB'
            }
        ],

        externalLinks: [
            {
                title: 'Problem-Solving Techniques',
                description: 'Interactive learning platform for problem-solving',
                url: 'https://example.com/techniques'
            },
            {
                title: 'Strategy Practice Tools',
                description: 'Online tools for practicing different strategies',
                url: 'https://example.com/practice'
            }
        ]
    },

    {
        _id: '3',
        title: 'Algorithms and Data Structures',
        description: 'Understand the importance of algorithms and data structures in computational thinking.',
        duration: '60 minutes',
        practiceTime: '3-4 hours',
        level: 'Advanced',
        sections: 5,

        learningObjectives: [
            'Understand fundamental algorithms and their applications',
            'Learn common data structures and their uses',
            'Analyze algorithm efficiency and complexity',
            'Practice implementing basic algorithms'
        ],

        prerequisites: [
            'Problem-Solving Strategies',
            'Basic programming concepts',
            'Understanding of mathematical notation'
        ],

        topics: [
            {
                title: 'Basic Algorithms',
                description: 'Understanding fundamental algorithmic concepts',
                icon: '🔄'
            },
            {
                title: 'Data Structures',
                description: 'Learning about different ways to organize data',
                icon: '📊'
            },
            {
                title: 'Algorithm Analysis',
                description: 'Evaluating algorithm efficiency and complexity',
                icon: '📈'
            },
            {
                title: 'Implementation',
                description: 'Putting algorithms into practice',
                icon: '⚙️'
            }
        ],

        content: `
            <div class="section">
                <h2>Introduction to Algorithms</h2>
                <p>An algorithm is a step-by-step procedure for solving a problem. Understanding algorithms is crucial for efficient problem-solving and program development.</p>
            </div>

            <div class="section">
                <h2>Common Data Structures</h2>
                <ul>
                    <li>Arrays and Lists</li>
                    <li>Stacks and Queues</li>
                    <li>Trees and Graphs</li>
                    <li>Hash Tables</li>
                </ul>
            </div>
        `,

        keyConcepts: [
            {
                title: 'Algorithm Design',
                description: 'Creating efficient step-by-step solutions to problems.',
                example: 'Binary Search Algorithm:\n1. Find middle element\n2. Compare with target\n3. Eliminate half of remaining elements\n4. Repeat until found'
            },
            {
                title: 'Data Structure Selection',
                description: 'Choosing appropriate data structures for different scenarios.',
                example: 'Using a queue for a print spooler:\nFirst document in is first to print'
            },
            {
                title: 'Complexity Analysis',
                description: 'Evaluating algorithm performance and efficiency.',
                example: 'Big O Notation:\nO(n) - linear time\nO(log n) - logarithmic time'
            },
            {
                title: 'Optimization Techniques',
                description: 'Methods for improving algorithm efficiency.',
                example: 'Space-time tradeoffs:\nCaching results vs. recalculating'
            }
        ],

        interactiveExamples: [
            {
                title: 'Sorting Visualizer',
                description: 'Interactive visualization of different sorting algorithms',
                type: 'visualization'
            },
            {
                title: 'Data Structure Explorer',
                description: 'Interactive tool to explore different data structures',
                type: 'explorer'
            }
        ],

        practiceProblems: [
            {
                title: 'Array Manipulation',
                description: 'Implement basic array operations and algorithms.',
                hint: 'Start with simple operations like insertion and deletion.'
            },
            {
                title: 'Search Implementation',
                description: 'Implement binary search algorithm.',
                hint: 'Remember to handle edge cases and sorted input.'
            }
        ],

        additionalReading: [
            {
                title: 'Introduction to Algorithms',
                description: 'Comprehensive guide to algorithm design and analysis',
                url: 'https://example.com/algorithms',
                type: 'textbook'
            },
            {
                title: 'Data Structures Explained',
                description: 'Visual guide to common data structures',
                url: 'https://example.com/data-structures',
                type: 'guide'
            }
        ],

        videos: [
            {
                title: 'Algorithm Basics',
                url: 'https://example.com/algo-basics',
                duration: '15:30',
                thumbnail: '/thumbnails/algo-basics.jpg'
            },
            {
                title: 'Data Structures Overview',
                url: 'https://example.com/ds-overview',
                duration: '20:15',
                thumbnail: '/thumbnails/ds-overview.jpg'
            }
        ],

        documents: [
            {
                title: 'Algorithm Cheat Sheet',
                description: 'Quick reference for common algorithms',
                url: '/documents/algo-cheatsheet.pdf',
                size: '1.5 MB'
            },
            {
                title: 'Data Structures Guide',
                description: 'Comprehensive guide to data structures',
                url: '/documents/ds-guide.pdf',
                size: '2.2 MB'
            }
        ],

        externalLinks: [
            {
                title: 'Algorithm Visualizations',
                description: 'Interactive platform for visualizing algorithms',
                url: 'https://visualgo.net'
            },
            {
                title: 'Coding Practice Platform',
                description: 'Platform for practicing algorithm implementation',
                url: 'https://leetcode.com'
            }
        ]
    },

    {
        _id: '4',
        title: 'Introduction to Programming',
        description: 'Get started with the basics of programming and learn how to write simple programs.',
        duration: '45 minutes',
        practiceTime: '2-3 hours',
        level: 'Beginner',
        sections: 5,
    
        // Overview Section
        learningObjectives: [
            'Understand basic programming concepts and terminology',
            'Learn fundamental programming constructs',
            'Write simple programs to solve basic problems',
            'Understand program flow and execution'
        ],
    
        prerequisites: [
            'Basic computer skills',
            'Understanding of basic mathematics',
            'Problem-solving fundamentals',
            'Computational thinking basics'
        ],
    
        topics: [
            {
                title: 'Programming Basics',
                description: 'Core concepts of programming and coding',
                icon: '💻'
            },
            {
                title: 'Data Types & Variables',
                description: 'Understanding different types of data and how to store them',
                icon: '📦'
            },
            {
                title: 'Control Structures',
                description: 'Learning about program flow and decision making',
                icon: '🔄'
            },
            {
                title: 'Functions',
                description: 'Creating reusable blocks of code',
                icon: '🧩'
            }
        ],
    
        // Content Section
        content: `
            <div class="section">
                <h2>What is Programming?</h2>
                <p>Programming is the process of creating a set of instructions that tell a computer how to perform a task. It involves writing code in a programming language to solve problems and automate tasks.</p>
            </div>
    
            <div class="section">
                <h2>Core Programming Concepts</h2>
                <p>Let's explore the fundamental building blocks of programming:</p>
                <ul>
                    <li><strong>Variables:</strong> Named containers for storing data values</li>
                    <li><strong>Data Types:</strong> Different kinds of data (numbers, text, etc.)</li>
                    <li><strong>Operators:</strong> Symbols that perform operations on data</li>
                    <li><strong>Control Structures:</strong> Ways to control program flow</li>
                    <li><strong>Functions:</strong> Reusable blocks of code</li>
                </ul>
            </div>
        `,
    
        keyConcepts: [
            {
                title: 'Variables and Data Types',
                description: 'Understanding how to store and manipulate different types of data.',
                example: `# Python examples
                            age = 25           # Integer
                            name = "John"      # String
                            price = 19.99      # Float
                            is_student = True  # Boolean`
            },
            {
                title: 'Control Structures',
                description: 'Making decisions and repeating actions in programs.',
                example: `# If statement
                            if age >= 18:
                                print("Adult")
                            else:
                                print("Minor")
                            
                            # For loop
                            for i in range(5):
                                print(i)`
            },
            {
                title: 'Functions',
                description: 'Creating reusable blocks of code to perform specific tasks.',
                example:    `def calculate_area(length, width):
                                return length * width
                            
                            # Using the function
                            area = calculate_area(5, 3)
                            print(f"Area: {area}")`
            },
            {
                title: 'Input/Output',
                description: 'Interacting with users and displaying results.',
                example: `# Getting user input
                            name = input("Enter your name: ")
                            
                            # Displaying output
                            print(f"Hello, {name}!")`
            }
        ],
    
        interactiveExamples: [
            {
                title: 'Variable Explorer',
                description: 'Interactive tool to understand variables and data types',
                type: 'interactive'
            },
            {
                title: 'Code Editor',
                description: 'Simple editor to write and run basic programs',
                type: 'editor'
            }
        ],
    
        practiceProblems: [
            {
                title: 'Temperature Converter',
                description: 'Write a program to convert temperatures between Celsius and Fahrenheit.',
                hint: 'Use the formula: F = (C × 9/5) + 32'
            },
            {
                title: 'Number Calculator',
                description: 'Create a basic calculator that can add, subtract, multiply, and divide two numbers.',
                hint: 'Start by getting two numbers from the user and the desired operation'
            }
        ],
    
        // Resources Section
        additionalReading: [
            {
                title: 'Getting Started with Python',
                description: 'Comprehensive guide for beginners in Python programming',
                url: 'https://example.com/python-basics',
                type: 'guide'
            },
            {
                title: 'Programming Fundamentals',
                description: 'Essential concepts for new programmers',
                url: 'https://example.com/programming-basics',
                type: 'article'
            }
        ],
    
        videos: [
            {
                title: 'Introduction to Programming Concepts',
                url: 'https://example.com/intro-programming',
                duration: '15:20',
                thumbnail: '/thumbnails/intro-prog.jpg'
            },
            {
                title: 'Writing Your First Program',
                url: 'https://example.com/first-program',
                duration: '12:45',
                thumbnail: '/thumbnails/first-prog.jpg'
            }
        ],
    
        documents: [
            {
                title: 'Programming Cheat Sheet',
                description: 'Quick reference for basic programming concepts',
                url: '/documents/programming-cheatsheet.pdf',
                size: '1.8 MB'
            },
            {
                title: 'Practice Exercises',
                description: 'Collection of programming exercises for beginners',
                url: '/documents/programming-exercises.pdf',
                size: '2.5 MB'
            }
        ],
    
        externalLinks: [
            {
                title: 'Python Official Documentation',
                description: 'Comprehensive Python programming documentation',
                url: 'https://docs.python.org/3/'
            },
            {
                title: 'Online Python Editor',
                description: 'Web-based environment for writing and testing Python code',
                url: 'https://replit.com'
            }
        ]
    }
];