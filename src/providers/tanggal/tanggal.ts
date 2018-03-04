import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';


/*
  Generated class for the TanggalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TanggalProvider {
	tanggal: Date;

	constructor(public http: Http) {
		console.log('Hello TanggalProvider Provider');
		this.tanggal = new Date();
	}
	// this function use for get specific day format : dd/mm/yyyy
	public setDateManualy(newTanggal:string)
	{
		this.tanggal.setDate(parseInt(newTanggal.substr(0,2)));
		this.tanggal.setMonth(parseInt(newTanggal.substr(3,2))-1);
		this.tanggal.setFullYear(parseInt(newTanggal.substr(6,4)));
	}

	public setDateNext()
	{
		this.tanggal.setDate(this.tanggal.getDate()+1);
	}
	public setDatePrev()
	{
		this.tanggal.setDate(this.tanggal.getDate()-1);
	}

	// bulan number to namabulan
	private getNamaBulan(bulan)
	{
		let res:string;
		switch (bulan) {
			case 0:
				res = 'Januari';
				break;
			case 1:
				res = 'Februari';
				break;
			case 2:
				res = 'Maret';
				break;
			case 3:
				res = 'April';
				break;
			case 4:
				res = 'Mei';
				break;
			case 5:
				res = 'Juni';
				break;
			case 6:
				res = 'Juli';
				break;
			case 7:
				res = 'Agustus';
				break;
			case 8:
				res = 'September';
				break;
			case 9:
				res = 'Oktober';
				break;
			case 10:
				res = 'November';
				break;
			case 11:
				res = 'Desember';
				break;
			
			default:
				res = 'undefined'
				break;
		}
		return res;
	}
	// bulan number to namabulan
	private getNamaHari(hari)
	{
		let res:string;
		switch (hari) {
			case 0:
				res = 'Ahad';
				break;
			case 1:
				res = 'Senin';
				break;
			case 2:
				res = 'Selasa';
				break;
			case 3:
				res = 'Rabu';
				break;
			case 4:
				res = 'Kamis';
				break;
			case 5:
				res = 'Jumat';
				break;
			case 6:
				res = 'Sabtu';
				break;
			default:
				res = 'undefined'
				break;
		}
		return res;
	}
	// tanggal sekarang dd/mm/yyyy
	public getNow(marker=" ")
	{
		return this.tanggal.getDate() 
		+ marker + (this.tanggal.getMonth()+1) 
		+ marker + this.tanggal.getFullYear();
	}
	//tanggal sekarang lengkap ex: Kamis, 12 Januari 2018
	public getDetailNow()
	{
		return this.getNamaHari(this.tanggal.getDay()) + ', '
		+ this.tanggal.getDate() + ' '
		+ this.getNamaBulan(this.tanggal.getMonth()) + ' '
		+ this.tanggal.getFullYear();
	}
	// timestamp tanggal sekarang
	public getTimestampNow()
	{
		return this.tanggal.getTime();
	}
	// this function to get timezone
	public getTimezone()
	{
		return this.tanggal.getTimezoneOffset()/60*(-1);
	}

	/* this part of time operation or calculating time */
	//erase zero
	private eraseZero(time)
	{
		let res:string;

		if(time<10)
			res = '0'+time;
		else
			res = time;
		return res;
	}
	// konversi jam string to json
	public convertStrJamToTimestamp(strJam, dayAdd=0)
	{
		// str to number
		let tgl = new Date();

		let menit = strJam.substr(3,2)
		let jam = strJam.substr(0,2);
		tgl.setHours(jam);
		tgl.setMinutes(menit);
		return tgl.getTime();
	}
	// cek selisih waktu antara 2 waktu
	public diffTimeMinutes(a, b)
	{
		return Math.round((b-a)/60000);
	}

	// untuk membuat tanggal hijriah
	public getHijri(tanggal, bulan, tahun)
	{
		// http://api.aladhan.com/gToH?date=27-2-2018
		let url:string;
		url ='http://api.aladhan.com/gToH?date='+tanggal+'-'+bulan+'-'+tahun;
		console.log(url);
		// call api aladhan
		return this.http.get(url,{})
		.map(res => res.json())
		.catch((er) => {
			return 'gagal mendapatkan tanggal err : '+er;
		});
	}

	public getHijriNow()
	{
		return this.getHijri(this.tanggal.getDate(), this.tanggal.getMonth()+1, this.tanggal.getFullYear());
	}

	// running jam
	public refreshTanggal(){
		// this.tanggal.setSeconds(this.tanggal.getSeconds() + secondAdder);
		this.tanggal = new Date();
	}

	// get jam
	public getJam()
	{
		return this.eraseZero(this.tanggal.getHours()) 
					+':'+this.eraseZero(this.tanggal.getMinutes());
	}
}
