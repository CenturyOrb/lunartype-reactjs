import styles from './modal.module.css'
import { motion } from 'motion/react'

// (1) isOpen is to detect when it needs to be opened
// (2) onClose is to send signal to parent to close modal
// (3) children content in modal
function Modal({ isOpen, onClose, children }) {
	// if modal isn't opened
	if (!isOpen) return null;

	return (
		<div className={styles.modal}>
			<div className={`${styles.modal_content} border-radius-1rem`}>
				<button onClick={onClose}>x</button>
				{children}
			</div>
		</div>
	);
}
export default Modal