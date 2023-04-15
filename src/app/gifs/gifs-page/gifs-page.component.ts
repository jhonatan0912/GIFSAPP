import { Component, OnInit, inject } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { Gif } from '../interface/gifs.interface';

@Component({
  selector: 'app-gifs-page',
  templateUrl: './gifs-page.component.html',
  styleUrls: ['./gifs-page.component.css']
})
export class GifsPageComponent implements OnInit {

  private gifsService = inject(GifsService);

  get gifs(): Gif[] {
    return this.gifsService.resultados;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
