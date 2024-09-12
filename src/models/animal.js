class Animal{
    constructor(especie, tamanho, biomas, carnivoro, regrasEspeciais = {}) {
        this.especie = especie;
        this.tamanho = tamanho;
        this.biomas = biomas;
        this.carnivoro = carnivoro;
        this.regrasEspeciais = regrasEspeciais;
      }

      podeViverNoBioma(bioma) {
        return this.biomas.includes(bioma);
      }

      podeConviver(animal) {
        if (this.carnivoro) {
          return animal.especie === this.especie;
        }
        return true; 
      }
}

export{Animal as Animal};