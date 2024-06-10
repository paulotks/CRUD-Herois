const {Command} = require('commander');
const Heroi = require('./heroi');
const DataBase = require('./database');

async function main() {

  const Commander = new Command();

  Commander
    .option('v1')
    .option('-n, --nome [value]', "Nome do Heroi")
    .option('-p, --poder [value', "Poder de Heroi")
    .option('-i, --id [value', "Id do Heroi")

    .option('-c, --cadastrar', "Cadastrar um Heroi")
    .option('-l, --listar', "Listar Herois")
    .option('-r, --remover [value]', "remove um Herois")
    .option('-a, --atualizar [value]', "Atualizar um heroi pelo id")
    .parse(process.argv)

    const options = Commander.opts();
    const heroi = new Heroi(options);

  try {
    if(options.cadastrar) {
      delete heroi.id;
      const resultado = await DataBase.cadastrar(heroi);

      if(!resultado) {
        console.error('Heroi não foi cadastrado!')
        return
      }

      console.log('Heroi cadastrado com sucesso!')
    }

    if (options.listar) {
      const resultado = await DataBase.listar();
      console.log(resultado);
      return;
    }
    
    if(options.remover) {
      const resultado = await DataBase.remover(heroi.id)
      if(!resultado) {
        console.error('Não foi possivel remover heroi')
        return
      }

      console.log('Heroi removido com sucesso')
    }

    if (options.atualizar) {
      const idParaAtualizar = parseInt(options.atualizar)
      //remopver as chaves nulas e undefined

      const dado = JSON.stringify(heroi)
      const heroiAtualizar = JSON.parse(dado)
      const resultado = await DataBase.atualizar(idParaAtualizar, heroiAtualizar);

      if (!resultado) {
        console.error('Não foi possivel atualziar heroi')
        return
      }

      console.log('Heroi atualizado com sucesso!');

    }

  } catch (error) {
    console.error('DEU RUIM', error)
  }


}

main()