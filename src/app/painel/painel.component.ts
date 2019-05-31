import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frase-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public frases: Frase[]=FRASES
  public resposta: string = ''
  public rodada: number = 0
  public rodadaFrase: Frase
  public progresso: number = 0
  public tentativas: number = 3
  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() {
    this.rodadaFrase = this.frases[this.rodada]

 }

  ngOnInit() {
  }

  public atualizaResposta(resposta: Event): void{
      this.resposta = (<HTMLInputElement>resposta.target).value
  }

  public verificarResposta(): void{
    if(this.rodadaFrase.frasePtBr === this.resposta){
      alert("Resposta corretammm!")
      this.rodada++
      this.progresso = this.progresso + (100 / this.frases.length)

      if(this.rodada === this.frases.length){
        this.encerrarJogo.emit('vitoria')
      }
      this.rodadaFrase = this.frases[this.rodada]
    } else {
      this.tentativas--
      if(this.tentativas==-1){
        this.encerrarJogo.emit('perdeu')
      }
      alert("Errrrrooooooo!")
    }
  }
}
