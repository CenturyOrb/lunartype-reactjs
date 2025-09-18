import { useEffect, useRef, useState, createRef } from 'react'
import styles from './main.module.css'
import { motion } from 'motion/react'
import Word from '../word/Word.js'

function TypingInterface({ onTimeout }) {
	const typingInterface = useRef(null);
	const [words, setWords] = useState([]);
	const wordsRef = useRef(words);
	const wordsElRef = useRef([]);
	const firstKey = useRef(true);
	const prevRow = useRef(-1);
	const typeInterfaceRef = useRef(null);

	useEffect(() => {
		wordsRef.current = words;
		if (firstKey.current) {
			wordsElRef.current = words.map(() => createRef());
		}
	}, [words]);

	// api call for words
	useEffect(() => {
		// fetch words and then the original on mount formatting
		let timeout;
		const fetchResults = fetchwords(); // api call
		const formattedWords = formatResponse(fetchResults); // format api data 
		setWords(formattedWords);

		const handleKeyDown = (e) => {
			// check if first keypress after mount
			const wordsCopy = structuredClone(wordsRef.current); // NOTE TO SELF: deep copy of nested object 

			// disable scorlling

			if (firstKey.current) {
				timeout = setTimeout(() => {
					// TODO: calculate wpm then send data out
					// once done the compnent should be replaced with end screen 
					const wpm = wordsRef.current.filter(word => word.correct === true).length / 2;
					onTimeout(parseFloat(wpm.toFixed(2)).toString());
				}, 60000);	
				firstKey.current = false;
			}

			const currWordIndex = wordsCopy.findIndex(word => word.isActive);
			const currWord = wordsCopy[currWordIndex];
			const nextWord = wordsCopy[currWordIndex + 1];

			// the key is to always have the active letter in the right place
			const currLetterIndex = currWord.letters.findIndex(letter => letter.isActive);
			const currLetter = currWord.letters[currLetterIndex];
			const nextLetter = currWord.letters[currLetterIndex + 1] || nextWord.letters[0];
			let prevLetter = currWord.letters[currLetterIndex - 1];

			if (
				!/^[a-zA-Z0-9]$/.test(e.key) &&
				e.key !== ' ' &&
				e.key !== 'Backspace'
			) return;
			try {
				if (e.key === 'Backspace' && !currLetter) { // back spacing on the last of the word
					// undo correct/incorrect of "current" (previous) letter
					prevLetter = currWord.letters.slice(-1)[0];
					prevLetter.correct = 0;
					prevLetter.isActive = true;
					// switch active to letter prev letter
				} else if (e.key === 'Backspace') {
					// undo corrct/incorrect of previous letter
					if (prevLetter) {
						currLetter.isActive = false;
						currWord.letters[currLetterIndex - 1].correct = 0;
						currWord.letters[currLetterIndex - 1].isActive = true;
					}
				} else if (!currLetter && e.key !== ' ') { // extra typed 
					// add a new letter with extra property
					currWord.letters[currWord.letters.length] = {
						character: e.key,
						isActive: false,
						correct: -1,
						isExtra: true
					}
				} else if (e.key === ' ') {	// space
					// check if last word of a line, scroll 
					const nextWordRect = wordsElRef.current[currWordIndex+1].current.getBoundingClientRect();
					const currWordRect = wordsElRef.current[currWordIndex].current.getBoundingClientRect();
					if (nextWordRect.top > currWordRect.top) { 
						if (++prevRow.current >= 1) {
							typeInterfaceRef.current.scrollTo({
								top: prevRow.current * 48,
								left: 0,
								behavior: 'smooth'
							});
						}	
					} 

					// move isActive word and letter
					currWord.isActive = false;
					nextWord.isActive = true;
					nextWord.letters[0].isActive = true;
					currWord.isTyped = true;
					const invalid = currWord.letters.some(letter => {
						return (letter.correct === 0 || letter.correct === -1 ||
						letter.isExtra === true)
					}); 
					currWord.correct = invalid ? false : true; 
				} else if (e.key === currLetter.character) { //correct
					// currLetter should be correct then change the classes of the letter
					// here should detect extra input if user doensnt space
					currLetter.correct = 1;
					currLetter.isActive = false;
					nextLetter.isActive = true;
				} else if (e.key !== currLetter.character) {
					currLetter.correct = -1;
					currLetter.isActive = false;
					nextLetter.isActive = true;
				} else { console.log('this shouldnt be printing out') }
			} catch (error) { console.error(error) }

			setWords(wordsCopy);
		}

		// on mount add the event listener
		window.addEventListener('keydown', handleKeyDown);
		return () => { 
			window.removeEventListener('keydown', handleKeyDown)
			clearTimeout(timeout);
		}
	}, []);

	return (
		<motion.div ref={typingInterface} className={`${styles.type_interface} flex-row`}
			ref={typeInterfaceRef}
			initial={{ opacity: 0, y: 25 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 2 }}>
			{words.map((word, index) => (
				<Word key={index} props={word} 	
				ref={wordsElRef.current[index]}
				/>
			))}
		</motion.div>
	);
}

function fetchwords() {
	const response = [
		"cat", "blue", "grip", "stone", "jump",
		"desk", "tree", "quiz", "lamp", "fast",
		"clap", "brick", "snow", "game", "leaf",
		"drip", "smile", "bold", "rain", "kite",
		"gold", "mint", "glow", "rust", "pick",
		"nest", "wide", "fun", "quiz", "kind",
		"flip", "rope", "luck", "snap", "fish",
		"swim", "dive", "plot", "sing", "zoom",
		"fade", "path", "grin", "trip", "vote",
		"ring", "bark", "wolf", "beat", "milk"
	];
	return response;
}

function formatResponse(response) {
	const wordsFormatted = response.map((word, wordIndex) => {
		const lettersArr = word.split('')
			.map((letter, letterIndex) => {
				return {
					character: letter,
					isActive: !wordIndex && !letterIndex,
					correct: 0,
					isExtra: false
				}
			})
		return { letters: lettersArr, isActive: !wordIndex, isTyped: false, correct: false }
	})
	return wordsFormatted;
}

export default TypingInterface;
