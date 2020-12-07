import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function IsUserRedirect(props) {
	var { user, loggedInPath, children, ...rest } = props;
	return (
		<Route
			{...rest}
			render={() => {
				if (!user) {
					return children;
				}
				return (
					<Redirect to={{ pathname: loggedInPath}} />
				);
			}}
		/>
	);
}
