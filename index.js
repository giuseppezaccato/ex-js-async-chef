
//!  Esercizio: Trova la Data di Nascita dello Chef

//*  🎯 Obiettivo Principale:
//  Crea una funzione asincrona getChefBirthday(id) che recupera la data di nascita
//  di uno chef attraverso chiamate API sequenziali.

//*  📝 Requisiti:
//  1. La funzione deve essere asincrona e utilizzare await
//  2. Effettuare chiamate API a:
//     - Prima API:  https://dummyjson.com/recipes/{id}
//     - Seconda API: https://dummyjson.com/users/{userId}
//  3. Gestire gli errori con try/catch
//  4. Restituire una Promise con la data di nascita dello chef

//*  🔄 Flusso del Processo:
//  1. Ottieni i dati della ricetta usando l'ID
//  2. Estrai lo userId dai dati della ricetta
//  3. Ottieni i dati dello chef usando lo userId
//  4. Restituisci la data di nascita dello chef

//?  📋 Esempio di Utilizzo:
//  getChefBirthday(1)
//    .then(birthday => console.log("Data di nascita dello chef:", birthday))
//    .catch(error => console.error("Errore:", error.message));

//?  ✨ Output Previsto:
//  Data di nascita dello chef: 1990-06-15

//*  🎯 Bonus Sfida 1:
//  Implementa una migliore gestione degli errori per evitare chiamate API
//  non necessarie quando la ricetta non viene trovata

//*  🎯 Bonus Sfida 2:
//  Utilizza la libreria dayjs per formattare la data di nascita nel formato DD/MM/YYYY
//  Output previsto con formattazione: Data di nascita dello chef: 15/06/1990

//---------------------------------------------RISOLUZIONE ESERCIZIO-----------------------------------------

//funzione di supporto per il parse dei json
//* (volendo fare senza raccogliere in variabile l'await della variabile response 
//* per poi applicare il metodo .json())
// async function fetchData(url) {
//     const res = await fetch(url)
//     const obj = res.json()
//     return obj
// }

const getChefBirthday = async (id) => {

    let recipe
    try {
        const resRecipe = await fetch(`https://dummyjson.com/recipes/${id}`)
        recipe = await resRecipe.json()
    } catch (error) {
        console.error(error)
        throw new Error('problema con fetch recipe', error.message)
    }

    //?controllo per capire dove sta l'errore nel caso in cui recipe.message == true
    if (recipe.message) {
        throw new Error(recipe.message)
    }

    let chef
    try {
        const resChef = await fetch(`https://dummyjson.com/users/${recipe.userId}`)
        chef = await resChef.json()
    } catch (error) {
        console.error(error)
        throw new Error('problema con fetch chef', error.message)

    }

    //?controllo per capire dove sta l'errore nel caso in cui chef.message == true
    if (chef.message) {
        throw new Error(chef.message)
    }

    //? volendo potremmo utilizzare una variabile da assegnare al metodo così:
    //* const birthdayDate = dayjs(chef.birthDate).format('DD / MM / YYYY') 
    //* e successivamente ritornare la variabile
    return dayjs(chef.birthDate).format('DD / MM / YYYY')

}

//funzione esempio tradizionale
// getChefBirthday(10)
//     .then(birthday => console.log("Data di nascita dello chef:", birthday))
//     .catch(error => console.error("Errore:", error.message));

//trasformazione con async/await
(async () => {
    try {
        const birthday = await getChefBirthday(3);
        console.log("Data di nascita dello Chef:", birthday)
    } catch (error) {
        console.error("Errore:", error.message)
    }
})();

