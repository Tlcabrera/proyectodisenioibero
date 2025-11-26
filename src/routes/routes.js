const express = require('express');
const router = express.Router();

const tasks = [
    { id: 1, title: 'Diseñar la base de datos', completed: true },
    { id: 2, title: 'Implementar la API REST', completed: false },
    { id: 3, title: 'Crear la interfaz de usuario', completed: false },
];

// Ruta principal
router.get('/', (req, res) => {

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = tasks.filter(task => !task.completed).length;

    res.render('index', {
        title: 'Inicio',
        tasks,
        totalTasks,
        completedTasks,
        pendingTasks
    });
});

// Ruta de about
router.get('/about', (req, res) => {
    res.render('about', { 
        title: 'Acerca de Nosotros',
        features: [
            'Express.js para el backend',
            'Gestión eficiente con EJS',
            'Diseño responsivo con CSS3 y HTML5',
            'JavaScript para interactividad'
        ]
    });
});

// Crear tarea (post)
router.post('/api/tasks', (req, res) => {
    const { title } = req.body;

    if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'El título de la tarea es obligatorio' });
    }

    const newTask = {
        id: tasks.length + 1,
        title: title.trim(),
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

module.exports = router;
