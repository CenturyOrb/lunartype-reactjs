import '../../App.css'
import styles from './navbutton.module.css'

function NavButton({ children }) {
	return (
		<button id={styles.navbutton} 
		className='inverted border-radius-12px'>	
			{children}
		</button>
	);
}

export default NavButton
