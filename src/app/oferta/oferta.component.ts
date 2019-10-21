import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta

  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) { }

  ngOnInit() {

    this.route.params.subscribe((parametros: Params) => {

      this.ofertasService.getOfertaPorId(parametros.id)
        .then((oferta: Oferta) => {
          this.oferta = oferta
        })
    })



    /*   SUBSCRIBE EXAMPLE
    this.route.params.subscribe(
      (parametro: any) => {
        console.log(parametro)
      },
      (erro: any) => {
        console.log(erro)
      },
      () => {
        console.log('Processamento foi classificado como concluído!')
      }
    )
    */

    // let tempo = interval(2000)

    // this.tempoObservableSubscription = tempo.subscribe((intervalo: number) => {
    //   console.log(intervalo)
    // })

    // //Observable (observável)
    // let meuObservableTeste = Observable.create((observer: Observer<string>) => {
    //   observer.next('Primeiro evento da stream')
    //   //observer.error('Algum erro foi encontrado na stream de eventos')
    //   observer.complete()
    // })


    // //Observable (observador)
    // this.meuObservableTesteSubscription = meuObservableTeste.subscribe(
    //   (resultado: any) => console.log(resultado),
    //   (erro: string) => console.log(erro),
    //   () => console.log('Stream de eventos foi finalizada')
    // )

  }

  ngOnDestroy() {

  }

}
