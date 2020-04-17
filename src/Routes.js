
import React from 'react';
import { Switch } from 'react-router';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import main from './containers/main/main';
import signup from './containers/signup/signup';
import create from './containers/create/create';
import login from './containers/login/login';

export default ({ childProps }) => (
    <Switch>
        <AuthenticatedRoute
            path="/" exact
            component={main}
            props={childProps}
        />
        <UnauthenticatedRoute
            path="/signup" exact
            component={signup}
            props={childProps}
        /> 
        <AuthenticatedRoute
            path="/create" exact
            component={create}
            props={childProps}
        /> 
        <UnauthenticatedRoute
            path="/login" exact
            component={login}
            props={childProps}
        /> 
    </Switch>
)

