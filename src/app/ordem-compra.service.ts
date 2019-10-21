import { Pedido } from './shared/pedido.model'
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { URL_API } from './app.api'
import { map } from 'rxjs/operators'

@Injectable()
export class OrdemCompraService {

    constructor(private httpClient: HttpClient) {}

    efetivarCompra(pedido: Pedido): Observable<any> {
        
        let headers: HttpHeaders = new HttpHeaders()

        headers.append('Content-type', 'application.json')

        return this.httpClient.post(
            `${URL_API}/pedidos`,
            (pedido),
            ({headers: headers})
        ).pipe(map((resposta: Response) => resposta['id']))
    }
}