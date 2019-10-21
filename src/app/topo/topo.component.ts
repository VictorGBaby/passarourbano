import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable, Subject, of } from 'rxjs';
import { Oferta } from '../shared/oferta.model';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Array<Oferta>>
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
      .pipe(debounceTime(500), // executa a ação do switchmap apos o tempo passado
        distinctUntilChanged(), // para fazer pesquisas distintas
        switchMap((termo: string) => {

          if (termo.trim() === '') {
            // retornar um observable de array de ofertas vazio
            return of<Array<Oferta>>([])
          }
          return this.ofertasService.pesquisaOfertas(termo)
        }),
        catchError((err: any) => {
          return of<Array<Oferta>>([])
        })
      )
  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca)
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('')
  }

}
