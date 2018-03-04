import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { WaktuSholatProvider } from '../../providers/waktu-sholat/waktu-sholat';
import { TanggalProvider } from '../../providers/tanggal/tanggal';
import { LokasiProvider } from '../../providers/lokasi/lokasi';

import { Observable } from 'rxjs/Rx';

/**
 * Generated class for the JadwalSholatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-jadwal-sholat',
 	templateUrl: 'jadwal-sholat.html',
 })
 export class JadwalSholatPage {
	// property
	showPage:boolean;
	showHeader:boolean;
	showJadwal:boolean;
	jadwalSholat:any;
	jadwalChange:any;
	jam:string;
	tanggalSekarang:string;
	tanggalChange:string;
	hijri:string;
	waktuSholatSekarang:string;
	waktuSholatSelanjutnya:string;
	waktuAktif:any;
	koneksiGagal:boolean;
	namaKota:any;

	// initialization property base
	constructor(public navCtrl: NavController, 
		public navParams: NavParams, 
		public waktuSholatProvider:WaktuSholatProvider,
		public tanggalProvider:TanggalProvider,
		public lokasiProvider:LokasiProvider
		)
	{
		// inisialisasi option untuk watchPosition
		var option = {
			timeout : 5000,
			enableHighAccuracy:true
		};

		// inisialisasi showPage
		this.showPage = false;
		this.showHeader = true;
		this.showJadwal = true;

		// inisialisasi jam
		this.jam = this.tanggalProvider.getJam();
		this.tanggalSekarang=this.tanggalProvider.getDetailNow();
		this.tanggalChange='-';
		this.hijri= '';
		this.waktuSholatSekarang='';
		this.waktuSholatSelanjutnya='';
		this.koneksiGagal = false;
		this.waktuAktif = {
			shubuh : '',
			zhuhur : '',
			ashar : '',
			maghrib : '',
			isya : '',
			terbit : '',
		};
		this.namaKota = '';
	}

	// starting point when class showed
	ionViewDidLoad() {
		// show status class is called
		console.log('ionViewDidLoad JadwalSholatPage');
			//starting checkLocation to get json jadwal sholat
		this.lokasiProvider.watchLocation(0);
		let posisi;
		setTimeout( () => {
			posisi = this.lokasiProvider.getLocation();
			console.log(posisi);
			this.checkLocation(
				posisi.lat,
				posisi.long,
				posisi.timestamp
				);
		}, 0);	

		this.runTime();
		this.setHijri();
      	// this.lokasiProvider.findKota();
		// setTimeout(()=>{
		this.namaKota = this.lokasiProvider.getNamaKota();
		// }, 1000);
	}

	runTime()
	{
		Observable.interval(5000).subscribe(() =>{
			this.tanggalProvider.refreshTanggal();
			this.jam = this.tanggalProvider.getJam();
			console.log(this.jam);
		});
	}

	setHijri()
	{
		this.tanggalProvider.getHijriNow().subscribe(
			data => {
				if(data.status == 'OK')
				{
					this.hijri = data.data.hijri.day+ ' ' 
					+data.data.hijri.month.en+ ' ' 
					+data.data.hijri.year;
				}
			},
			error=>{
				this.hijri = 'error'+error;
			}
		)
	}

	// untuk mencari waktu sholat saat ini
	setWaktuSholatSekarang()
	{
		let tglprv = this.tanggalProvider;

		let nowTime = tglprv.getTimestampNow();
		let waktuName:string[] = this.waktuSholatProvider.getNamaSholat();
		let waktuIndex:number[] = [
		tglprv.diffTimeMinutes(nowTime,tglprv.convertStrJamToTimestamp(this.jadwalSholat.shubuh)),
		tglprv.diffTimeMinutes(nowTime,tglprv.convertStrJamToTimestamp(this.jadwalSholat.terbit)),
		tglprv.diffTimeMinutes(nowTime,tglprv.convertStrJamToTimestamp(this.jadwalSholat.zhuhur)),
		tglprv.diffTimeMinutes(nowTime,tglprv.convertStrJamToTimestamp(this.jadwalSholat.ashar)),
		tglprv.diffTimeMinutes(nowTime,tglprv.convertStrJamToTimestamp(this.jadwalSholat.maghrib)),
		tglprv.diffTimeMinutes(nowTime,tglprv.convertStrJamToTimestamp(this.jadwalSholat.isya))
		];
		let PrayNext = 0;
		for(let i =0; i < waktuIndex.length; i++)
		{
			if(waktuIndex[i] > 0){
				if(waktuIndex[PrayNext] < 0)
					PrayNext = i;

				if(waktuIndex[i+1] < waktuIndex[PrayNext])
				{
					PrayNext = i+1;
				}
				console.log(waktuIndex[i]);
			}
		}
		this.waktuSholatSelanjutnya = waktuName[PrayNext];
		if(PrayNext == 0)
			this.waktuSholatSekarang = waktuName[5];
		else
		this.waktuSholatSekarang = waktuName[PrayNext-1];
	}
	
	// untuk mengubah status showPage
	setJadwalSholat(data)
	{
		this.jadwalSholat = data;
		console.log(this.jadwalSholat);
	}

	setShowPage()
	{
		this.showPage = true;
	}
	setTanggalChange(newTanggal)
	{
		this.tanggalChange = newTanggal;
	}

	prevDay()
	{
		this.tanggalProvider.setDatePrev();
		let timezone = this.tanggalProvider.getTimezone(); // timezone
		let posisi = this.lokasiProvider.getLocation();

		this.waktuSholatProvider.getJadwalSholat(posisi.lat,posisi.long,this.tanggalProvider.getTimestampNow(),timezone).subscribe(
			data =>{
					console.log('next prev '+data);
					if(data.status == 'ok')
					{
						this.setChangeJadwal(data.data);
						this.setHijri();
						this.setTanggalChange(this.tanggalProvider.getDetailNow())
						if(this.tanggalSekarang == this.tanggalProvider.getDetailNow())
						{
							this.showHeader=true;
							this.showJadwal=true;
						}
						else
						{
							this.showHeader = false;
							this.showJadwal=false;
						}
						
					}
			},
			err =>
			{			
				console.log(err);
				this.gagalkanKoneksi();
			}
		);
	}
	setChangeJadwal(newJadwal)
	{
		this.jadwalChange = newJadwal;
	}

	nextDay()
	{
		this.tanggalProvider.setDateNext();
		let timezone = this.tanggalProvider.getTimezone(); // timezone
		let posisi = this.lokasiProvider.getLocation();

		this.waktuSholatProvider.getJadwalSholat(posisi.lat,posisi.long,posisi.timestamp,timezone).subscribe(
			data =>{
					console.log('next date '+data);
					if(data.status == 'ok')
					{
						this.setChangeJadwal(data.data);
						this.setHijri();
						this.setTanggalChange(this.tanggalProvider.getDetailNow())
						if(this.tanggalSekarang == this.tanggalProvider.getDetailNow())
						{
							this.showHeader=true;
							this.showJadwal=true;
						}
						else
						{
							this.showHeader = false;
							this.showJadwal=false;
						}
						
					}
			},
			err =>
			{			
				console.log(err);
				this.gagalkanKoneksi();
			}
		);
		console.log(this.jadwalChange);
	}
	// untuk ceklokasi sekarang dan ambil jadwal sholat di server
	checkLocation(lat, long, timestamp)
	{
		let timezone = this.tanggalProvider.getTimezone(); // timezone
		let geolocation = {
			lat : lat,
			long :long
		}
		this.waktuSholatProvider.loadJadwalSholatFromStorage().then(
			data => {
				console.log(data);
				if( data.tanggal == this.tanggalProvider.getNow() 
					&& lat == data.geolocation.lat 
					&& long == data.geolocation.long)
				{
					this.setJadwalSholat(data.data);
					this.setShowPage();
					this.setWaktuSholatSekarang();
					console.log('tanggal oke');
				}
				else
				{
					throw console.log('tanggal berbeda');
					
				}
			}).catch(
			err => {
				this.waktuSholatProvider.getJadwalSholat(lat,long,timestamp,timezone).subscribe(
						data =>{
							this.waktuSholatProvider.saveJadwalSholatToStorage(data, this.tanggalProvider.getNow(), geolocation);
								console.log(data);
								if(data.status == 'ok')
								{
									this.setJadwalSholat(data.data);
									this.setShowPage();
									this.setWaktuSholatSekarang();
								}
						},
						err =>
						{			
							console.log(err);
							this.gagalkanKoneksi();
						}
					);
			});
	}

	gagalkanKoneksi()
	{
		this.koneksiGagal = !this.koneksiGagal;
	}

}
