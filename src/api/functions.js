import Polyfill from 'babel-polyfill'; //Required to be able to use Async/Await

export const callAPI = {
  getHoroscopes: async (sign, day) => {
    // let resp = await fetch('https://aztro.sameerkumar.website/?sign=' + sign + '&day=' + day, {method: 'POST'});
    // let json = await resp.json();
    // return json;

    let ret = {
      horoscopeA: {},
      horoscopeB: {},
      conjunctAdvice: {},
      characterRNM: {},
    };

    let resp = await fetch('https://aztro.sameerkumar.website/?sign=' + sign + '&day=' + day, { method: 'POST' });
    ret.horoscopeA = await resp.json();

    resp = await fetch('https://aztro.sameerkumar.website/?sign=' + ret.horoscopeA.compatibility + '&day=' + day, { method: 'POST' });
    ret.horoscopeB = await resp.json();

    let num = parseInt(ret.horoscopeA.lucky_number) + parseInt(ret.horoscopeB.lucky_number) - 1;
    resp = await fetch('https://api.adviceslip.com/advice/' + num);
    let advice = await resp.json();
    ret.conjunctAdvice = advice.slip.advice;

    try {
      resp = await fetch('https://rickandmortyapi.com/api/character/' + (parseInt(ret.horoscopeA.lucky_number) - 1));
      ret.characterRNM = await resp.json();
    } catch (err) {
      ret.characterRNM = err;
    }

    return ret;
  },
  getChucksJoke: function () {
    return new Promise((resolve, reject) => {
      fetch('https://api.icndb.com/jokes/random?escape=javascript')
        .then(res => res.json())
        .then(data => {
          resolve(data.value.joke);
        })
    });
  },
  getRandomJoke: async () => {
    let json;
    try {
      let resp = await fetch('https://official-joke-api.appspot.com/random_joke');
      json = await resp.json();
    } catch (err) {
      json = err;
    }
    return json;
  },
  getRandomActivity: async () => {
    let resp = await fetch('https://www.boredapi.com/api/activity/');
    let json = await resp.json();
    return json;
  },
  getConjunctAdvice: async (id) => {
    let resp = await fetch('https://api.adviceslip.com/advice/' + id);
    let json = await resp.json();
    return json.slip.advice;
  },
  getCharacterRNM: async (id) => {
    let json;
    try {
      let resp = await fetch('https://rickandmortyapi.com/api/character/' + id);
      json = await resp.json();
    } catch (err) {
      json = err;
    }
    return json;
  }
}