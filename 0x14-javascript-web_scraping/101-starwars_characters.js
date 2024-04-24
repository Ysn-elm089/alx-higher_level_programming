#!/usr/bin/node

const request = require('request');

const movieId = process.argv[2];
const url = `https://swapi-api.alx-tools.com/api/films/${movieId}`;

request.get(url, (error, response, body) => {
  if (error) {
    console.error(error);
  } else {
    const movie = JSON.parse(body);
    const charactersUrls = movie.characters;
    const charactersPromises = charactersUrls.map(characterUrl => new Promise((resolve, reject) => {
      request.get(characterUrl, (err, res, body) => {
        if (err) {
          reject(err);
        } else {
          const character = JSON.parse(body);
          resolve(character.name);
        }
      });
    }));

    Promise.all(charactersPromises)
      .then(characters => {
        characters.forEach(character => console.log(charact

