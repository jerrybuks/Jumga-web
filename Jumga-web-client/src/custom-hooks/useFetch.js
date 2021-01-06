import { useState, useEffect } from 'react';

const useFetch = (url, options) => {
	const [ state, setState ] = useState({ isLoading: true, result: null, error: null });

	useEffect(() => {
		let unmounted = false;

		fetch(url, options)
			.then((resp) => resp.json())
			.then((result) => {
				if (!unmounted) {
					setState({
						result,
						isLoading: false
					});
				}
			})
			.catch((error) => {
				if (!unmounted) {
					setState({
						error,
						isLoading: false
					});
				}
			});
		return () => {
			unmounted = true;
		};
		 //eslint-disable-next-line
	}, []);
	return state;
};

export default useFetch;
