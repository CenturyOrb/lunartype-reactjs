import { useRef, useEffect } from 'react'
import styles from './letter.module.css'
import clsx from 'clsx';

function Letter({ props, children }) {
	const classes = clsx(styles.letter, {
    	[styles.correct]: props.correct === 1,
    	[styles.incorrect]: props.correct === -1,
		[styles.extra]: props.isExtra 
 	});

	return (
		<div id='letter' className={classes}>{children}</div>
	);
}

export default Letter;
