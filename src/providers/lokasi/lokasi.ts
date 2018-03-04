import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the LokasiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var google: any;

@Injectable()
export class LokasiProvider {
	private lokasi:any;
	private namaKota:any;

	constructor(private http: Http, private geolocation:Geolocation, private storage: Storage) {
		console.log('Hello LokasiProvider Provider');
		this.namaKota='-';
	}

	// watch lokasi saat ini
	public watchLocation(timeout = 5000)
	{
		var option = {
			timeout : timeout,
			enableHighAccuracy:true
		};
		this.geolocation.watchPosition(option)
		.filter((p)=> p.coords !== undefined)
		.subscribe(
			data =>{
				console.log('load location from geolocation '+data);
				let newLocation = {
					lat : data.coords.latitude,
					long: data.coords.longitude,
					timestamp:data.timestamp
				};
				this.storage.set('lokasi', newLocation);
				this.setLocation(newLocation);
				console.log(newLocation);
			},
			error =>{
				console.log('error pada :'+error);

				this.loadLocationFromStorage().then(
					data =>{
						if(data == null)
							throw console.log('data null');
							
						console.log('load location from storage '+data);
						this.setLocation(data);
					}
				).catch(
					(err) =>{
						console.log('gagal ' + err);
					}
				);
				
			}
		);

		
	}
	// set location
	public setLocation(newLocation)
	{
		this.lokasi = newLocation;
	}

	// load jadwalSholat from storage
	public loadLocationFromStorage()
	{
		return this.storage.ready().then(()=>{
			return this.storage.get('lokasi');
		});
	}

	// get location now
	public getLocation()
	{
		return this.lokasi;
	}
	// untuk setnama kota awal
	public setNamaKota(newNama)
	{
		this.namaKota = newNama;
	}
	// untuk mengembalikan nilai namakota
	public getNamaKota()
	{
		return this.namaKota;
	}
	// inisialisasi pencarian kota saat ini
	public findKota()
	{
		if(this.lokasi == null)
		{
			this.watchLocation(500);
		}
		let geocoder = new google.maps.Geocoder();
		let latlng = new google.maps.LatLng(this.lokasi.lat,this.lokasi.long);
		let locationGeocoder =  geocoder.geocode({'latLng' : latlng},(results,status) =>{
		      if (status == google.maps.GeocoderStatus.OK) {
		      console.log(results)
		        if (results[1]) {
		         //formatted address
		         console.log(results[0].formatted_address)
		        //find country name
		        let city;
	             for (var i=0; i<results[0].address_components.length; i++) {
		            for (var b=0;b<results[0].address_components[i].types.length;b++) {

		            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
		                if (results[0].address_components[i].types[b] == "administrative_area_level_2") {
		                    //this is the object you are looking for
		                    city= results[0].address_components[i];
		                    break;
		                }
		            }
		        }
		        //city data
		        this.setNamaKota(city.short_name);
		        // save it to local
		        this.storage.set('namaKota', city.short_name);
		        } else {
		          console.log("No results found");
		        }
		      } else {
		        console.log("Geocoder failed due to: " + status);
		      }
		});
	}

	autoComplete(input)
	{
		var options = {componentRestrictions: {country: 'id'}};
		var autocomplete = new google.maps.places.Autocomplete(input, options);
		return autocomplete;
	}
}
