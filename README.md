# Informe React

## Estudiantes:
Juan José Abril

Pablo Esteban Escandón

Mateo Sebastián Namicela

# Sección 1: Panorama General de React

## 1.1 Origen e Historia

React nació dentro de las oficinas de **Facebook** (hoy conocido como **Meta**) para resolver un problema concreto de escalabilidad en la interfaz de usuario: la actualización constante y dinámica del *Feed de Noticias* y las notificaciones en tiempo real.

* **Creador:** Jordan Walke, ingeniero de software en Facebook.

* **Año de creación/despliegue interno:** 2011 (aplicado en el Feed de Facebook) y 2012 (integrado en Instagram).

* **Lanzamiento Open Source:** Fue presentado públicamente en la conferencia **JSConf US en mayo de 2013**, transformando el desarrollo web al introducir el concepto del *Virtual DOM* y la programación declarativa basada en componentes.

## 1.2 Mantenimiento y Comunidad

Actualmente, React es mantenido de forma principal por **Meta** a través de un equipo especializado de ingenieros a tiempo completo (Core Team), junto con una comunidad global masiva de desarrolladores independientes, colaboradores de código abierto y empresas aliadas.

El desarrollo se gestiona públicamente en su repositorio oficial de GitHub bajo un modelo colaborativo respaldado por la fundación OpenJS/comunidad open-source.

## 1.3 Versión Actual y Licencia

* **Versión Actual:** **React 19** (con soporte nativo para *Server Components*, *Actions*, *Hooks* optimizados como `useActionState` y optimizaciones de compilación).

* **Licencia:** **MIT License** (Licencia de Software Libre permissiva).

  *Nota histórica:* En sus inicios, React utilizaba una licencia BSD + Patentes que generó controversia en la industria. En septiembre de 2017, Facebook migró formalmente React a la licencia **MIT**, permitiendo su uso comercial y privado sin restricciones significativas.

## 1.4 Filosofía del Paradigma: Librería vs. Framework

Para comprender la posición de React en el ecosistema, es necesario contrastar las tres filosofías principales del desarrollo frontend actual:

| Característica | **Angular** | **Vue.js** | **React** | 
| ----- | ----- | ----- | ----- | 
| **Clasificación** | Framework Completo (*Full-fledged*) | Framework Progresivo | **Librería UI** | 
| **Enfoque (*Scope*)** | Todo incluido (*Batteries-included*) | Adopción gradual | Solo la capa de vista (*View Layer*) | 
| **Toma de decisiones** | Opina sobre arquitectura, enrutado y estado | Proporciona herramientas oficiales modulares | Delegada al desarrollador/ecosistema | 

### Principios Filosóficos de React

* **Declarativo:** Defines *cómo debe verse* la UI según el estado actual, y React se encarga de actualizar el DOM real de forma eficiente.

* **Basado en Componentes:** La interfaz se divide en piezas independientes y reutilizables con su propia lógica y estado.

* **Aprende una vez, escribe donde sea (*Learn Once, Write Anywhere*):** Las bases de React sirven para web (`react-dom`), dispositivos móviles (`React Native`), 3D (`React Three Fiber`) y aplicaciones de escritorio.

## 1.5 Ficha Técnica

A continuación se resume la ficha técnica oficial de la tecnología analizada:

```
===================================================================
                        FICHA TÉCNICA: REACT
===================================================================
Nombre Oficial     : React (o React.js)
Categoría          : Librería JavaScript para Interfaces de Usuario
Creador Original   : Jordan Walke (Meta / Facebook)
Año de Lanzamiento : 2013 (Open Source)
Mantenido por      : Meta (Facebook) + Comunidad Open Source
Versión Estable    : React 19.x
Licencia           : MIT
Lenguaje Base      : JavaScript / TypeScript
Paradigma          : Declarativo, Basado en Componentes, Unidireccional
Arquitectura DOM   : Virtual DOM (Reconciliación con algoritmo Fiber)
Formato de UI      : JSX / TSX (JavaScript XML)
Sitio Oficial      : https://react.dev
===================================================================

```
# Sección 2: Instalación y Configuración Inicial con Vite

## 2.1 Creación del Proyecto con Vite

En el ecosistema frontend moderno, la herramienta de empaquetado y servidor de desarrollo por excelencia es **Vite**. Vite aprovecha los **ES Modules (ESM)** nativos del navegador para ofrecer un tiempo de arranque instantáneo y un reemplazo de módulos en caliente (*Hot Module Replacement* - HMR) extremadamente rápido.

