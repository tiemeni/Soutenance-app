import React from 'react';
import {SortOutlined, ExpandMoreOutlined} from '@material-ui/icons';

const AppHeader = () => {
    return (
        <div className="content-header">
            <div className="header-left">Chaussures pour hommes (256)</div>
            <div className="header-right">
                <div className="header-right-item">
                    <div>Afficher les filtres</div>
                    <div className="right-icon"><SortOutlined /></div>
                </div>
                <div className="header-right-item">
                    <div>Trier par</div>
                    <div className="right-icon"><ExpandMoreOutlined /></div>
                </div>
            </div>
        </div>
    )
}

export default AppHeader;