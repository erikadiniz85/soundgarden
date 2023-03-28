//URL_API = URL DE EVENTOS
const URL_API = "https://xp41-soundgarden-api.herokuapp.com/events";

const URL_RESERVA = "https://xp41-soundgarden-api.herokuapp.com/bookings";

let divProximosEventos = document.querySelector(".proximos-eventos");

let form = document.querySelector("form");

let botoesReserva = null;

let idEventoClicado = null;

function pegaEventosDaApi(){
    fetch(URL_API)
    .then(resposta => resposta.json())
    .then(listaDeEventos => criarCardProximosEventos(listaDeEventos))
    .catch(error => console.log("Erro ao lista"));
}


function criarCardProximosEventos(listaDeEventos){
    let listaProximosEventos = listaDeEventos.slice(0, 3);

    listaProximosEventos.forEach(evento => {
        let artigoCriado = criarLayoutCard(evento);
        
        divProximosEventos.innerHTML += artigoCriado;
    });

    botoesReserva = document.querySelectorAll(".proximos-eventos .btn-primary");
    
    botoesReserva.forEach(botao => {
        botao.onclick = (ev) => {
            idEventoClicado = ev.target.dataset.id;
        }
    });
}

function criarLayoutCard(dadosEvento){
    let dataFormatada = new Date(dadosEvento.scheduled).toLocaleDateString();

    let article =`
    <article class="evento card p-5 m-3">
        <h2>${dadosEvento.name} - ${dataFormatada}</h2>
        <h4>${dadosEvento.attractions}</h4>
        <p>${dadosEvento.description}</p>
        <a data-id="${dadosEvento._id}" type="button" data-bs-toggle="modal" data-bs-target="#reservaModal" class="btn btn-primary">reservar ingresso</a>
    </article>`;

    return article;
}

form.onsubmit = (ev) => {
    ev.preventDefault();

    let novaReserva = {number_tickets: 1, event_id: idEventoClicado}

    novaReserva.owner_name = document.querySelector("#nome").value;
    novaReserva.owner_email = document.querySelector("#email").value;

    criarReservaNaApi(novaReserva);

    console.log(novaReserva);

}


function criarReservaNaApi(novaReserva){
    fetch(URL_RESERVA, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaReserva),
        // body: JSON.stringify(
        //     {
        //         "owner_name": novaReserva.owner_name,
        //         "owner_email": novaReserva.owner_email,
        //         "number_tickets": novaReserva.number_tickets,
        //         "event_id":novaReserva.event_id
        //     }
        // )
    }).then(resposta => resposta.json())
    .then(resultado => {
        console.log(resultado);

        let host = location.host;

        if (host.includes("leonardofilipe-dev.github.io")) {
            location.replace("/desafio-2/admin.html");
        } else {
            location.replace("/index.html");
        }})
    .catch(error => console.log(error));

}



pegaEventosDaApi();