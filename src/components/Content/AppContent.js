import React from 'react';
import Products from '../Products/Products';
import AppHeader from './AppHeader';

const AppContent = () => {

    return (
        <div className="app-content">
            <AppHeader />
            <Products />
        </div>
    )
}

export default AppContent;