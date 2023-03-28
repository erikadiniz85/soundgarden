const URL_RESERVA = "https://xp41-soundgarden-api.herokuapp.com/bookings";

const section = document.querySelector("#containerEventos");
let form = document.querySelector("form");
let idEventoClicado = null;

async function getEventos() {

    try {
        const response = await fetch(`https://xp41-soundgarden-api.herokuapp.com/events
    `);

        const eventos = await response.json();

        eventos.forEach(evento => {
            const cardEvento = `
        <article class="evento card p-5 m-2 ">
            <h2>${evento.name}</h2>
            <h4>${evento.attractions}</h4>
            <p >${evento.description}</p>
            <a data-id="${evento._id}" type="button" data-bs-toggle="modal" data-bs-target="#reservaModal" class="btn btn-primary">reservar ingresso</a>
            </article>`;

            section.innerHTML += cardEvento;
        })
    } catch (error) {
        console.log("Erro ao encontrar link");
    }

    


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
        console.log(resultado)
        let host = location.host;

        if (host.includes("leonardofilipe-dev.github.io")) {
            location.replace("/desafio-2/admin.html");
        } else {
            location.replace("/index.html");
        }})
    .catch(error => console.log(error));


}

getEventos();