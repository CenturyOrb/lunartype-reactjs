import '../../App.css'
import styles from './navbutton.module.css'
import { motion } from "motion/react"

function NavButton({ children }) {
	return (
		<motion.button id={styles.navbutton} 
		className='inverted border-radius-12px'
		whileHover={{scale: 1.06, backgroundColor: '#f76f53'}}>	
			{children}
		</motion.button>
	);
}

export default NavButton
