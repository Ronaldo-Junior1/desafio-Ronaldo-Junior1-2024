class Recinto {
    constructor(numero, biomas, tamanhoTotal, animais = []) {
      this.numero = numero;
      this.biomas = biomas;
      this.tamanhoTotal = tamanhoTotal;
      this.animais = animais;
    }
  
    espacoDisponivel() {
      const espacoOcupado = this.animais.reduce((total, a) => total + (a.quantidade * a.tamanho), 0);
      return this.tamanhoTotal - espacoOcupado;
    }
  
    
    podeReceberAnimal(novoAnimal, quantidade) {
      const biomaCompativel = this.biomas.some(bioma => novoAnimal.biomas.includes(bioma));
      if (!biomaCompativel) {
        return false;
      }
  
  
      const carnivorosNoRecinto = this.animais.some(a => a.carnivoro);
      if (carnivorosNoRecinto && !novoAnimal.carnivoro) {
        return false;
      }
      if (novoAnimal.carnivoro && this.animais.length > 0) {
        return false;
      }
  
  
      let espacoNecessario = novoAnimal.tamanho * quantidade;
  
      if (this.espacoDisponivel() < espacoNecessario) {
        return false;
      }
  
      if (novoAnimal.tipo === 'MACACO' && this.animais.length === 0 && quantidade < 2) {
        return false;
      }
  
      for (let animalPresente of this.animais) {
        if (!novoAnimal.podeConviver(animalPresente)) {
          return false;
        }
      }
  
      return true;
    }
  
    adicionarAnimal(animal, quantidade) {
      if (this.podeReceberAnimal(animal, quantidade)) {
        const animalExistente = this.animais.find(a => a.tipo === animal.tipo);
        if (animalExistente) {
          animalExistente.quantidade += quantidade;
        } else {
          this.animais.push({ ...animal, quantidade });
        }
        return true;
      }
      return false;
    }
  }
  
  export { Recinto as Recinto };
  