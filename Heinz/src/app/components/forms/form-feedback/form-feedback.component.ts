import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { Consulta } from 'src/app/models/consulta';
import { Router } from '@angular/router';
import {
  faRefresh,
  faTrash,
  faCircle,
  faFaceSmile,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { AppService } from 'src/app/services/app.service';
import { Postagem } from 'src/app/models/postagem';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-form-feedback',
  templateUrl: './form-feedback.component.html',
  styleUrls: ['./form-feedback.component.css'],
})
export class FormFeedbackComponent implements OnInit {
  consulta: Array<Consulta> = [];

  faRefresh = faRefresh;
  faTrash = faTrash;
  faInstagram = faInstagram;
  faCircle = faCircle;
  faFaceSmile = faFaceSmile;
  faSpinner = faSpinner;

  loadingConsulta: boolean = false;

  async excluirPostagem(id: number): Promise<void> {
    const isConfirmed = await this.alert.confirm(
      'Você tem certeza?',
      'Você deseja realmente deletar essa postagem?',
      'Postagem deletada com sucesso!'
    );

    if (isConfirmed) {
      this.service.deletePostagem(id).subscribe(() => {
        this.consulta = this.consulta.filter((consulta) => consulta.id !== id);
      });
    }
  }

  radioValue: string = 'pesquisar'; // Inicialmente, definido como 'pesquisar'
  inputValue: string = '';

  // Função para alterar o modo com base na seleção do usuário

  private formatData(data: string): string {
    const date = new Date(data);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  async consultar(postagemLink: string) {
    try {
      const resultData: Array<Consulta> = await firstValueFrom(
        this.service.consulta(postagemLink)
      );

      const resultadosFormatados = resultData.map((consulta) => {
        return {
          ...consulta,
          dataCadastro: this.formatData(consulta.dataCadastro),
        };
      });

      this.service.updateConsulta(resultadosFormatados); // Emita a atualização
    } catch (error) {
      console.error('Ocorreu um erro durante a consulta:', error);
    }
  }
  cadastrarPostagem(postagem: Postagem) {
    this.service.postCadastrarPostagem(postagem).subscribe(() => {
      this.consultar('');
    });
  }

  async pesquisar(): Promise<void> {
    try {
      await this.consultar(this.inputValue);
    } catch (error) {
      console.error('Erro ao pesquisar:', error);
    } finally {
    }
  }

  async handleSendClick() {
    try {
      if (this.radioValue === 'pesquisar') {
        await this.pesquisar();
      } else if (this.radioValue === 'cadastrar') {
        this.loadingConsulta = true;
        this.service.getPostagem(this.inputValue).subscribe(
          (dados) => {
            this.cadastrarPostagem(dados);
            this.loadingConsulta = false;
          },
          (error) => {
            console.error('Erro ao buscar dados:', error);
            this.loadingConsulta = false;
            // Adicione aqui qualquer tratamento adicional do erro, se necessário
          }
        );
      } else {
        // Outros casos
      }
    } catch (error) {
      console.error('Erro durante a operação:', error);
      this.loadingConsulta = false;
      // Adicione aqui qualquer tratamento adicional do erro, se necessário
    }
  }

  async updatePostagem(consulta: Consulta) {
    consulta.isRotating = true;
    try {
      const dados = await firstValueFrom(
        this.service.getPostagem(consulta.postagemLink)
      );
      if (dados) {
        const response = await firstValueFrom(
          this.service.updatePostagem(dados)
        );
        if (response) {
          // Atualize a lista de consultas usando o serviço
          this.consultar(this.inputValue);
        } else {
          consulta.isRotating = false;
          console.error('A atualização falhou.');
        }
      } else {
        consulta.isRotating = false;
        console.error('Os dados da postagem não foram encontrados.');
      }
    } catch (error) {
      consulta.isRotating = false;
      console.error('Ocorreu um erro durante a atualização:', error);
    }
    consulta.isRotating = false;
  }
  navegarParaPostagemPage(consultaId: number, consultaEmbedLink: string) {
    console.log('Valores antes de navegar:', consultaId, consultaEmbedLink);

    if (!consultaId || !consultaEmbedLink) {
      console.error('Os parâmetros de consulta estão incompletos!');
      return; // interrompa a execução do método
    }

    this.router.navigate(['/feedback', consultaId, consultaEmbedLink]);
  }

  constructor(
    private service: AppService,
    private alert: AlertService,
    private router: Router
  ) {
    this.service.consulta$.subscribe((consultas) => {
      console.log('Dados recebidos:', consultas);
      this.consulta = consultas;
    });
  }

  ngOnInit(): void {
    this.consultar('');
  }
}
