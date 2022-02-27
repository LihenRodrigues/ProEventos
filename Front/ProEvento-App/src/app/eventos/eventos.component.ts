import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventosFiltrados: any = [];
  public eventos: any = [];
  larguraImagem: number = 150;
  margemImagem: number = 2;
  exibirImagem: boolean = true;
  private _filtroLista: string = '';

  public get filtroLista(): string{
    return this._filtroLista;
  }

  public set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) :this.eventos;
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }

  alterarImagem(){
    this.exibirImagem = !this.exibirImagem;
  }

  filtrarEventos(filtrarPor:string): any{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local: string; }) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  public getEventos(): void{
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      response => {
        this.eventos = response;
        this.eventosFiltrados = this.eventos;
      },
      error => console.log(error),
    );
  }
}
