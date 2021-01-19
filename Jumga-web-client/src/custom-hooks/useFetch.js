import { useState, useEffect } from 'react';

const useFetch = (url, options, chaneParam) => {
	const [ state, setState ] = useState({ isLoading: true, result: null, error: null });

	useEffect(() => {
		let unmounted = false;
		setState({...state, isLoading: true});
		fetch(url, options)
			.then((resp) => resp.json())
			.then((result) => {
				if (!unmounted) {
					setState({
						...state,
						result,
						isLoading: false
					});
				}
			})
			.catch((error) => {
				if (!unmounted) {
					setState({
						...state,
						error,
						isLoading: false
					});
				}
			});
		return () => {
			unmounted = true;
		};
		 //eslint-disable-next-line
	}, [chaneParam]);
	return state;
};

export default useFetch;
