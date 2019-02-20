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
    let json = await resp.json();
    let { compatibility, description, lucky_number, mood } = json;
    ret.horoscopeA = { compatibility, description, lucky_number, mood };


    resp = await fetch('https://aztro.sameerkumar.website/?sign=' + ret.horoscopeA.compatibility + '&day=' + day, { method: 'POST' });
    json = await resp.json();
    ({ compatibility, description, lucky_number, mood } = json);
    ret.horoscopeB = { compatibility, description, lucky_number, mood };

    let num = parseInt(ret.horoscopeA.lucky_number) + parseInt(ret.horoscopeB.lucky_number) - 1;
    resp = await fetch('https://api.adviceslip.com/advice/' + num);
    json = await resp.json();
    ret.conjunctAdvice = json.slip.advice;

    try {
      resp = await fetch('https://rickandmortyapi.com/api/character/' + (parseInt(ret.horoscopeA.lucky_number) - 1));
      json = await resp.json();
      let { name, gender, image, species, status, origin: { name: oName }, location: { name: lName } } = json;
      ret.characterRNM = { name, gender, image, species, status, origin: oName, location: lName };
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
    let res;
    try {
      let resp = await fetch('https://official-joke-api.appspot.com/random_joke');
      let json = await resp.json();
      let { setup, punchline } = json;
      res = { setup, punchline };
    } catch (err) {
      res = err;
    }
    return res;
  },
  getRandomActivity: async () => {
    let resp = await fetch('https://www.boredapi.com/api/activity/');
    let json = await resp.json();
    let { activity, type } = json;
    let res = { activity, type };
    return res;
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