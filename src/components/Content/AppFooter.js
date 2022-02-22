import { Divider } from '@material-ui/core';
import {
    Instagram,
    Twitter,
    WhatsApp,
    YouTube
} from '@material-ui/icons';
import React from 'react';

const Footer = () => {
    return (
        <div className="content-footer" style={{}}>
            <div className="content-footer-top">
                <div className="footer-box">
                    <div className="footer-box-left">
                        <div className="left-item1">
                            <p>Trouver un magasin</p>
                            <p>S'inscrire aux emails</p>
                            <p>Réductions</p>
                            <p>Commentaires</p>
                        </div>
                        <div className="left-item2">
                            <p id="uppercase">Aide</p>
                            <p id="grey-color">Status de commande</p>
                            <p id="grey-color">Expédition et livraison</p>
                            <p id="grey-color">Mode de paiement</p>
                            <p id="grey-color">Nous contacter</p>
                        </div>
                        <div className="left-item3">
                            <p id="uppercase">à propos de SNKRS</p>
                            <p id="grey-color">Actualités</p>
                            <p id="grey-color">Carrières</p>
                            <p id="grey-color">Investisseurs</p>
                        </div>
                    </div>
                    <div className="footer-box-right">
                        <div><Twitter className="social-media" /></div>
                        <div><Instagram className="social-media" /></div>
                        <div><YouTube className="social-media" /></div>
                        <div><WhatsApp className="social-media" /></div>
                    </div>
                </div>
            </div>
            <div className="divider" />
            <div className="footer-content-bottom">
                <div className="utils">
                    <p>Guides</p>
                    <p>Conditions d'utilisation</p>
                    <p>Conditions générales de la vente</p>
                    <p>Mentions légales</p>
                </div>
                <div className="second-utils">
                    <div className="second-utils-left">
                        <p>France</p>
                        <p id="date">2021 Snkrs, Inc. Tout droit réservés</p>
                    </div>
                    <div className="second-utils-right">
                        <p>Politiques en matière de confidentialité et de cookies</p>
                        <p id="cookie">Paramètres des cookies</p>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default Footer;