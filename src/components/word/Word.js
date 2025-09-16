import styles from './word.module.css'
import Letter from '../letter/Letter.js'

function Word({ props }) {
	return (
		<div id='word' className={styles.word}>
			{props.letters.map((letter, index) => (
				<Letter key={index} props={letter}>{letter.character}</Letter>
			))}
		</div>
	);
}

export default Word
