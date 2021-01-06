import React from 'react';
import Gift1 from '../../assets/gift1.svg';
import Gift2 from '../../assets/gift2.svg';

export default function AppContainer(props) {
	return (
		<div className="App">
			<img className="gift1" src={Gift1} alt="gift icon 1" />
			<img className="gift2" src={Gift2} alt="gift icon 2" />
			<div className="App-header-container scroll-bar">
				<header className="App-header scroll-bar">
					{props.children}
				</header>
			</div>
		</div>
	);
}
