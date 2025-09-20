import styles from './googlelogin.module.css'

function GoogleLogin() { 
	// need to add google logo inside the button 

	return(
		<button className={styles.google_button}>
			<img className={styles.google_icon} 
				src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" 
			/>
			Login with Google
		 </button>
	);
}

export default GoogleLogin
