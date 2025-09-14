import styles from './word.module.css'
import Letter from '../letter/Letter.js'

function Word({ word, isFirstWord }) {
	const classes = isFirstWord ? 
					`${styles.word} ${styles.active} flex-row` : 
					`${styles.word} flex-row`;
	
	return (
		<div id='word' className={classes}>
			{word.map((letter, index) => (
				<Letter key={index}>{letter}</Letter>
			))}
		</div>
	);
}

export default Word
