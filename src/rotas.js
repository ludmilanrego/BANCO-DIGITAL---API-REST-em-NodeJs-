const express = require('express');

const { listarContas, criarConta, atualizarUsuarioConta, excluirConta, emitirSaldo, emitirExtrato, depositar, sacar, transferir } = require('./controladores/contas');
const { validarValorOperacao, validarSenhaBanco, setarFormatacaoNumeroContaESenha, setarFormatacaoItensDeposito, setarFormatacaoItensUsuario, setarFormatacaoItensAlteracao, validarPreenchimento, setarFormatacaoItensTransferencia, setarFormatacaoItensSaque, checarDuplicidadeCPFeEmail } = require('./intermediario');

const rotas = express();

rotas.post('/contas', setarFormatacaoItensUsuario, validarPreenchimento, checarDuplicidadeCPFeEmail, criarConta);
rotas.put('/contas/:numeroConta/usuario', setarFormatacaoItensAlteracao, validarPreenchimento, checarDuplicidadeCPFeEmail, atualizarUsuarioConta);
rotas.delete('/contas/:numeroConta', excluirConta);
rotas.get('/contas/saldo', setarFormatacaoNumeroContaESenha, validarPreenchimento, emitirSaldo);
rotas.get('/contas/extrato', setarFormatacaoNumeroContaESenha, validarPreenchimento, emitirExtrato);
rotas.post('/transacoes/depositar', setarFormatacaoItensDeposito, validarPreenchimento, validarValorOperacao, depositar);
rotas.post('/transacoes/sacar', setarFormatacaoItensSaque, validarPreenchimento, validarValorOperacao, sacar);
rotas.post('/transacoes/transferir', setarFormatacaoItensTransferencia, validarPreenchimento, validarValorOperacao, transferir);

rotas.use(validarSenhaBanco);
rotas.get('/contas', listarContas);

module.exports = rotas;
