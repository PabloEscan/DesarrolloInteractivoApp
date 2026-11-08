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