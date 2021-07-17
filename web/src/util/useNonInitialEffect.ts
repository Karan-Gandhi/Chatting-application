import { useEffect, DependencyList, useRef } from "react";

// eslint-disable-next-line
export const useNonInitialEffect = (effect: () => void, deps?: DependencyList) => {
	const initialRender = useRef(true);

	useEffect(() => {
		let effectReturns: void | (() => void | undefined) = () => {};

		if (initialRender.current) {
			initialRender.current = false;
		} else {
			effectReturns = effect();
		}

		if (effectReturns && typeof effectReturns === "function") {
			return effectReturns;
		}
	}, deps);
};
