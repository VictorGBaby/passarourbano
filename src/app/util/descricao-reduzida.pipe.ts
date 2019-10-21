import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform {
    transform(texto: string, truncarEnum: number, iniciarEm: number): string {
        if(texto.length > truncarEnum) {
            return texto.substr(iniciarEm, truncarEnum) + '...'
        } 

        return texto
    }
}