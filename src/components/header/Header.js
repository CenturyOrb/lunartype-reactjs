import './header.module.css'
import NavButton from '../nav-button/NavButton.js'

// logo should be lexend deca, sans-serif font 
function Header() {

	return(
		<header> 
			<div id='lunartype-logo'>lunartype</div>	
			<nav>
				<NavButton >Leadboard</NavButton>
				<NavButton >History</NavButton>
				<NavButton >Profile</NavButton>
			</nav>
		</header>
	);
}

export default Header