Comparación de herramientas de scaffolding comunes:
- **Angular CLI (`ng new`):** Específico de Angular, configura TypeScript, RxJS y la arquitectura corporativa por defecto.
- **`create-vue` (`npm create vue@latest`):** Herramienta oficial para andamiaje de proyectos Vue.js emparejada con Vite.
- **Vite (`npm create vite@latest`):** Herramienta agnóstica de alto rendimiento compatible con React, Vue, Svelte y vanilla JS.

Para crear una aplicación React con Vite usando Node.js / `npm`, ejecutamos en la terminal:

```bash
npm create vite@latest mi-app-react -- --template react
cd mi-app-react
npm install
npm run dev
```

---

## 2.2 Estructura de Carpetas del Proyecto

Una vez completada la instalación, la estructura generada sigue un estándar limpio y modular:

```
mi-app-react/
├── node_modules/         # Dependencias instaladas vía npm
├── public/               # Recursos estáticos servidos directamente (favicon, manifest)
├── src/                  # Código fuente de la aplicación
│   ├── assets/           # Imágenes, fuentes y archivos multimedia de  la     app
│   ├── App.css           # Estilos específicos del componente principal App
│   ├── App.jsx           # Componente raíz de la aplicación
│   ├── index.css         # Estilos globales de la aplicación
│   ├── main.jsx          # Punto de entrada JavaScript / Renderizado inicial
│   └── vite-env.d.ts     # Definiciones de tipos para el entorno Vite (si se usa TS)
├── .gitignore            # Archivos excluidos del control de versiones de Git
├── index.html            # Plantilla HTML raíz del proyecto
├── package.json          # Manifiesto del proyecto y listado de dependencias
├── package-lock.json     # Bloqueo de versiones exactas de dependencias
└── vite.config.js        # Configuración del bundler Vite y sus plugins
```

---

## 2.3 Explicación del "Hola Mundo" Línea por Línea

Para comprender cómo arranca la aplicación, analizamos los dos archivos principales: `index.html` y `src/main.jsx`.

### 1. `index.html`

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aplicación React</title>
  </head>
  <body>
    <!-- Nodo contenedor donde se montará React -->
    <div id="root"></div>

    <!-- Carga del punto de entrada en JS ESM -->
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

* **`<div id="root"></div>`:** Este elemento actúa como el contenedor donde React inyectará toda la interfaz gráfica.
* **`<script type="module" src="/src/main.jsx"></script>`:** Indica al navegador que cargue el código como un módulo ES nativo.

---

### 2. `src/main.jsx`

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**Análisis línea por línea:**

1. `import { StrictMode } from 'react'`: Importa la herramienta de desarrollo `StrictMode`, la cual activa verificaciones adicionales y advertencias para el código en etapa de desarrollo (como identificar efectos secundarios o APIs obsoletas).
2. `import { createRoot } from 'react-dom/client'`: Importa la función de renderizado concurrente introducida en React, encargada de conectar la lógica de React con el DOM real del navegador.
3. `import './index.css'`: Importa los estilos CSS globales que afectarán a toda la aplicación.
4. `import App from './App.jsx'`: Importa el componente raíz `App`, que contiene la interfaz principal.
5. `createRoot(document.getElementById('root'))`: Busca el elemento HTML con la ID `root` y crea una raíz de renderizado de React sobre él.
6. `.render(...)`: Ejecuta el ciclo de renderizado montando los elementos hijos dentro del nodo raíz en el DOM.

Usualmente los proyectos cuando son creados no suelen tener una pantalla "vacía", sino un código de ejemplo en App.HTML, en el caso de vite se logra visualizar algo así:

![Salida inicial](./ImagenesDocumentacion/salidaInicial.png)


---
Las mediciones realizadas se encuentran en el apartado de mediciones al final del informe.

# Sección 3: Componentes y Fundamentos de React

## 3.1 Componentes y JSX

React se basa en **componentes funcionales**, los cuales son funciones de JavaScript que retornan marcas visuales escritas en **JSX (JavaScript XML)**. JSX nos permite escribir estructuras similares a HTML dentro del código JavaScript.

### Reglas clave de JSX:
1. Deve retornar un único elemento padre (o un *Fragment* `<> ... </>`).
2. Se utilizan nombres de propiedades camelCase (`className` en vez de `class`, `htmlFor` en vez de `for`).
3. Se pueden evaluar expresiones de JavaScript arbitrarias encerrándolas en llaves `{ }`.

