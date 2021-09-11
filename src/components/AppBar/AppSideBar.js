import React, { useState } from 'react';
import { Badge, InputAdornment, TextField } from '@material-ui/core';
import { ArrowBackIosOutlined, ArrowForwardIosOutlined, FavoriteBorderOutlined, LocalMallOutlined, SearchOutlined } from '@material-ui/icons';
import Auth from '../Auth/AuthDialog';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AppSideBar = () => {
    const cartDetails = useSelector(state => state.cart);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <div className="appbar">
            <div className="auth-bar">
                <div className="infos-utils">
                    <div> Aide </div>
                    <div> Rejoignez-nous </div>
                    <div onClick={handleClickOpen}> S'identifier </div>
                </div>
            </div>
            <div className="nav-bar">
                <div className="item-left">SNKRS</div>
                <div className="items-center">
                    <div>Nouveautés</div>
                    <div>Hommes</div>
                    <div>Femmes</div>
                    <div>Enfants</div>
                    <div>Promotions</div>
                    <div>Collections</div>
                </div>
                <div className="items-right">
                    <div className="searchBox">
                        <TextField
                            id="outlined-search"
                            type="search"
                            variant="outlined"
                            placeholder="Rechercher"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchOutlined />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div className="items-right-icon">
                        <Badge badgeContent={2} className="icon-favorites" variant="dot" color="primary">
                            <FavoriteBorderOutlined />
                        </Badge>
                        <Badge badgeContent={cartDetails.length} className="icon-bag" color="secondary">
                            <Link className="link-bag" to="/shopping-cart"><LocalMallOutlined /></Link>
                        </Badge>
                    </div>
                </div>
            </div>
            <div className="infos-covid">
                <div className="covid">
                    <div className="icon"><ArrowBackIosOutlined /></div>
                    <div className="covid-content">Covid: Informations concernant les magasins et livraisons<br /><a href="#">En savoir plus</a></div>
                    <div className="icon"><ArrowForwardIosOutlined /></div>
                </div>
            </div>
            <Auth setOpen={setOpen} open={open} />

        </div>
    )
}

export default AppSideBar;