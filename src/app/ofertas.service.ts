import { Oferta } from './shared/oferta.model'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { URL_API } from './app.api'
import { Observable } from 'rxjs'
import { map, retry } from 'rxjs/operators'

@Injectable()
export class OfertasService {
    
    constructor(private httpClient: HttpClient){}

    public getOfertas(): Promise<Array<Oferta>> {
        // efetuar uma requisição http
        // retornar um premise Oferta[]

        return this.httpClient.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: any) => resposta)
    }

    public getOfertasPorCategoria(categoria: string) : Promise<Array<Oferta>> {
        return this.httpClient.get(`${URL_API}/ofertas?categoria=${categoria}`)
        .toPromise()
        .then((resposta: any) => resposta)
    }

    public getOfertaPorId(id: number): Promise<Oferta> {
        return this.httpClient.get(`${URL_API}/ofertas?id=${id}`)
        .toPromise()
        .then((resposta: any) => {
            return resposta.shift()
        })
    }

    public getComoUsarOfertaPorId(id: number): Promise<string> {
        return this.httpClient.get(`${URL_API}/como-usar?id=${id}`)
        .toPromise()
        .then((resposta: any) => {
            return resposta.shift().descricao
        })
    }

    public getOndeFicaOfertaPorId(id: number): Promise<string> {
        return this.httpClient.get(`${URL_API}/onde-fica?id=${id}`)
        .toPromise()
        .then((resposta: any) => {
            return resposta.shift().descricao
        })
    }

    public pesquisaOfertas(termo: string): Observable<Array<Oferta>> {
        return this.httpClient.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
        .pipe(retry(10))
        .pipe(map((resposta: any) => resposta))
    }
}