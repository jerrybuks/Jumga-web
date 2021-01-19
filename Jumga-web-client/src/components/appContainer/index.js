import React from 'react';

export default function AppContainer(props) {
	return (
		<div className="App">
			<div className="App-header-container scroll-bar">
				<header className="App-header scroll-bar">
					{props.children}
				</header>
			</div>
		</div>
	);
}
