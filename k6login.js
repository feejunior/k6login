import http from 'k6/http'
import { sleep, check } from 'k6'

export default function () {
    const url = 'sua.url'
    
    // Vai o token que pegamos na url 
    const headersApp = { 
        headers: {
            'Content-Type': 'application/json',
	    'Authorization': 'Basic -token-'
        }
    }
    // Requisição pra gerar o token de aplicação 
    const resApp = http.get(url + 'caminho/para/gerar/api', headersApp)
    // Atribuída a resposta da requisição pra essa constante
    const bodyApp = resApp.body

    // O Authorization vai receber a palavra "Bearer " e vai concatenar com o campo "token" da resposta da primeira requisição
    const headersLogin = {
	headers: {
            'Content-Type': 'application/json',
	    'Authorization': 'Bearer ' + bodyApp.token
	}
    }
 // Credenciais de login
    const payloadLogin = {
	"document": "CPF",
	"password": "Senha_Cadastrada"
    }
    
    // Estrutura de requisição que vai fazer a autenticação do usuário
    const resLogin = http.post(url + 'caminho/para/autentica/usuário', payloadLogin, headersLogin)
    
    // Imprime o corpo da requisição, se tudo ocorrer bem, retornará o que foi setado
    console.log(resApp.body)
    check(resApp, {
        'status should be 200': (r) => r.status === 200
    })

    sleep(1)
}
