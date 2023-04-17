import axios from 'axios'
const baseUrl = '/api/persons'

/*
  PersonServiceä on mukavampi käyttää kun HTTP-pyynnön vastauksen
  sijaan palautetaan suoraan henkilötiedot sisältävä taulukko.

  Esimerkki modulin käytöstä:

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  Täydellisessä muodossa kirjoitettuna oleva koodimme näyttäisi tältä:
  Koska nuolifunktiolla ei ole muita lauseita, niin se palauttaa ainoan lausekkeensa arvon.
  Tämän vuoksi viimeinen return voidaan jättää pois.

  const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
      return response.data
    })
  }

  Mikäli paluatettaisiin vain http-pyynnön vastaus, riittäisi alla
  oleva koodi:

  const getAll = () => {
    return axios.get(baseUrl)
  }
*/


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

// Olion nimet vastaavat exportattavien muuttujien nimiä. Tämän vuoksi olion
// määrittely voidaan kirjoittaa lyhyemmin. Normaalimuoto olisi
// export default {
// getAll: getAll,
// create: create,
// update: update
// }
export default {getAll, create, update, deletePerson}