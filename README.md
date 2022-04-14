# Level Up! 🎮

El projecto se basa en una SPA, desarrollada como proyecto individual para el bootcamp de [SoyHenry](https://www.soyhenry.com/). </br>
Encuentra tus videojuegos favoritos y conoce mas sobre ellos para convertirte en el mejor conocedor de Videojuegos.

## 🚀 Instalación
1. Clona este proyecto.
2. Ve a la carpeta del proyecto `cd videogamesApp`
3. En una terminal:
    * Ve a la carpeta api `cd api/`
    * Instala las dependencias `npm install`
    * Corre el servidor local `npm run start`
4. En otra terminal:
    * Ve a la carpeta client `cd client/`
    * Instala las dependencias `npm install`
    * Corre el ambiente local `npm run dev`

## ✍️ Objetivos del Proyecto

La idea general fue crear una aplicación en la cual se puedan ver los distintos videojuegos disponibles junto con información relevante de los mismos utilizando la api externa [Rawg](https://rawg.io/apidocs) y a partir de ella poder:

  - Buscar videjuegos por nombre.
  - Ordenar por orden alfabético o por rating.
  - Filtrar por género y por videojuego existente o agregado por nosotros.
  - Agregar nuevos videojuegos mediante formulario controlado con JavaScript.
  - Paginado para ir cambiando entre los videojuegos, mostrando 15 videojuegos por página.

### Endpoints utilizadas de la Api Externa:

  - GET https://api.rawg.io/api/genres
  - GET https://api.rawg.io/api/games
  - GET https://api.rawg.io/api/games/{id}
  - GET https://api.rawg.io/api/games?search={game}

## 🛠️ Construido con:

### Frontend

* [Sass](https://sass-lang.com/) - Preprocesador CSS.
* [React](https://es.reactjs.org/) - La librería web usada. 
* [React Router Dom](https://reactrouterdotcom.fly.dev/docs/en/v6) - Para el enrutamiento en React.
* [React Icons](https://react-icons.github.io/react-icons/) - El uso de iconos.
* [Redux](https://redux.js.org/) - Para la gestión del estado.
* [Framer Motion](https://www.framer.com/motion/) - Animaciones de la aplicación.

### Backend

* [Node JS](https://nodejs.org/es/) - Desarrollo del Backend.
* [Express](http://expressjs.com/) - Para la creación de la API.
* [PostgreSQL](https://www.postgresql.org/) - Sistema de Gestión de Bases de Datos.
* [Sequalize](https://sequelize.org/) - ORM de Node.js utilizada para Postgres.

## 📸 Capturas :

<table style="width:100%">
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/82333673/161664002-d9a7b5d8-b9d0-4dc4-9cc3-420fa329d09b.jpeg">
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/82333673/161664126-f591293a-35c5-41dd-ad83-769e26eabc4f.jpeg">
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/82333673/161664024-f2077970-dee9-4c8f-9ab1-82e9df18eeca.jpeg">
    </td>
    <td>
      <img src="https://user-images.githubusercontent.com/82333673/161664080-c8cd7ad4-efba-4b69-ac3d-c89e07be6a9a.jpeg">
    </td>
  </tr>
</table>
