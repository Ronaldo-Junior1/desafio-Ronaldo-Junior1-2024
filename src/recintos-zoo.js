import { Recinto } from './models/recinto.js';
import { Animal } from './models/animal.js';

class RecintosZoo {
  constructor() {
    this.animaisDisponiveis = {
      LEAO: new Animal('LEAO', 3, ['savana'], true), 
      LEOPARDO: new Animal('LEOPARDO', 2, ['savana'], true),  
      CROCODILO: new Animal('CROCODILO', 3, ['rio'], true), 
      MACACO: new Animal('MACACO', 1, ['savana', 'floresta']), 
      GAZELA: new Animal('GAZELA', 2, ['savana']),
      HIPOPOTAMO: new Animal('HIPOPOTAMO', 4, ['savana', 'rio']) 
    };

   
    this.recintos = [
      new Recinto(1, ['savana'], 10, [{ ...this.animaisDisponiveis.MACACO, quantidade: 3 }]),  
      new Recinto(2, ['floresta'], 5),  
      new Recinto(3, ['savana', 'rio'], 7, [{ ...this.animaisDisponiveis.GAZELA, quantidade: 1 }]), 
      new Recinto(4, ['rio'], 8),  
      new Recinto(5, ['savana'], 9, [{ ...this.animaisDisponiveis.LEAO, quantidade: 1 }]) 
    ];
  }


  analisaRecintos(especie, quantidade) {
    if (!this.animaisDisponiveis[especie]) {
      return { erro: "Animal inválido" };
    }


    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      return { erro: "Quantidade inválida" };
    }

    const animal = this.animaisDisponiveis[especie];
    const recintosViaveis = [];


    for (const recinto of this.recintos) {
      if (recinto.podeReceberAnimal(animal, quantidade)) {
        let espacoNecessario = animal.tamanho * quantidade;

        const outrasEspecies = recinto.animais.some(a => a.especie !== animal.especie);
        if (outrasEspecies) {
          espacoNecessario += 1;
        }

      
        const espacoDisponivel = recinto.espacoDisponivel() - espacoNecessario;

        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel} total: ${recinto.tamanhoTotal})`);
      }
    }

    if (recintosViaveis.length > 0) {
      return { recintosViaveis };
    } else {
      return { erro: "Não há recinto viável" };
    }
}

}

export { RecintosZoo as RecintosZoo };