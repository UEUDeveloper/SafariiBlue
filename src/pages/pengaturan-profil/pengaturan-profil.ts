import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PengaturanProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pengaturan-profil',
  templateUrl: 'pengaturan-profil.html',
})
export class PengaturanProfilPage {
	public P1type:string;
	public P1showPass:boolean;
	public P2type:string;
	public P2showPass:boolean;
	public isUbahPassword:boolean;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.P1type = "password";
		this.P1showPass = false;
		
		this.P2type = "password";
		this.P2showPass = false;
		this.isUbahPassword = false;
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad PengaturanProfilPage');
	}

	ubahPassword()
	{
		this.isUbahPassword = !this.isUbahPassword;
	}

	showPassword1()
	{
		this.P1showPass = !this.P1showPass;
		if(this.P1showPass)
		{
			this.P1type = "input";
		}
		else
		{
			this.P1type = "password";
		}
	}

	showPassword2()
	{
		this.P2showPass = !this.P2showPass;
		if(this.P2showPass)
		{
			this.P2type = "input";
		}
		else
		{
			this.P2type = "password";
		}
	}
}
