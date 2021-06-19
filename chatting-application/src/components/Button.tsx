import React, { MouseEventHandler } from "react";

const Button = (props: { name: string; onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void }) => {
	return (
		<button
			onClick={event => {
				if (props.onClick) props.onClick(event);
			}}
		>
			{props.name}
		</button>
	);
};

export default Button;
