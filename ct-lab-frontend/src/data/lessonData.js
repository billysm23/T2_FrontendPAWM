export const lessons = [
    {
        _id: '1',
        title: 'Introduction to Computational Thinking',
        description: 'Learn the fundamentals of computational thinking and its key concepts.',
        content: `
            <p>Computational Thinking (CT) is a problem-solving process that involves various techniques commonly used by computer scientists. It is essential not only for programming but also for solving complex real-world problems in any domain.</p>
            <section class="content_section">
                <h2>Key Concepts of Computational Thinking:</h2>
                <div class="concept_grid">
                    <div class="concept_item">
                        <h3>1. Decomposition</h3>
                        <p>Breaking down a complex problem into smaller, manageable parts. By simplifying the problem, each part can be addressed individually.</p>
                    </div>
                    <div class="concept_item">
                        <h3>2. Pattern Recognition</h3>
                        <p>Looking for similarities or trends in data or processes. Identifying patterns helps predict future events and simplifies problem-solving.</p>
                    </div>
                    <div class="concept_item">
                        <h3>3. Abstraction</h3>
                        <p>Focusing on the essential information only and ignoring irrelevant details. This helps to generalize and find a solution that works for multiple situations.</p>
                    </div>
                    <div class="concept_item">
                        <h3>4. Algorithm Design</h3>
                        <p>Creating a step-by-step process for solving a problem. Algorithms are precise instructions that guide how tasks are carried out.</p>
                    </div>
                </div>
            </section>

            <section class="content_section">
                <h2>Example of Applying Computational Thinking:</h2>
                <p>Imagine you are tasked with creating a recipe for baking a cake.</p>
                <div class="example_steps">
                    <p>1. Decomposition (break down the process into smaller tasks): mixing ingredients, preheating the oven, baking, etc.</p>
                    <p>2. Pattern Recognition (notice that many cakes follow a similar structure): flour, eggs, sugar, butter. This pattern helps in forming the base of your recipe.</p>
                    <p>3. Abstraction: focus on what is necessary for a cake, ignoring irrelevant details like the color of the bowl used to mix ingredients.</p>
                    <p>4. Algorithm Design: write down the steps for your cake recipe in a specific order so anyone can follow it to bake a cake.</p>
                </div>
            </section>
        `
    },
    {
        _id: '2',
        title: 'Problem-Solving Strategies',
        description: 'Explore various problem-solving strategies and techniques used in computational thinking.',
        content: `
            <p>Problem-solving is at the core of computational thinking. Let's explore some effective strategies and techniques to tackle problems:</p>
            <section class="content_section">
                <h2>Problem-Solving Strategies:</h2>
                <div class="concept_grid">
                    <div class="concept_item">
                        <h3>1. Divide and Conquer</h3>
                        <p>Break down a complex problem into smaller, more manageable subproblems. Solve each subproblem independently and then combine the solutions to solve the original problem.</p>
                    </div>
                    <div class="concept_item">
                        <h3>2. Brute Force</h3>
                        <p>Try all possible solutions until you find the correct one. This strategy is straightforward but can be inefficient for large problems.</p>
                    </div>
                    <div class="concept_item">
                        <h3>3. Greedy Algorithms</h3>
                        <p>Make the locally optimal choice at each stage with the hope of finding a global optimum. Greedy algorithms make the best possible decision at each step without worrying about future consequences.</p>
                    </div>
                    <div class="concept_item">
                        <h3>4. Dynamic Programming</h3>
                        <p>Break down a complex problem into simpler subproblems and store the results to avoid redundant calculations. Dynamic programming is useful when subproblems overlap and have optimal substructure.</p>
                    </div>
                </div>
            </section>

            <section class="content_section">
                <h2>Example: Solving the Fibonacci Sequence</h2>
                <p>Let's consider the problem of finding the nth Fibonacci number.</p>
                <div class="example_steps">
                    <p>1. Divide and Conquer: Divide the problem into smaller subproblems by expressing the nth Fibonacci number in terms of the previous two Fibonacci numbers.</p>
                    <p>2. Brute Force: Calculate each Fibonacci number recursively by adding the previous two numbers until you reach the base cases (0 and 1).</p>
                    <p>3. Dynamic Programming: Store the calculated Fibonacci numbers in an array to avoid redundant calculations. Use the stored values to calculate subsequent Fibonacci numbers efficiently.</p>
                </div>
            </section>
        `
    },
    {
        _id: '3',
        title: 'Algorithms and Data Structures',
        description: 'Understand the importance of algorithms and data structures in computational thinking.',
        content: `
            <p>Algorithms and data structures are fundamental concepts in computational thinking. They provide a way to solve problems efficiently and organize data effectively.</p>
            <section class="content_section">
                <h2>Algorithms:</h2>
                <p>An algorithm is a step-by-step procedure for solving a problem or accomplishing a task. Algorithms have the following characteristics:</p>
                <ul>
                    <li>Precision: Each step must be clearly defined and unambiguous.</li>
                    <li>Determinism: The algorithm should produce the same output for the same input every time.</li>
                    <li>Finiteness: The algorithm should terminate after a finite number of steps.</li>
                    <li>Correctness: The algorithm should produce the correct output for every valid input.</li>
                </ul>
            </section>

            <section class="content_section">
                <h2>Data Structures:</h2>
                <p>Data structures are ways of organizing and storing data efficiently. Some commonly used data structures are:</p>
                <ul>
                    <li>Arrays: A collection of elements of the same data type, accessed by an index.</li>
                    <li>Linked Lists: A sequence of elements, each containing a reference to the next element.</li>
                    <li>Stacks: A last-in-first-out (LIFO) data structure with push and pop operations.</li>
                    <li>Queues: A first-in-first-out (FIFO) data structure with enqueue and dequeue operations.</li>
                    <li>Trees: A hierarchical data structure with nodes connected by edges.</li>
                    <li>Graphs: A collection of vertices (nodes) connected by edges.</li>
                </ul>
            </section>

            <section class="content_section">
                <h2>Example: Searching an Array</h2>
                <p>Let's consider the problem of searching for an element in an array.</p>
                <div class="example_steps">
                    <p>1. Linear Search: Iterate through each element of the array and compare it with the target element. This algorithm has a time complexity of O(n).</p>
                    <p>2. Binary Search (for sorted arrays): Divide the array into two halves and compare the target element with the middle element. If the target is smaller, search the left half; if it's larger, search the right half. Repeat this process until the element is found or the search space is exhausted. This algorithm has a time complexity of O(log n).</p>
                </div>
            </section>
        `
    },
    {
        _id: '4',
        title: 'Introduction to Programming',
        description: 'Get started with the basics of programming and learn how to write simple programs.',
        content: `
            <p>Programming is the process of creating instructions that tell a computer what to do. It involves writing code in a programming language to solve problems and automate tasks.</p>
            <section class="content_section">
                <h2>Basic Programming Concepts:</h2>
                <ul>
                    <li>Variables: Containers for storing data values.</li>
                    <li>Data Types: Different kinds of data, such as numbers, strings, and booleans.</li>
                    <li>Operators: Symbols that perform operations on variables and values.</li>
                    <li>Control Structures: Conditional statements (if-else) and loops (for, while) that control the flow of a program.</li>
                    <li>Functions: Reusable blocks of code that perform a specific task.</li>
                </ul>
            </section>

            <section class="content_section">
                <h2>Example: Simple Python Program</h2>
                <p>Let's write a Python program that calculates the area of a rectangle.</p>
                <pre>
                    <code>
                        def calculate_area(length, width):
                        area = length * width
                        return area

                        length = float(input("Enter the length of the rectangle: "))
                        width = float(input("Enter the width of the rectangle: "))

                        area = calculate_area(length, width)
                        print("The area of the rectangle is:", area)
                    </code>
                </pre>
                <p>This program does the following:</p>
                <ul>
                    <li>Defines a function called <code>calculate_area</code> that takes the length and width of a rectangle and returns its area.</li>
                    <li>Prompts the user to enter the length and width of the rectangle.</li>
                    <li>Calls the <code>calculate_area</code> function with the provided length and width.</li>
                    <li>Prints the calculated area of the rectangle.</li>
                </ul>
            </section>
        `
    }
];