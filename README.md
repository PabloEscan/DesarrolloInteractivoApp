# Informe React

## Estudiantes:
Juan José Abril

Pablo Esteban Escandón

Mateo Sebastián Namicela

### Mediciones

**Métrica:** Tiempo de configuración inicial (min)
Para instalar el proyecto se debe tener Node.js instalado previamente para su correcto funcionamiento. En este proyecto se utilizó Vite, la herramienta recomendada en el sitio oficial de React para la creación y gestión del proyecto.

Se utilizó el editor de código Visual Studio Code. Desde la consola integrada, primero verificamos que Node.js y el gestor de paquetes npm se encuentren disponibles ejecutando:

``` python
node -v

npm -v
```

### Creación el proyecto con Vite:
Se ejecuta el comando de inicialización:

npm create vite@latest gestorTareasCurso -- --template react

Durante el asistente de configuración, en el apartado Which linter to use? escogemos ESLint, y en la opción de instalación automática seleccionamos Yes. Si todo es correcto, se instalarán todas las dependencias necesarias y se iniciará un servidor local (localhost) de inmediato para su visualización.

En total, desde las verificaciones iniciales hasta que el proyecto estuvo ejecutándose en el navegador, tomó un aproximado de 8 minutos (principalmente debido al tiempo de descarga de las dependencias de npm).

Nota: En caso de que el proyecto no se inicie de forma automática tras la instalación, se deben ejecutar los siguientes comandos:

``` python
cd gestorTareasCurso  <- (o el nombre asignado a su aplicación)

npm run dev
```

Esto último puede agregar unos pocos segundos al arranque del entorno de desarrollo.