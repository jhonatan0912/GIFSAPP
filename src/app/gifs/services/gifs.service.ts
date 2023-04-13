import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient) {
  }

  private apiKey: string = 'sFPUjFWUFrB4Vk0us9ORhJwKsuPdWspO'
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial]
  }

  buscarGifs(query: string = '') {

    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=sFPUjFWUFrB4Vk0us9ORhJwKsuPdWspO&q=${query}&limit=10`)
      .subscribe((response) => {
        console.log(response.data);
        this.resultados = response.data
      })

    console.log(this._historial);
  }

}
