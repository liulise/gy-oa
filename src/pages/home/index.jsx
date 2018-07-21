import React from 'react';
import Login from 'components/login/Login.jsx';

class World extends React.Component
{
	constructor(prop)
	{
		super(prop);
		this.state = {};
	}

	render()
	{
		return <Login />;
	}
}

export default World;