---

## 3.2 Props (Entradas de Datos)

Las **props** (propiedades) son argumentos que se pasan a los componentes para configurarlos de forma dinámica desde su componente padre. En React, las props son de **solo lectura** (*inmutables*).

---

## 3.3 Eventos

Los eventos en React se nombran en camelCase (por ejemplo, `onClick`, `onChange`, `onSubmit`). Se les pasa una función como manejador del evento en lugar de una cadena de texto.

```jsx
function BotonAccion({ texto, alHacerClic }) {
  return (
    <button onClick={alHacerClic} className="btn-primario">
      {texto}
    </button>
  );
}
```

---

## 3.4 Renderizado Condicional y Listas

- **Condicionales:** Se ejecutan comúnmente usando el operador ternario (`condicion ? a : b`) o el operador lógico `&&` (`condicion && elemento`).
- **Listas:** Se procesan transformando arreglos de datos en elementos JSX mediante el método `.map()`. Cada elemento de una lista renderizada **debe llevar una propiedad única `key`** para permitir una reconciliación eficiente del Virtual DOM.

---

## 3.5 Ciclo de Vida en Componentes Funcionales

En React moderno, el ciclo de vida de un componente (montaje, actualización y desmontaje) se gestiona mediante el Hook `useEffect`:

1. **Montaje (Mounting):** El componente se inserta en el DOM. Se ejecuta el bloque del `useEffect` si su arreglo de dependencias está vacío `[]`.
2. **Actualización (Updating):** Se ejecuta cuando cambian las dependencias listadas en el arreglo de dependencias `[dep1, dep2]`.
3. **Desmontaje (Unmounting):** Ocurre cuando el componente se remueve del DOM. Se gestiona retornando una *función de limpieza* (*cleanup function*) desde el `useEffect`.

---

## 3.6 Ejemplo Integrado: Componente Reutilizable Usado 3 Veces

A continuación se muestra el código completo de la creación de tareas para la lista (`ItemTarea`) reutilizable.

```jsx
export default function ItemTarea({ tarea, alEliminar, alAlternar, alIniciarEdicion }) {
    
    const convertirFechaAObjeto = (fechaStr) => {
        if (!fechaStr) return new Date(0);
        const [dia, mes, anio] = fechaStr.split('/');
        return new Date(`${anio}-${mes}-${dia}`);
    };

    const esFechaVencida = (fechaStr) => {
        if (!fechaStr) return false;
        const [dia, mes, anio] = fechaStr.split('/');
        const fechaTarea = new Date(anio, mes - 1, dia);
        fechaTarea.setHours(0, 0, 0, 0);
        
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        return fechaTarea < hoy;
    };

    const vencida = esFechaVencida(tarea.fecha);
    let estadoTexto = '';
    let claseEstado = '';

    if (tarea.completed) {
        estadoTexto = 'Completada';
        claseEstado = 'estado-completada';
    } else if (vencida) {
        estadoTexto = 'Fallida';
        claseEstado = 'estado-fallida';
    } else {
        estadoTexto = 'Pendiente';
        claseEstado = 'estado-pendiente';
    }

    return (
        <li className="item-tarea">
            <div className="info-tarea">
                <span className={tarea.completed ? 'texto-tarea completada' : 'texto-tarea'}>
                    {tarea.title}
                </span>
                {tarea.fecha && (
                    <span className="fecha-tarea">
                        {tarea.fecha}
                    </span>
                )}
            </div>
            
            <div className="acciones-tarea">
                <button 
                    className={`badge-estado ${claseEstado}`}
                    onClick={() => alAlternar(tarea.id, tarea.completed)}
                    title="Haz clic para cambiar estado"
                >
                    {estadoTexto}
                </button>

                <button 
                    className="boton-accion"
                    onClick={() => alIniciarEdicion(tarea)}
                    title="Editar tarea"
                >
                    Editar
                </button>

                <button 
                    className="boton-accion eliminar"
                    onClick={() => alEliminar(tarea.id)}
                    title="Eliminar tarea"
                >
                    X
                </button>
            </div>
        </li>
    );
}
```

---

# Sección 4: Estado y Reactividad

## 4.1 El Modelo de Reactividad en React

A diferencia de otros frameworks como Vue o Svelte, React **no utiliza reactividad basada en observables o proxies invisibles** por defecto. En su lugar, React emplea un modelo de re-renderizado explícito e inmutabilidad.

