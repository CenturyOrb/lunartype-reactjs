import styles from './header.module.css'
import NavButton from '../nav-button/NavButton.js'
import { FaCog } from "react-icons/fa";
import { motion } from "motion/react"

// logo should be lexend deca, sans-serif font 
function Header() {

	return(
		<>
			<div className={styles.lunartype_logo} style={{color: 'var(--accent-color)'}}>lunartype</div>	
			<nav className={styles.lunartype_nav}>
				<NavButton >Leadboard</NavButton>
				<NavButton >History</NavButton>
				<NavButton >Profile</NavButton>
				<motion.div 
				style={{display: 'inline-flex', alignItems: 'center'}}
				whileHover={{scale: 1.06, color: '#f76f53'}}>
					<FaCog size={27} />
				</motion.div>
			</nav>
		</>
	);
}

export default Header
