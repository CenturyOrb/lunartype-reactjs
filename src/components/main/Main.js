import { useEffect, useRef } from 'react'
import styles from './main.module.css'
import wordStyles from '../word/word.module.css'
import letterStyles from '../letter/letter.module.css'
import { motion } from 'motion/react'
import Word from '../word/Word.js'

function Main() {
	const typingInterface = useRef(null);

	// log eventlistener for keydown presses	
	// remove listener once component unmounts
	useEffect(() => {
		// when keyDown
		// (1) find current word (do this by finding first word without correct/incorret class
		// (2) find the current word's first untyped letter (same method as the above)
		const handleKeyDown = (e) => { 
			// find current word
			// currWord finds the first word that doesn't have a score tick
			// it should only be undefined when all words are exhausted
			const words = typingInterface.current.children;
			const currWord = Array.from(words).find(word => { 
				return (word.classList.contains(wordStyles.active));
  			});
			
			// find next next letter and prev letter
			// currLetter will return undefined if at the end of the word
			let prevLetter = null;
			const currLetter = Array.from(currWord.children).find((letter, i, arr) => {
				if (!letter.classList.contains(letterStyles.correct) && 
					!letter.classList.contains(letterStyles.incorrect)) {
					prevLetter = arr[i-1] || null;
					return letter;
				}
			});

			// in case its a space input and currLetter is null (end of word)
			// check if currWord is all correct or not
			if (' ' === e.key && !currLetter) {
				const someIncorrect = Array.from(currWord.children).some(letter => {
					return letter.classList.contains(letterStyles.incorrect);
				});
				
				someIncorrect ? 
					currWord.classList.add(wordStyles.error) : 
					currWord.classList.add(wordStyles.score);

				currWord.classList.add(wordStyles.typed);
				currWord.classList.remove(wordStyles.active);
				currWord.nextElementSibling.classList.add(wordStyles.active);	
		 	} else {
				// make appropriate class appends on current letter
				try {currLetter.classList.add(
					e.key === currLetter.textContent ? 
					letterStyles.correct : letterStyles.incorrect
				);
				} catch {
					console.log(currWord);	
					console.log(currLetter);
					console.log(prevLetter);
				}
			}

		}
	
		const keydownListener = window.addEventListener('keydown', handleKeyDown);

		return () => { window.removeEventListener('keydown', handleKeyDown) }
	}, []);
	
	const testWords = [
  		"right", "dog", "sun", "run", "hat", "car", "red", "top", "map", "pen",
  		"box", "cup", "dot", "log", "net", "tap", "jam", "bug", "fun", "hop",
  		"bat", "zip", "job", "fan", "kit", "van", "yes", "no", "hit", "sit",
  		"lip", "kid", "pop", "fix", "mix", "bed", "bag", "win", "man", "tip",
  		"low", "row", "mat", "pit", "get", "let", "pet", "run", "fox", "jug"
	];
	
	const wordsToLetters = splitWordsToLetters(testWords);

	return (
		<main>
			<motion.div ref={typingInterface} className={`${styles.type_interface} flex-row`}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 2 }}>
				{wordsToLetters.map((word, index) => (
					<Word key={index} word={word} isFirstWord={index === 0}/>
				))}
			</motion.div>
		</main>
	);
}

function splitWordsToLetters(words) {
	const wordsArray = words.map(word => word.split('') );
	return wordsArray;
}

export default Main;
