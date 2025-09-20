import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App.js'
import styles from './header.module.css'
import ProfileModal from '../modal/Modal.js'
import { FaCog } from "react-icons/fa";
import { motion } from "motion/react"
import { FirebaeAuth, FirebaeDB } from '../../firebase/firebase-config.js'
import { GoogleAuthProvider,
		signInWithPopup,
		createUserWithEmailAndPassword, 
		signInWithEmailAndPassword,
		signOut,	
		onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

const googleProvider = new GoogleAuthProvider();

// logo should be lexend deca, sans-serif font 
function Header() {
	const [modalOn, setModalOn] = useState(false);
	const {lunartypeUser, setLunartypeUser} = useContext(UserContext);
	const [emailInput, setEmailInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');
	
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(FirebaeAuth, (user) => { 
			setLunartypeUser(user ? user : null);
		});
		 
		return unsubscribe; 
	}, []);
	
	useEffect(() => {
		setModalOn(false);
	}, [lunartypeUser]);

	const handleGoogleLogin = async () => {
		try {
			const userCredential = await signInWithPopup(FirebaeAuth, googleProvider);
			await addNewUser(userCredential.user.email, userCredential.user.uid);
    	} catch (error) { console.error(error) }
	}

	const handleSignUp = async () => {
		try {
			const userCredential = await createUserWithEmailAndPassword(FirebaeAuth, emailInput, passwordInput);
			// add user to database /users/{ uid }	
			// in the future add their name too
			await addNewUser(userCredential.user.email, userCredential.user.uid);
		} catch (error) { console.error(error) }
		finally {
			setEmailInput('');
		    setPasswordInput('');
		}
	}

	const handleSignIn = async () => {
		try {
			const userCredential = await signInWithEmailAndPassword(FirebaeAuth, emailInput, passwordInput);
		} catch (error) { console.error(error) }
		finally {
			setEmailInput('');
		    setPasswordInput('');
		}
	}

	const handleSignOut = async () => {
		try { 
			await signOut(FirebaeAuth);
		} catch (error) { console.error(error) }
	}

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
						{ !lunartypeUser ? 
						<>
						<button onClick={handleGoogleLogin}className={styles.google_button}>
                        	<img className={styles.google_icon} 
                        		src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" 
                        	/>
                        	Login with Google
                        </button>
						<hr style={{marginBottom: '1rem'}}/>
						<label className={styles.login_label} htmlFor='email-email'>Email</label>
						<div className={styles.input_wrapper}>
							<input 
								id='email-email' type='email' placeholder='Email...' 
								onChange={(e) => setEmailInput(e.target.value)}
								value={emailInput}
							/>
						</div>
						<label className={styles.login_label} htmlFor='email-password'>Password</label>
						<div className={styles.input_wrapper}>
							<input 
								id='email-password' type='password' placeholder='Password...' 
								onChange={(e) => setPasswordInput(e.target.value)}
								value={passwordInput}
							/>
						</div>
						<button onClick={handleSignUp}>Sign Up</button>
						<button onClick={handleSignIn}>Sign In</button>
						</> : null }
						{ lunartypeUser ? <button onClick={handleSignOut}>Sign Out</button> : null}
					</div>
				</ProfileModal>
			</nav>
		</>
	);
}

async function addNewUser(userEmail, userUID) { 
	try {
		const newUser = doc(FirebaeDB, `users/${userEmail}`);
    	const userDocData = { uid: userUID };
    	await setDoc(newUser, userDocData);
	} catch (error) { console.error(error) }
}

export default Header
