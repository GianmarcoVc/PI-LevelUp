import './About.scss'
import Slug from '../../assets/slug.png'
import Deco from '../../assets/circle.png'
import Footer from '../../components/Footer/Footer'

const About = () => {
  
	document.title = 'Level Up | About'

	const skills = 
	{
		frontend: [
			{
				name: 'Sass',
				description: 'Preprocesador CSS que con características propias un lenguaje de programación.'
			},
			{
				name: 'Css Modules',
				description: 'Herramienta que cambia el nombre de clases y identificadores CSS en selectores únicos.'
			},
			{
				name: 'React',
				description: 'Librería para la creación de componentes interactivos, reutilizables, para interfaces de usuario.'
			},
			{
				name: 'Redux',
				description: 'Librería de JavaScript que te permite manejar el estado global de una aplicación.'
			}
		],
		backend: [
			{
				name: 'Node Js',
				description: 'Entorno de ejecución que se utiliza para ejecutar JavaScript fuera del navegador.'
			},
			{
				name: 'Express',
				description: 'Framework para crear aplicaciones web, APIs y web services.'
			},
			{
				name: 'Sequalize',
				description: 'ORM para Node js que nos permite manipular varias bases de datos SQL.'
			},
			{
				name: 'PostgreSQL',
				description: 'Sistema de gestión de bases de datos relacional orientado a objetos.'
			}
		],
	}

	return (
		<>
			<div id='about'>
				<div id='content'>
					<p id='title'><span>¡Hola!</span> Soy Gianmarco y este es mi <br/>Proyecto Individual para el Bootcamp de <b about='Bootcamp de Programación.'>SoyHenry</b>.</p>
					<p id='desc'>Es una <b about='Single Page Application'>SPA</b> responsiva, desarollado con el fin de poner a prueba cada una de las habilidades y tecnologías aprendidas durante el bootcamp, haciendo uso de Rawg, una <b about='Application Programming Interface'>API</b> externa, la cual nos brinda la mayor base de datos de videojuegos.</p>
          <div className="group">
						<h2 className='area'>Frontend</h2>
						{skills.frontend.map((s,i) =>
							<div className='tec' key={i}>
								<p className='name'>{s.name}</p>
								<p className='desc'>{s.description}</p>
							</div>							
						)}
					</div>
					<div className="group">
						<h2 className='area'>Backend</h2>
						{skills.backend.map((s,i) =>
							<div className='tec' key={i}>
								<p className='name'>{s.name}</p>
								<p className='desc'>{s.description}</p>
							</div>							
						)}
					</div>
				</div>
				<div id="decoration">
					<img id='img_bandicoot' src={Slug} alt='Metal SLug'/>
				</div>
				<img id='imgDeco' src={Deco}/>
			</div>
			<Footer/>
		</>
  )
}

export default About