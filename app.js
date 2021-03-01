
// ************ // variables pour la manipulation du dom // ********** //

let mainScreen = document.querySelector('.main-screen');
let pokeName = document.querySelector('.poke-name');
let pokeId = document.querySelector('.poke-id');
let pokeFrontImage = document.querySelector('.poke-front-image');
let pokeBackImage = document.querySelector('.poke-back-image');
let pokeTypeOne = document.querySelector('.poke-type-one');
let pokeTypeTwo = document.querySelector('.poke-type-two');
let pokeWeight = document.querySelector('.poke-weight');
let pokeHeight = document.querySelector('.poke-height');
let rightButton = document.querySelector('.right-button')
let leftButton = document.querySelector('.left-button')

let listItens= Array.from(document.querySelectorAll('.list-item'))

// ************************ // functions infos screen droit // ************************ //

let initRequest = {
    method:'GET',
    headears:{
        "content-type": 'application/json'
    }
}
let url = 'https://pokeapi.co/api/v2/pokemon';  

// ************************ // functions infos screen droit // ************************ //

async function listPokes(){
    let reponse = await fetch(url,initRequest);
    let data    = await reponse.json();


    // ........................... list pokemons ...................................... //

    // .......... chemin pour recouperer le numero du pokemon nPoke sur la url ........ //

    // let urlSplit = data.results[5].url.split("pokemon/")
    // let nPoke = parseInt(urlSplit[1])
    // console.log (urlSplit) // result = ["https://pokeapi.co/api/v2/", "6/"]
    // console.log (nPoke) // result = 6
    // alors...
    // nPoke = parseInt(parseInt(urlSplit[1])
    // nPoke = parseInt(parseInt(data.results[5].url.split("pokemon/")[1])
    // nPoke = parseInt(parseInt(data.results[i].url.split("pokemon/")[1])
    
    // listItens.forEach((item,i) => item.textContent = `${nPoke}. ${data.results[i].name}`) =

    listItens.forEach((item,i) => item.textContent = `${parseInt(data.results[i].url.split("pokemon/")[1])}. ${(data.results[i].name)[0].toUpperCase()+data.results[i].name.substr(1)}`)

    // .......................... buttons next + prev ............................... //


    rightButton.addEventListener('click', async ()=>{
        reponse = await fetch(data.next,initRequest)
        data = await reponse.json()
        listItens.forEach((item,i) => item.textContent = `${parseInt(data.results[i].url.split("pokemon/")[1])}. ${(data.results[i].name)[0].toUpperCase()+data.results[i].name.substr(1)}`)
    })

    leftButton.addEventListener('click', async ()=>{
        reponse = await fetch(data.previous,initRequest)
        data = await reponse.json()
        listItens.forEach((item,i) => item.textContent = `${parseInt(data.results[i].url.split("pokemon/")[1])}. ${(data.results[i].name)[0].toUpperCase()+data.results[i].name.substr(1)}`)
    })

// ************************ // functions infos screen gauche // ************************ //

    listItens.forEach((item,i) => item.addEventListener('click', async ()=>{

    // console.log(e.target)
               
    let pokeRequest = {
        method:'GET',
        headears:{
            "content-type": 'application/json'
        }
    }
    
    let urlPoke = `https://pokeapi.co/api/v2/pokemon/${data.results[i].name}` 
    let reponsePoke = await fetch(urlPoke,pokeRequest);
    let dataPoke    = await reponsePoke.json();
    
// .............. content screen gauche ............... //

    pokeName.textContent = dataPoke.species.name
    pokeFrontImage.src = dataPoke.sprites.front_default   
    pokeBackImage.src = dataPoke.sprites.back_default
    pokeTypeOne.textContent = dataPoke.types[0].type.name

    pokeWeight.textContent = dataPoke.weight
    pokeHeight.textContent = dataPoke.height
    mainScreen.className = pokeTypeOne.textContent

    
//...... funcao para esconder a div do typeTwo quando o pokemon nao tem um segundo tipo ...... //

        if(dataPoke.types.length > 1)
        {
            pokeTypeTwo.textContent = dataPoke.types[1].type.name
            pokeTypeTwo.classList.remove('hide');
        }
        else
        {
            pokeTypeTwo.classList.add('hide');
        }
        mainScreen.className = `${pokeTypeOne.textContent}`


// .............. #00 devant le id poke ............... //

        function checkIdLenght(){
            if (dataPoke.id < 9) {
                return "#00";
            }
            else if (dataPoke.id < 99) {
                return "#0";
            }
            else {
                return "#";    
            }
        }

        let zeroId = checkIdLenght();

    pokeId.textContent = `${zeroId}${dataPoke.id}`

        // *****formate l'id charles ******/
        // pokeId.textContent = '#' + (id.length === 2 ? '0' : (id.length > 2 ? '' : '00')) +id;
             
    }))
}

listPokes();