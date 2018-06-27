import React from 'react';

const WeatherInfo = ({weather,temp,icon}) => {

	return (
		<div>
			<p> {weather},  {temp} ℃</p>
			<img src={icon} alt=''/>
		</div>
	)
}

export default WeatherInfo