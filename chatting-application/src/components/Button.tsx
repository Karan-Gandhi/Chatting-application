import React from "react";
import "../styles/Buttons.css";

export interface ButtonProps {
	label: string;
	type: ButtonType;
	onClick: () => void;
}

export enum ButtonType {
	Contained,
	Outline,
	Text,
}

const Button = (props: ButtonProps) => {
	return (
		<button
			onClick={props.onClick}
			className={
				"button " +
				(() => {
					switch (props.type) {
						case ButtonType.Contained:
							return "contained-button";
						case ButtonType.Outline:
							return "outline-button";
						case ButtonType.Text:
							return "text-button";
					}
				})()
			}
		>
			{props.label}
		</button>
	);
};

export default Button;