Cuando el estado de un componente cambia, React vuelve a ejecutar la función del componente, genera un nuevo Virtual DOM y calcula las diferencias (reconciliación) para aplicar únicamente los cambios necesarios en el DOM real.

```
[ Cambio de Estado ] ──► [ Re-ejecución del Componente ] ──► [ Diff en Virtual DOM ] ──► [ Actualización del DOM ]
```

## 4.2 Reactividad local: Hooks y Refs

En React moderno (basado en componentes funcionales), la reactividad y la preservación de valores entre renders se gestiona a través de **Hooks** y **Refs**.

### 1. useState y useReducer (Estado Reactivo): 

* useState: Es el hook fundamental para manejar estado reactivo local. Cada actualización notifica a React que el componente debe re-renderizarse.
* useReducer: Ideal para lógica de estado compleja o múltiples sub-valores interconectados (sigue el patrón Redux de acción $\rightarrow$ reducer $\rightarrow$ nuevo estado).
* Inmutabilidad: En React, el estado nunca debe mutarse directamente. Siempre se debe proveer un nuevo objeto o valor (setCount(prev => prev + 1)).

### 2. useRef (Estado Persistente no Reactivo)

* Un ref es un contenedor cuyo atributo .current guarda un valor mutable a lo largo de las re-ejecuciones del componente.

* Diferencia clave: Modificar un ref NO desencadena un re-renderizado. Se usa principalmente para acceder a elementos del DOM de forma directa o para almacenar IDs de temporizadores y variables de referencia.

### 3. Reactividad Granular: React vs. Signals

En frameworks como Vue (ref/reactive), Solid.js o Angular (con sus Signals incorporadas recientemente), la reactividad es extremadamente fina (fine-grained): solo el nodo específico del DOM suscrito a la señal se actualiza sin re-ejecutar toda la función del componente.

En React:

* Signals en React: Aunque React no incluye Signals de forma nativa en su núcleo, librerías como @preact/signals-react o legend-state traen este concepto al ecosistema.

* React Compiler (React 19): React ha optado por automatizar la memorización (reemplazando la necesidad manual de useMemo y useCallback) mediante su nuevo compilador, manteniendo el modelo mental clásico basado en componentes.

## 4.3 Estado global
Cuando la aplicación crece, pasar datos a través de props por múltiples niveles jerárquicos (Prop Drilling) se vuelve insostenible. El ecosistema de React ofrece diversas estrategias para el estado global:

### 1. React Context API (Nativo)
Es una característica integrada en React para compartir valores en un árbol de componentes sin necesidad de pasar props manualmente.

* Ventajas: No requiere dependencias externas; excelente para datos estáticos o de baja frecuencia de cambio (ej. tema oscuro, usuario autenticado, idioma).
* Desventajas: Cada vez que el valor del contexto cambia, todos los componentes consumidores se re-renderizan, lo que puede causar problemas de rendimiento en aplicaciones grandes si el estado cambia con frecuencia.

### 2. Librerías de Estado Global: Zustand, Redux Toolkit, Jotai

Para superar las limitaciones de Context API, se utilizan librerías de estado de tercera parte:

* **Zustand**: Muy popular por su simplicidad y bajo peso. Utiliza un almacén central (store) basado en suscripciones, permitiendo que solo los componentes que seleccionan una propiedad específica se re-rendericen (useStore(state => state.bears)).

* **Redux Toolkit (RTK)**: La solución empresarial tradicional, basada en un flujo unidireccional estricto de datos con acciones y reductores.

* **Jotai / Recoil**: Soluciones basadas en átomos, permitiendo una reactividad bottom-up (de abajo hacia arriba).

### Comparativa con otros Frameworks

| Aspecto | **React** | **Vue.js** | **Angular** |
| ----- | ----- | ----- | ----- |
| **Solución Oficial** | Context API (Nativo) | Pinia | Servicios Inyectables + RxJS / Signals |
| **Arquitectura de Estado** | Descentralizada / Basada en Hooks o Stores externos (Zustand, Redux) | Store centralizado de reactividad fina (Pinia) | Inyección de Dependencias (*Dependency Injection*) |
| **Suscripción a cambios** | Selectores explícitos o re-renderizado de subtree | Automático a nivel de propiedad por Proxies | Vía *AsyncPipe*, Observables RxJS o Signals |

---

## 4.4 Estado Compartido entre 2 Componentes

Para compartir estado entre dos componentes en React, existen tres patrones principales según el nivel de acoplamiento y distancia en el árbol de componentes.

