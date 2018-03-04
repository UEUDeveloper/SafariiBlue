import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the WaktuSholatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WaktuSholatProvider {
	//property
	private namaSholat: string[];
	private jadwalSholat: any;
	// method
	constructor(private http: Http, private storage: Storage) 
	{
		console.log('Hello WaktuSholatProvider Provider');
		this.initNamaSholat();
	}
	// initialize array nama sholat
	private initNamaSholat():void
	{
		this.namaSholat = ['Shubuh', 'Terbit', 'Zhuhur', 'Ashar','Maghrib', 'Isya'];
	}

	// get namasholat
	public getNamaSholat(withTerbit = false)
	{
		let result = this.namaSholat;
		if(!withTerbit)
			result[1] = '-';

		return result;
	}
	// set jadwalsholat
	public setJadwalSholat(newJadwal)
	{
		this.jadwalSholat = newJadwal;
	}
	// get jadwalsholat
	public getJadwalSholat(lat:number, long:number, timestamp:number, timezone:number)
	{ 
		// calling server to get jadwal sholat
		let url:string;
		url = 'http://safarii.ldkikmi.org/index.php/jadwalsholat/getByDay/1?timestamp='+timestamp
		+'&lat='+lat
		+'&long='+long
		+'&timezone='+timezone.toString(); // define url

		console.log(url); // testing url
		
		return this.http.get(url,{})
					.map(res => res.json())
					.catch((err:Response) => {
			            let details = err.json();
			            return Observable.throw(details);
			         });
	}

	// save jadwalSholat to storage
	public saveJadwalSholatToStorage(newJadwal, tanggal="", geolocation)
	{
		let jadwal = {
			tanggal : tanggal,
			geolocation :geolocation,
			data : newJadwal.data
		};
		this.storage.set('jadwalSholat', jadwal);
		this.setJadwalSholat(newJadwal);
	}

	// load jadwalSholat from storage
	public loadJadwalSholatFromStorage()
	{
		return this.storage.ready().then(()=>{
			return this.storage.get('jadwalSholat');
		});
	}
}
