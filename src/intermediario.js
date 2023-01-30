const { contas } = require('./bancodedados');
const { arrayItensObrigatoriosCadastro, formatacaoNumeroConta, formatacaoSenha, formatacaoValor, formatacaoNumeroContaOrigemEDestino } = require('./uteis/formatacaoPadraoDados');
const arrayItens = [];

const validarSenhaBanco = (req, res, next) => {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.send("senha não informada");
    }
    if (senha_banco !== 'Cubos123Bank') {
        return res.send("senha incorreta");
    }
    next();
}

const validarPreenchimento = (req, res, next) => {
    for (i = 0; i < arrayItens.length; i++) {
        if (!arrayItens[i].item) {
            return res.status(404).json(`O preenchimento do item ${arrayItens[i].nomeItem} é obrigatório`)
        }
        else {
            if (!arrayItens[i].formatoPadrao.test(arrayItens[i].item)) {
                return res.status(404).json(arrayItens[i].mensagemFormatoPadrao);
            }
        }
    }
    next();
}

const setarFormatacaoItensUsuario = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const arrayItens = arrayItensObrigatoriosCadastro;
    arrayItens[0].item = nome;
    arrayItens[1].item = cpf;
    arrayItens[2].item = data_nascimento;
    arrayItens[3].item = telefone;
    arrayItens[4].item = email;
    arrayItens[5].item = senha;
    next();
}

const setarFormatacaoItensAlteracao = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const arrayItens1 = arrayItensObrigatoriosCadastro;
    arrayItens1[0].item = nome;
    arrayItens1[1].item = cpf;
    arrayItens1[2].item = data_nascimento;
    arrayItens1[3].item = telefone;
    arrayItens1[4].item = email;
    arrayItens1[5].item = senha;

    const { numeroConta } = req.params;
    const arrayItens2 = formatacaoNumeroConta;
    arrayItens2[0].item = numeroConta;

    arrayItens = arrayItens1.concat(arrayItens2);
    next();
}

const checarDuplicidadeCPFeEmail = (req, res, next) => {
    const { cpf, email } = req.body;
    if (contas.some((conta) => conta.usuario.cpf === cpf)) {
        return res.status(404).json({ "mensagem": "cpf já cadastrado" })
    }
    if (contas.some((conta) => conta.usuario.email === email)) {
        return res.status(404).json({ "mensagem": "email já cadastrado" })
    }
    next();
}

const setarFormatacaoNumeroContaESenha = (req, res, next) => {
    const { numero_conta, senha } = req.query;

    const arrayItens1 = formatacaoNumeroConta;
    arrayItens1[0].item = numero_conta;
    const arrayItens2 = formatacaoSenha;
    arrayItens2[0].item = senha;
    arrayItens = arrayItens1.concat(arrayItens2);
    next();
}

const setarFormatacaoItensDeposito = (req, res, next) => {
    const { numero_conta, valor } = req.body;

    const arrayItens1 = formatacaoNumeroConta;
    arrayItens1[0].item = numero_conta;
    const arrayItens2 = formatacaoValor;
    arrayItens2[0].item = valor;
    arrayItens = arrayItens1.concat(arrayItens2);
    next();
}

const setarFormatacaoItensSaque = (req, res, next) => {
    const { numero_conta, valor, senha } = req.body;
    const arrayItens1 = formatacaoNumeroConta;
    arrayItens1[0].item = numero_conta;
    const arrayItens2 = formatacaoSenha;
    arrayItens2[0].item = senha;
    const arrayItens3 = formatacaoValor;
    arrayItens3[0].item = valor;
    arrayItens = arrayItens1.concat(arrayItens2, arrayItens3);
    next();
}

const setarFormatacaoItensTransferencia = (req, res, next) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
    const arrayItens1 = formatacaoNumeroContaOrigemEDestino;
    arrayItens1[0].item = numero_conta_origem;
    arrayItens1[1].item = numero_conta_destino;
    const arrayItens2 = formatacaoSenha;
    arrayItens2[0].item = senha;
    const arrayItens3 = formatacaoValor;
    arrayItens3[0].item = valor;
    arrayItens = arrayItens1.concat(arrayItens2, arrayItens3);
    next();
}

const validarValorOperacao = (req, res, next) => {
    const { valor } = req.body;
    if (Number(valor) <= 0) {
        return res.status(404).json({ "mensagem": "Não é permitido operação com valores negativos ou zerados" });
    }
    next();
}

module.exports = {
    validarValorOperacao,
    validarSenhaBanco,
    setarFormatacaoItensDeposito,
    setarFormatacaoItensUsuario,
    setarFormatacaoItensAlteracao,
    setarFormatacaoNumeroContaESenha,
    setarFormatacaoItensTransferencia,
    setarFormatacaoItensSaque,
    checarDuplicidadeCPFeEmail,
    validarPreenchimento
};
