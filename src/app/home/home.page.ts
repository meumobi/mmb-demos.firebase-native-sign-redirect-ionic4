import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {

  email: string = 'conte@uniarp.edu.br';
  domain: string = 'uniarp.edu.br';
  provider: string;
  providers = [
   'microsoft.com',
   'google.com',
  ]

  constructor(
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.afAuth.auth.getRedirectResult().then(function(result) {
      console.log(result);
    })
    .catch( error => {
      console.log(error);
      throw(error);
    });
  }

  signInWithRedirect() {
    const provider = this.provider;
    const email = this.email;
    const domain = this.domain;
    console.log(provider, email, domain);
    const oAuthProvider = new auth.OAuthProvider(provider);
    if (provider === 'microsoft.com') {
      oAuthProvider.setCustomParameters({tenant: domain, login_hint: email});
    } else if (provider === 'google.com') {
      oAuthProvider.setCustomParameters({hd: domain, login_hint: email});
    }
    return this.afAuth.auth.signInWithRedirect(oAuthProvider).then(data=>console.log(data))
    .catch( error => {
      console.log(error);
      throw(error);
    });
  }


}
