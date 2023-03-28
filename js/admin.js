const URL_EVENTS = "https://xp41-soundgarden-api.herokuapp.com/events";


let tbody = document.querySelector("table tbody");



function pegarevento(){
    fetch(URL_EVENTS)
    .then(resposta => resposta.json())
    .then(data => criarTrEventos(data))
    .catch(error => console.log("Erro ao obter Eventos"))
}



function criarTrEventos(events){
    events.forEach((evento, index) => {

        let trCriada = criarLayout(index, evento);

        tbody.innerHTML += trCriada;
    });
}


function criarLayout(index, evento){
    let dataFormatada = new Date(evento.scheduled).toLocaleString();

    let tr = `
    <tr>
        <th scope="row">${index + 1}</th>
        <td>${dataFormatada.substring(0, dataFormatada.length - 3)}</td>
        <td>${evento.name}</td>
        <td>${evento.attractions}</td>
        <td>
            <a href="reservas.html?id=${evento._id}" class="btn btn-dark">ver reservas</a>
            <a href="editar-evento.html?id=${evento._id}" class="btn btn-secondary">editar</a>
            <a href="excluir-evento.html?id=${evento._id}" class="btn btn-danger">excluir</a>
        </td>
    </tr>`;

    return tr;
}




pegarevento();
