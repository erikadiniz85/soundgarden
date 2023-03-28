const URL_BOOKINGS = "https://xp41-soundgarden-api.herokuapp.com/bookings/event/";
const URL_ATUAL = window.location.search;
let parametros = new URLSearchParams(URL_ATUAL);
const ID = parametros.get("id");


let tbody = document.querySelector("table tbody");



function pegarReservas(){
    fetch(URL_BOOKINGS + ID)
    .then(resposta => resposta.json())
    .then(data => criarTrReservas(data))
    .catch(error => console.log("Erro ao obter Eventos"))
}



function criarTrReservas(reservas){
    reservas.forEach((evento, index) => {

        let trCriada = criarLayout(index, evento);

        tbody.innerHTML += trCriada;
    });
}


function criarLayout(index, reserva){
    let dataFormatada = new Date(reserva.created_at).toLocaleString('pt-BR', { timeZone: "America/Sao_Paulo", dateStyle: "short", });

    let tr = `
    <tr>
        <th scope="row">${index + 1}</th>
        <td>${dataFormatada}</td>
        <td>${reserva.owner_name}</td>
        <td>${reserva.owner_email}</td>
    </tr>`;

    return tr;
}




pegarReservas();
