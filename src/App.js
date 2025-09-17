import './App.css'
import { useState } from 'react'
import Header from './components/header/Header.js'
import TypingInterface from './components/main/Main.js'

function App() {
	/* (1) header: 
		- left side logo
		- right side group nav settings */	
	/* (2) main: 
		- typng interface and results after test */
	/* (3) footer: 
		- credits
		- versions */
	const [renderTypeInterface, setRenderTypeInterface] = useState(true);

	const handleClick = () => {
		setRenderTypeInterface(!renderTypeInterface);	
	}
	
  	return (
  	  	<div id='big-boy'>
			<header> 
				<Header />	
			</header>
			<main>
				{renderTypeInterface ? <TypingInterface /> : null}
			</main>
			<button onClick={handleClick}>hi</button>
  	  	</div>	
  	);
}

export default App;
