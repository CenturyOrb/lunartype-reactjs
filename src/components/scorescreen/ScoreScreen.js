import styles from './scorescreen.module.css'

function ScoreScreen({ score, username }) {
	
	return (
		<div className={styles.score_screen}> 
			<p className={styles.username}>{username ? username : 'Guest'}</p>				
			<div className={styles.type_info}>
				<p>wpm</p>
				<p>{score || 'null'}</p>	
				<p>time 30</p>
			</div>
		</div>
	);
}

export default ScoreScreen
