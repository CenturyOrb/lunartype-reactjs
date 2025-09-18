import React, { forwardRef } from 'react';
import styles from './word.module.css'
import Letter from '../letter/Letter.js'

const Word = forwardRef(({ props }, ref) => {
  return (
    <div id="word" className={styles.word} ref={ref}>
      {props.letters.map((letter, index) => (
        <Letter key={index} props={letter}>
          {letter.character}
        </Letter>
      ))}
    </div>
  );
});

export default Word
