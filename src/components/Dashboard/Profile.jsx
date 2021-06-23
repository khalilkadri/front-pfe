import React,{useEffect} from 'react';
import '../../Styles/profile.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import axios from 'axios';
import {useState} from 'react'
import { SettingsSystemDaydreamSharp } from '@material-ui/icons';
import Alert from 'react-bootstrap/Alert'
import { useHistory } from "react-router-dom";
import profile from "../../images/profile.svg";

function Profile(){
return(
    <div className="container">
<div class="wrapper bg-white mt-sm-5">
    <h4 class="pb-4 border-bottom">Paramètre Du Compte</h4>
    <div class="d-flex align-items-start py-3 border-bottom">      
     <img src={profile} alt="profile" className="img"/>
        <div class="pl-sm-4 pl-2" id="img-section"> <b>Logo de l'entreprise</b>
            <p>Type de fichier accepté .png. moins que 1MB</p> <button class="btn button border"><b>Upload</b></button>
        </div>
    </div>
    <div class="py-2">
        <div class="row py-2">
            <div class="col-md-6"> <label for="firstname">Nom de l'entreprise</label> <input type="text" class="bg-light form-control" placeholder="Steve"/></div>
            <div class="col-md-6"> <label for="email">Adresse Email</label> <input type="text" class="bg-light form-control" placeholder="steve_@email.com"/> </div>
        </div>
        <div class="row py-2">
            <div class="col-md-6 pt-md-0 pt-3"> <label for="phone">Numéro Téléphone</label> <input type="tel" class="bg-light form-control" placeholder="+1 213-548-6015"/> </div>
            <div class="col-md-6"> <label for="firstname">Secteur d'activité</label> <input type="text" class="bg-light form-control" placeholder="Steve"/></div>
        </div>
        <div class="row py-2">
            <div class="col-md-6"> <label for="country">Pays</label> <select name="country" id="country" class="bg-light">
            <option value="Tunisie" selected>Tunisie</option>
            <option value="Algérie">Algérie</option>
            <option value="France">France</option>
                    <option value="usa">USA</option>
                    <option value="uk">UK</option>
                </select> </div>
            <div class="col-md-6 pt-md-0 pt-3" id="lang"> <label for="language">Langue</label>
                <div class="arrow"> <select name="language" id="language" class="bg-light">
                <option value="français" selected>Français</option>
                        <option value="Anglais">Anglais</option>
                        <option value="Anglais_us">Anglais (United States)</option>
                        <option value="enguk">Anglis UK</option>
                        <option value="arab">Arabic</option>
                    </select> </div>
            </div>
        </div>
        <div class="row py-2">
            <div class="col-md-6 pt-md-0 pt-3"> <label for="phone">Mot de passe ancien</label> <input type="password" class="bg-light form-control" /> </div>
            <div class="col-md-6"> <label for="firstname">Nouveau mot de passe</label> <input type="password" class="bg-light form-control" /></div>
        </div>
        <div class="py-3 pb-4 border-bottom"> <button class="btn btn-primary mr-3">Save Changes</button> <button className="btn btn-danger">Cancel</button> </div>
        <div class="d-sm-flex align-items-center pt-3" id="deactivate">
            <div> <b>Désactiver mon compte</b>
            </div>
            <div class="ml-auto"> <button class="btn btn-danger">Désactiver</button> </div>
        </div>
    </div>
</div>
</div>
    )
}
export default Profile;