### Patrón 1: Elevación de Estado (Lifting State Up) Patrón Canónico
Cuando dos componentes hermanos necesitan compartir información, el estado debe elevarse al ancestro común más cercano.

```
         [ Componente Padre ]
         (Contiene `useState`)
            /           \
           /             \
   [ Componente A ]   [ Componente B ]
  (Recibe el valor)  (Recibe la función setter)
```

### Ejemplo práctico:

```jsx
import { useState } from 'react';

// Componente Hermano A: Emisor (modifica el estado)
function InputComponent({ valor, onCambio }) {
  return (
    <input 
      type="text" 
      value={valor} 
      onChange={(e) => onCambio(e.target.value)} 
      placeholder="Escribe algo..."
    />
  );
}

// Componente Hermano B: Receptor (muestra el estado)
function DisplayComponent({ valor }) {
  return <p>El texto ingresado es: <strong>{valor}</strong></p>;
}

// Componente Padre: Mantiene la "Fuente de la Verdad" (Single Source of Truth)
export default function Padre() {
  const [texto, setTexto] = useState('');

  return (
    <div className="p-4 border rounded">
      <h3>Estado Compartido (Lifting State Up)</h3>
      <InputComponent valor={texto} onCambio={setTexto} />
      <DisplayComponent valor={texto} />
    </div>
  );
}
```

### Patrón 2: Mediante React Context
Si los dos componentes están lejanos en la jerarquía, se crea un `Provider` que envuelva la rama del árbol donde residen ambos componentes.

### Patrón 3: Mediante un Store Externo (ej. Zustand)
Si los dos componentes están totalmente desvinculados en el árbol de componentes, ambos se suscriben de forma independiente al mismo *store* global sin requerir un componente padre común en la jerarquía del DOM.

# Sección 5: Rutas y Consumo de APIs

## 5.1 Enrutamiento con React Router

React en sí mismo no incluye un enrutador interno. La librería estándar de la industria para resolver la navegación entre vistas en una Single Page Application (SPA) es **React Router** (`react-router-dom`).

Instalación:
```bash
npm install react-router-dom
```

### Configuración básica de rutas:

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Inicio() { return <h2>Página de Inicio</h2>; }
function Acerca() { return <h2>Acerca de Nosotros</h2>; }

export function AppRouter() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Inicio</Link> | <Link to="/acerca">Acerca</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/acerca" element={<Acerca />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 5.2 Consumo de API REST, Manejo de Carga y Errores

Para interactuar con servicios externos, se hace uso de la API nativa de JavaScript `fetch` (o librerías como `axios` o `HttpClient` en otros ecosistemas) coordinada con el estado (`useState`) y los efectos de React (`useEffect`).

A continuación se presenta un patrón completo que incluye:
1. Indicador visual de estado de carga (*Loading state*).
2. Manejo y captura de errores HTTP/Red (*Error state*).
3. Renderizado de los datos consumidos.

