const express = require('express');
const router = express.Router();

const tasks=[
    {id:1, title:'Diseñar la base de datos', completed:true},
    {id:2, title:'Implementar la API REST', completed:false},
    {id:3, title:'Crear la interfaz de usuario', completed:false},
];

//ruta principal
router.get('/', (req, res) => {
    res.render('index', {
         title: 'Inicio',
         tasks:tasks,
         completedTasks: tasks.filter(task => task.completed).length,
         pendingTasks: tasks.filter(task => !task.completed).length
    });
});

// ruta de about
router.get('/about', (req, res) => {
    res.render('about', { 
        title: 'Acerca de Nosotros',
        featuares: [
            'Express.js para el backend',
            'Gestión eficiente de ejs para vistas',
            'Diseño responsivo con CSS3 y HTML5',
            'Javascript para interactividad'
        ]
    });
});

//ruta de tasks
router.get('/api/tasks', (req, res) => {
    const {title} = req.body;
    if(!title || title.trim() ===''){
        return res.status(400).json({error:'El título de la tarea es obligatorio'});
    }
    const newTask={
        id: tasks.length + 1,
        title: title.trim(),
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});
module.exports = router;
      