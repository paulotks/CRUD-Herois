const { readFile, writeFile } = require("fs");

const { promisify } = require("util");

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class DataBase {
  constructor() {
    this.NOME_ARQUIVO = "herois.json";
  }

  async obterDadosAquivo() {
    const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf-8')
    return JSON.parse(arquivo.toString());
  }

  async escreverArquivo(dados) {
    await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados));

    return true;
  }

  async cadastrar(heroi) {
    const dados = await this.obterDadosAquivo()
    const id = heroi.id <= 2 ? heroi.id : Date.now()

    const heroiComId = {
      id,
      ...heroi
    }

    const dadosFinal = [
      ...dados,
      heroiComId
    ]

    const resultado = await this.escreverArquivo(dadosFinal);
    return resultado

  }

  async listar(id) {
    const dados = await this.obterDadosAquivo()
    const dadosFiltrados = dados.filter(item => (id ? (item.id === id): true));

    return dadosFiltrados;
  }

  async remover(id) {
    if (!id) {
      return await this.escreverArquivo([])
    }

    const dados = await this.obterDadosAquivo()

    const indice = dados.findIndex(item => item.id === parseInt(id))

    if(indice === -1 ) {
      throw Error('O usuario informado não existe')
    }

    dados.splice(indice, 1)

    return await this.escreverArquivo(dados);
  }

  async atualizar(id, modificacoes) {
    const dados = await this.obterDadosAquivo()
    const indice = dados.findIndex(item => item.id === parseInt(id))

    if(indice === -1) {
      throw Error('O heroi informado nao existe')
    }

    const atual = dados[indice]
    const objetoAtualizar = {
      ...atual,
      ...modificacoes
    }

    dados.splice(indice, 1)

    return await this.escreverArquivo([
      ...dados,
      objetoAtualizar
    ])
  }
}

module.exports = new DataBase();
