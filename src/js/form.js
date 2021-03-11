document.usuarioForm.onsubmit = async e => {
    e.preventDefault()
    
    function calculaMedia(array) {
        const soma = array.reduce((soma, e) => soma + e)
        const media = soma / array.length
        return media.toFixed(1)
    }
    
    function validaNotas(obj){
        console.log(obj)
        const notas = [obj.nota1, obj.nota2, obj.nota3]
        return notas.map(n => {
            if (n.includes(',')) {
                return n.replace(',', '.')
            } else return n
        }).filter(n => {
            return !(Number.isNaN(n))
        }).map(n => Number(n))
        
    }

    const form = e.target
    const data = new FormData(form)
    const options = {
        method: form.method,
        body: new URLSearchParams(data)
    }

    const divResultado = document.getElementById('resultado')

    fetch(form.action, options)
        .then(resp => resp.json())
        .then(e => validaNotas(e))
        .then(nums => calculaMedia(nums))
        .then(media => divResultado.innerHTML = `Média calculada: ${media}`)
        .catch(e => divResultado.innerHTML = e)
} 