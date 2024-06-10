const {
  deepEqual,
  ok
} = require('assert');

const DataBase = require('./database');

const DEFAULT_ITEM_CADASTRAR = {
  nome: 'Flash',
  poder: 'Speed',
  id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
  nome: 'Lanter Verde',
  poder: 'Energia do anel',
  id: 2
}

describe('Suite de manipulação de Herois', () => {
  before(async () => {
    await DataBase.cadastrar(DEFAULT_ITEM_CADASTRAR);
    await DataBase.cadastrar(DEFAULT_ITEM_ATUALIZAR);
  })

  it('deve pesquisar um heroi, usando arquivos', async () => {
    const expect = DEFAULT_ITEM_CADASTRAR
    const [resultado] = await DataBase.listar(expect.id);

    deepEqual(resultado, expect)
  })

  it('Deve cadastrar um heroi, usando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR
    const resultado = await DataBase.cadastrar(DEFAULT_ITEM_CADASTRAR)
    const [actual] = await DataBase.listar(DEFAULT_ITEM_CADASTRAR.id);

    deepEqual(actual, expected)
  })

  it('Deve remover um heroi por id', async () => {
    const expected = true;
    const resultado = await DataBase.remover(DEFAULT_ITEM_CADASTRAR.id)

    deepEqual(resultado, expected);
  })

  it('Deve atualizr um heroi pelo id', async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: 'Batman',
      poder: 'Dinheiro'
    }

    const novoDado = {
      nome: 'Batman',
      poder: 'Dinheiro'
    }

    await DataBase.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)

    const [resultado] = await DataBase.listar(DEFAULT_ITEM_ATUALIZAR.id);

    deepEqual(resultado, expected)

  })

})