```jsx
const actualizarTareaEnAPI = (id, datosActualizados, onTerminado) => {
    let fechaFormateada = datosActualizados.fecha;

    if (datosActualizados.fecha && datosActualizados.fecha.includes('-')) {
        const [anio, mes, dia] = datosActualizados.fecha.split('-');
        fechaFormateada = `${dia}/${mes}/${anio}`;
    }

    const datosParaEnviar = {
        title: datosActualizados.titulo,
        fecha: fechaFormateada
    };

    setErrorAccion(null);
    setCargandoAccion(true);

    fetch(`https://apitareas-6fki.onrender.com/tareas/${id}`, {
        method: 'PUT', //Se envían los cambios para guardarse
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosParaEnviar)
    })
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error(`Error en el servidor: ${respuesta.status} (${respuesta.statusText})`);
            }
            return respuesta.json();
        })
        .then((tareaActualizada) => {
            setTareas((tareasAnteriores) =>
                tareasAnteriores.map((t) => (t.id === id ? tareaActualizada : t))
            );
            setTareaAEditar(null);
            if (onTerminado) onTerminado();
        })
        .catch((error) => {
            console.error('Error detallado al actualizar la tarea:', error);
            // Guardamos el mensaje para mostrárselo al usuario en caso de error
            setErrorAccion(error.message || 'No se pudo conectar con el servidor.');
            
        })
        .finally(() => {
            setCargandoAccion(false);
        });
};
```
---
# Sección 7: Ecosistema y Despliegue

## 7.1 CLI y React DevTools

- **CLI (Command Line Interface):** Vite proporciona una interfaz de línea de comandos para compilar, servir localmente y ejecutar pruebas del proyecto.
- **React Developer Tools:** Extensión oficial para navegadores (Chrome, Firefox, Edge) que permite inspeccionar la jerarquía de componentes de React en tiempo real, visualizar sus `props`, `state` y Hooks, así como evaluar el rendimiento mediante su pestaña de profiling.

---

## 7.2 Librerías de UI Popularizadas

React no incluye componentes de UI estilizados nativos, por lo que la industria utiliza librerías de componentes preconstruidos:

- **Tailwind CSS:** Framework CSS *utility-first* altamente adoptado para construir interfaces a medida.
- **MUI (Material UI):** Implementación popular del sistema de diseño Material Design de Google para React.
- **Shadcn/ui / Radix UI:** Colección de componentes accesibles y sin estilos predeterminados sobre los cuales se conserva el control total del código fuente.
- **Ant Design:** Librería de UI orientada a aplicaciones enterprise y dashboards administrativos.

---

## 7.3 Build de Producción

Para compilar la aplicación y optimizarla para producción, ejecutamos:

```bash
npm run build
```

**Proceso interno:**
1. Vite procesa los archivos JSX y módulos de JavaScript.
2. Transpila el código (por ejemplo, eliminando tipos o sintaxis obsoleta).
3. Aplica **Tree Shaking** para eliminar código no utilizado.
4. Genera archivos HTML, JS y CSS minificados y divididos en fragmentos (*Code Splitting*) dentro del directorio `dist/`.

Para probar localmente el build compilado:
```bash
npm run preview
```

---

## 7.4 Plataformas de Despliegue

### 1. Vercel
Es el entorno nativo sugerido para frontend. Se conecta mediante Git:
1. Subir el repositorio a GitHub/GitLab.
2. Importar el proyecto desde el panel de Vercel.
3. Vercel detecta Vite automáticamente. El comando de build es `npm run build` y la carpeta de salida es `dist`.

### 2. Netlify
1. Conectar el repositorio de Git en Netlify.
2. Configurar Build Command: `npm run build`.
3. Configurar Publish directory: `dist`.
4. Agregar un archivo `_redirects` en la carpeta `public/` con la regla `/* /index.html 200` para soportar enrutamiento del lado del cliente.

### 3. GitHub Pages
1. Instalar el paquete de despliegue: `npm install -D gh-pages`.
2. En `vite.config.js`, definir la propiedad `base: '/nombre-del-repositorio/'`.
3. Agregar scripts en `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Ejecutar `npm run deploy`.


Para el despliegue de la aplicación se uso Vercel, en el cual se subío el repositorio para generar la URL:

https://desarrollo-interactivo-app.vercel.app/

---

# Mediciones

**Métrica:** Tiempo de configuración inicial (min)
Para instalar el proyecto se debe tener Node.js instalado previamente para su correcto funcionamiento. En este proyecto se utilizó Vite, la herramienta recomendada en el sitio oficial de React para la creación y gestión del proyecto.

Se utilizó el editor de código Visual Studio Code. Desde la consola integrada, primero verificamos que Node.js y el gestor de paquetes npm se encuentren disponibles ejecutando:

``` python
node -v

npm -v
```

### Creación el proyecto con Vite:
Se ejecuta el comando de inicialización:

``` Python
npm create vite@latest gestorTareasCurso -- --template react
```

Durante el asistente de configuración, en el apartado Which linter to use? escogemos ESLint, y en la opción de instalación automática seleccionamos Yes. Si todo es correcto, se instalarán todas las dependencias necesarias y se iniciará un servidor local (localhost) de inmediato para su visualización.

![Proyecto iniciado](./ImagenesDocumentacion/proyectoIniciado.png)

En total, desde las verificaciones iniciales hasta que el proyecto estuvo ejecutándose en el navegador, tomó un aproximado de 2 minutos con 26 segundos (principalmente debido al tiempo de descarga de las dependencias de npm).

Nota: En caso de que el proyecto no se inicie de forma automática tras la instalación, se deben ejecutar los siguientes comandos:

``` python
cd gestorTareasCurso  <- (o el nombre asignado a su aplicación)

npm run dev
```

Esto último puede agregar unos pocos segundos al arranque del entorno de desarrollo.

Evidencias de la creación del proyecto:

![Ingreso para instalación de npm](./ImagenesDocumentacion/ingresoProyecto.png)

![Proyecto Inciiado](./ImagenesDocumentacion/cronometro.png)

