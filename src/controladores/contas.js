const { contas, idConta, saques, depositos, transferencias } = require('../bancodedados');
const { format } = require('date-fns');

const buscarContaEValidar = (contas, numeroConta, res) => {
    const contaSolicitada = contas.find((conta) => {
        return conta.numero === Number(numeroConta);
    });
    if (!contaSolicitada) {
        return res.status(404).json({ "mensagem": "número de conta inválido" })
    }
    return contaSolicitada;
}

const validarSenha = (senha, senhaUsuario, res) => {
    if (senha !== senhaUsuario) {
        return res.status(404).json({ "mensagem": "Senha incorreta" })
    }
}

const listarContas = (req, res) => {
    res.send(contas);
}

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const conta = {
        numero: ++idConta,
        saldo: 0,
        usuario: {
            nome: nome,
            cpf: cpf,
            data_nascimento: data_nascimento,
            telefone: telefone,
            email: email,
            senha: senha
        }
    }
    contas.push(conta);
    return res.status(201).json();
}

const atualizarUsuarioConta = (req, res) => {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const contaSolicitada = buscarContaEValidar(contas, numeroConta, res);
    contaSolicitada.usuario.nome = nome;
    contaSolicitada.usuario.cpf = cpf;
    contaSolicitada.usuario.data_nascimento = data_nascimento;
    contaSolicitada.usuario.telefone = telefone;
    contaSolicitada.usuario.email = email;
    contaSolicitada.usuario.senha = senha;
    return res.status(204).json();
}

const excluirConta = (req, res) => {
    const { numeroConta } = req.params;
    const contaExcluir = buscarContaEValidar(contas, numeroConta, res);

    if (contaExcluir.saldo !== 0) {
        return res.status(404).json({ "mensagem": "A conta só pode ser removida se o saldo for zero!" });
    }

    contas = contas.filter((conta) => {
        return conta.numero !== Number(numeroConta);
    })
    return res.status(204).json();
}

const emitirSaldo = (req, res) => {
    const { numero_conta, senha } = req.query;

    const contaSaldo = buscarContaEValidar(contas, numero_conta, res);
    validarSenha(senha, contaSaldo.usuario.senha, res);

    return res.status(200).json({ "saldo": contaSaldo.saldo });
}

const emitirExtrato = (req, res) => {
    const { numero_conta, senha } = req.query;

    const contaExtrato = buscarContaEValidar(contas, numero_conta, res);
    validarSenha(senha, contaExtrato.usuario.senha, res);

    const depositosConta = depositos.filter((deposito) => {
        return deposito.numero_conta === numero_conta;
    })
    const saquesConta = saques.filter((saque) => {
        return saque.numero_conta === numero_conta;
    })
    const transferenciasEnviadas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_origem === numero_conta;
    })
    const transferenciasRecebidas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_destino === numero_conta;
    })
    const extrato = {
        depositos: depositosConta,
        saques: saquesConta,
        transferenciasEnviadas: transferenciasEnviadas,
        transferenciasRecebidas: transferenciasRecebidas
    }
    return res.status(200).json({ "extrato": extrato });
}

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;

    const contaSolicitada = buscarContaEValidar(contas, numero_conta, res);
    contaSolicitada.saldo += Number(valor);

    const deposito = {
        data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        numero_conta: numero_conta,
        valor: valor
    }
    depositos.push(deposito);
    return res.status(204).json();
}

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    const contaSolicitada = buscarContaEValidar(contas, numero_conta, res);
    validarSenha(senha, contaSolicitada.usuario.senha, res);

    if (Number(valor) > contaSolicitada.saldo) {
        return res.status(404).json({ "mensagem": "Não há saldo suficiente para saque solicitado" })
    }
    contaSolicitada.saldo -= Number(valor);

    const saque = {
        data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        numero_conta: numero_conta,
        valor: valor
    }
    saques.push(saque);
    return res.status(204).json();
}

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    const contaOrigem = buscarContaEValidar(contas, numero_conta_origem, res);
    const contaDestino = buscarContaEValidar(contas, numero_conta_destino, res);
    validarSenha(senha, contaOrigem.usuario.senha, res);

    if (Number(valor) > contaOrigem.saldo) {
        return res.status(404).json({ "mensagem": "Não há saldo suficiente para saque solicitado" })
    }
    contaOrigem.saldo -= Number(valor);
    contaDestino.saldo += Number(valor);

    const transferencia = {
        data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        numero_conta_origem: numero_conta_origem,
        numero_conta_destino: numero_conta_destino,
        valor: valor
    }
    transferencias.push(transferencia);
    return res.status(204).json();
}

module.exports = {
    listarContas,
    criarConta,
    atualizarUsuarioConta,
    excluirConta,
    emitirSaldo,
    emitirExtrato,
    depositar,
    sacar,
    transferir
}