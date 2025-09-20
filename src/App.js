import './App.css'
import { useState, createContext } from 'react'
import Header from './components/header/Header.js'
import TypingInterface from './components/main/Main.js'
import ScoreScreen from './components/scorescreen/ScoreScreen.js'

export const UserContext = createContext();

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
	const [wpm, setWpm] = useState(null);
	const [lunartypeUser, setLunartypeUser] = useState(null);

  	return (
  	  	<div id='big-boy'>
			<UserContext.Provider value={{ lunartypeUser, setLunartypeUser}}>
			<header> 
				<Header />	
			</header>
			<main>
				{renderTypeInterface ? 
					<TypingInterface onTimeout={(wpm) => {
						setRenderTypeInterface(false)
						setWpm(wpm);	
						}}/> : 	
					null
				}
				{!renderTypeInterface ? <ScoreScreen score={wpm} username={'Crownless'}/> : null}
			</main>
			</UserContext.Provider>
			<footer> 
				hihi foot
			</footer>		
  	  	</div>	
  	);
}

export default App;
