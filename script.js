async function buscarPokemon() {

    const pokemon = document
        .getElementById("pokemonName")
        .value
        .toLowerCase();

    if (!pokemon) return;

    try{

        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        if(!resposta.ok){
            throw new Error();
        }

        const dados = await resposta.json();

        document.getElementById("pokemonImage").src =
            dados.sprites.other["official-artwork"].front_default;

        document.getElementById("pokemonNome").textContent =
            dados.name;

        document.getElementById("pokemonNumero").textContent =
            "#" + dados.id;

        document.getElementById("altura").textContent =
            "Altura: " + dados.height/10 + " m";

        document.getElementById("peso").textContent =
            "Peso: " + dados.weight/10 + " kg";

        const tipos = document.getElementById("tipos");
        tipos.innerHTML="";

        dados.types.forEach(tipo=>{

            tipos.innerHTML += `
                <span class="tipo">
                    ${tipo.type.name}
                </span>
            `;

        });

    }

    catch{

        alert("Pokémon não encontrado.");

    }

}

document
.getElementById("pokemonName")
.addEventListener("keypress",function(e){

    if(e.key==="Enter"){
        buscarPokemon();
    }

});