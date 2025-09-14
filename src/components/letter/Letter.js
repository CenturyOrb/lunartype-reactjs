import styles from './letter.module.css'

function Letter({ children }) {
	return (
		<div id='letter' className={styles.letter}>{children}</div>
	);
}

export default Letter;
