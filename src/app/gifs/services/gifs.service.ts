import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'sFPUjFWUFrB4Vk0us9ORhJwKsuPdWspO'
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  private http = inject(HttpClient);

  get historial() {
    return [...this._historial]
  }

  buscarGifs(tag: string = '') {
    tag = tag.trim().toLocaleLowerCase();
    if (!this._historial.includes(tag)) {
      this._historial.unshift(tag);
      this._historial = this._historial.splice(0, 10);
    }
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=sFPUjFWUFrB4Vk0us9ORhJwKsuPdWspO&q=${tag}&limit=10`)
      .subscribe((response) => {
        console.log(response.data);
        this.resultados = response.data
        this.saveLocalStorage();
      });
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._historial));
  }

}
