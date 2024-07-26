function chamarPokemonHabilidades() {
    let user = "roxos";
    let escolhaUSER = document.getElementById("pok").value;
    let respost = document.getElementById("resposta");
    if(user === "roxos" ||user === "Roxos" ||user === "Roxo" ||user === "roxo") {
        fetch("https://pokeapi.co/api/v2/pokemon-color/7/") //pokemons roxos
        .then(response => {
            console.log(response);
            if(!response.ok) {
                throw new Error("Existe um erro na sua requisição");
            }

            return response.json();
        })
        .then(respJSON => {
            console.log(respJSON.pokemon_species)
            let pokeCerto = null
            let pokeurl = null
            for(let c = 0; c < respJSON.pokemon_species.length; c++) {
                if (escolhaUSER.toLowerCase() === respJSON.pokemon_species[c].name) {
                pokeCerto = escolhaUSER;
                pokeurl = respJSON.pokemon_species[c].url
                break;
                }
            }
        if(pokeCerto) {
            respost.innerHTML = `Você escolheu um pokemon roxo existente!<br><strong>${pokeCerto}</strong><br>`
        } else {
            respost.innerHTML = `Pokemon não foi encontrado!`
        }
        return fetch(pokeurl)
        })
        .then(res => {
            if(!res.ok) {
                throw new Error("Erro ao carregar as habilidades do pokemon");
            }

            return res.json();
        })
        .then(ret => {
            const abilitiesURL = ret.varieties[0].pokemon.url;
            return fetch(abilitiesURL);
        })
        .then(res => {
            if(!res.ok) {
                throw new Error("Erro ao carregar as habilidades");
            }

            return res.json();
        })
        .then(ret => {
            let habilidadePok = ret.abilities[0].ability.name;
            let spritePokemon = ret.forms[0].url;
            respost.innerHTML += `Habilidade inicial: <br><strong>${habilidadePok}</strong></br>`;
            return fetch(spritePokemon);
        })
        .then(reb => {
            if(!reb.ok) {
                throw new Error("Erro ao carregar a imagem do pokemon.");
            }

            return reb.json();
        })
        .then(ref => {
            let imagemPok = ref.sprites.front_default;
            let imgElemento = document.createElement("img");
            imgElemento.src = imagemPok;
            imgElemento.style.width = "300px"
            imgElemento.style.height = "300px"
            let res = document.getElementById("resposta");
            res.appendChild(imgElemento);
        })
        .catch(error => {
            throw new Error("ERRO:", error);
        });
    };
};