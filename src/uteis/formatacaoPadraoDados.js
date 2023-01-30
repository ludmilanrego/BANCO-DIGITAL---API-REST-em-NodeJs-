const arrayItensObrigatoriosCadastro = [{
    item: "",
    descricaoItem: "nome",
    formatoPadrao: /\w{2,}/,
    mensagemFormatoPadrao: "Nome Inválido"
},
{
    item: "",
    descricaoItem: "cpf",
    formatoPadrao: /\d{11}/,
    mensagemFormatoPadrao: "O cpf deve ser composto de 11 digitos numéricos"
},
{
    item: "",
    descricaoItem: "data de nascimento",
    formatoPadrao: /\d{4}[-]\d{2}[-]\d{2}/,
    mensagemFormatoPadrao: "A data de nascimento deve ser no formato aaaa-mm-dd"
},
{
    item: "",
    descricaoItem: "telefone",
    formatoPadrao: /\d{2}[-]?\d{9}/,
    mensagemFormatoPadrao: "O telefone deve ser composto de 11 digitos numéricos"
},
{
    item: "",
    descricaoItem: "email",
    formatoPadrao: /\S+@\S+\.\S+/,
    mensagemFormatoPadrao: "Email com formato inválido"
},
{
    item: "",
    descricaoItem: "senha",
    formatoPadrao: /\S{6}/,
    mensagemFormatoPadrao: "A senha deve ter no mínimo 6 caracteres"
}
]

const formatacaoNumeroConta = [
    {
        item: "",
        descricaoItem: "número da conta",
        formatoPadrao: /\d{1}/,
        mensagemFormatoPadrao: "O número da conta deve ser formado por um ou mais dígitos numéricos"
    }
];

const formatacaoSenha = [
    {
        item: "",
        descricaoItem: "senha",
        formatoPadrao: /\S{6}/,
        mensagemFormatoPadrao: "A senha deve ter no mínimo 6 caracteres"
    }
];

const formatacaoValor = [
    {
        item: "",
        descricaoItem: "valor",
        formatoPadrao: /\d{1}/,
        mensagemFormatoPadrao: "O valor deve ser formado por um ou mais dígitos numéricos"
    }
];

const formatacaoNumeroContaOrigemEDestino = [
    {
        item: "",
        descricaoItem: "número da conta de origem",
        formatoPadrao: /\d{1}/,
        mensagemFormatoPadrao: "O número da conta de origem deve ser formado por um ou mais dígitos numéricos"
    },
    {
        item: "",
        descricaoItem: "número da conta de destino",
        formatoPadrao: /\d{1}/,
        mensagemFormatoPadrao: "O número da conta de destino deve ser formado por um ou mais dígitos numéricos"
    }
];

module.exports = {
    arrayItensObrigatoriosCadastro,
    formatacaoNumeroConta,
    formatacaoSenha,
    formatacaoValor,
    formatacaoNumeroContaOrigemEDestino
}

// Fonte:
// https://horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
// https://www.youtube.com/watch?v=Q78zFtgdh4w&t=1179s