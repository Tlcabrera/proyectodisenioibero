const express = require('express');
const path=require('path');
const indexRouter = require('./routes/routes.js');
const app = express();
const PORT=process.env.PORT || 3000;
// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req,res,next)=>{
    console.log(`Request URL: ${req.url} - Method: ${req.method}`);
    next();
});

app.use((req,res,next)=>{
res.locals.appName='Proyecto Diseño Ibero';
res.locals.currentYear=new Date().getFullYear();
res.locals.currentPath=req.path;
next();
});

// Rutas
const tasks=[
    {id:1, title:'Diseñar la base de datos', completed:true},
    {id:2, title:'Implementar la API REST', completed:false},
    {id:3, title:'Crear la interfaz de usuario', completed:false},
];


app.use('/', indexRouter);

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).render('404', { title: 'Página No Encontrada' ,
    message: 'Lo sentimos, la página que buscas no existe.',
    error: {status: 404}
});
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', { title: 'Error Interno del Servidor' ,
    message: 'Lo sentimos, ha ocurrido un error en el servidor.',
    error: process.env.NODE_ENV === 'development' ? err : {}
});
});
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});






