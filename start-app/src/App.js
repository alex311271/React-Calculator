import styles from './css.style.module.css';
// import {Buttons} from './buttons';
import { useState } from 'react';

export const App = () => {
	const NUMS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	const Symbols = ['+', '-', '=', 'C'];

	let output = '';
	const [operand1, setOperand1] = useState('');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');
	const [isResult, setIsResult] = useState(false);

	const OnClick = (value) => () => {
		if (Number(value) && !operator) {
			setOperand1(operand1.concat(value));
			setIsResult(false);
		}
		if (
			(operand1 && !Number(value) && value === '+') ||
			(operand1 && !Number(value) && value === '-')
		) {
			setOperator(value);
			setIsResult(false);
		}
		if (operator === '+' || operator === '-') {
			setOperand2(operand2.concat(value));
			setIsResult(false);
		}
		if (value === 'C') {
			setOperand1('');
			setOperand2('');
			setOperator('');
			setIsResult(false);
		}
		if (operand1 && operator === '+' && operand2) {
			if (value === '=') {
				setOperand1(Number(operand1) + Number(operand2));
				setOperand2('');
				setOperator('');
				setIsResult(true);
			}
		}
		if (operand1 && operator === '-' && operand2) {
			if (value === '=') {
				setOperand1(Number(operand1) - Number(operand2));
				setOperand2('');
				setOperator('');
				setIsResult(true);
			}
		}
	};

	output = operand1 + operator + operand2;

	console.debug('1 ' + operand1, '2 ' + operator, '3 ' + operand2);

	return (
		<div className="App">
			<div className={styles.container}>
				<form>
					<input
						type="text"
						className={isResult ? styles.display__color : styles.display}
						value={output}
					></input>
				</form>
				<div classList={styles.keyboard}>
					{NUMS.map((item) => (
						<button name={item} className={styles.button} onClick={OnClick(item)}>
							{item}
						</button>
					))}
					{Symbols.map((item) => (
						<button name={item} className={styles.button} onClick={OnClick(item)}>
							{item}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};
