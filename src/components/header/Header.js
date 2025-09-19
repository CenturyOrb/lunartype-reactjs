import { useState } from 'react'
import styles from './header.module.css'
import ProfileModal from '../modal/Modal.js'
import { FaCog } from "react-icons/fa";
import { motion } from "motion/react"

// logo should be lexend deca, sans-serif font 
function Header() {
	const [modalOn, setModalOn] = useState(false);

	return (
		<>
			<div className={styles.lunartype_logo} style={{ color: 'var(--accent-color)' }}>lunartype</div>
			<nav className={styles.lunartype_nav}>
				<motion.button
					className={`${styles.nav_button} inverted border-radius-12px`}
					whileHover={{ scale: 1.06, backgroundColor: '#f76f53' }}>
					Leaderboard
				</motion.button>
				<motion.button
					className={`${styles.nav_button} inverted border-radius-12px`}
					whileHover={{ scale: 1.06, backgroundColor: '#f76f53' }}>
					History
				</motion.button>
				<motion.button
					className={`${styles.nav_button} inverted border-radius-12px`}
					whileHover={{ scale: 1.06, backgroundColor: '#f76f53' }}
					onClick={() => setModalOn(true)}>
					Profile
				</motion.button>
				<motion.div
					style={{ display: 'inline-flex', alignItems: 'center' }}
					whileHover={{ scale: 1.06, color: '#f76f53' }}>
					<FaCog size={27} />
				</motion.div>

				<ProfileModal isOpen={modalOn} onClose={() => setModalOn(false)}>
					<div className={styles.login}>
						<label for='email-email'>Email</label>
						<div className={styles.input_wrapper}>
							<input id='email-email' type='email' placeholder='Email...' />
						</div>
						<label for='email-password'>Password</label>
						<div className={styles.input_wrapper}>
							<input id='email-password' type='password' placeholder='Password...' />
						</div>
						<button>Sign In</button>
					</div>
				</ProfileModal>
			</nav>
		</>
	);
}

export default Header
