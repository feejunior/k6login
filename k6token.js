import http from 'k6/http'
import { sleep, check } from 'k6'

export default function () {
    const url = 'sua.url.com.token'

    const headers = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'caminho/para/gerar/api'
        }
    }
    const res = http.get(url, headers)

    console.log(res.body)
    check(res, {
        'status should be 200': (r) => r.status === 200
    })

    sleep(1)
}
