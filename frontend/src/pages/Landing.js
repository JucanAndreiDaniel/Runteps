import React, { useContext } from 'react';
import Header from '../sections/Header';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';

export default function Landing() {
    const { user } = useContext(UserContext);
    if (user) {
        return <Redirect to='/home' />
    }

    return (
        <div className="page">
            <Header />
            <h3 className="page__body">Runteps landing page</h3>
        </div>
    );
}