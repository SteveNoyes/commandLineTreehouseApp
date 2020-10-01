const https = require('https');
const http = require('http');

function printError(error) {
  console.error(error.message);
}

function printMessage(username, badgeCount, point) {
  const message = `${username} has ${badgeCount} total badge(s) and ${point} points in JavaScript.`;
  console.log(message);
}

function get(username) {
  try {
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
      if (response.statusCode === 200) {
      	let body = '';
      	response.on('data', data => {
        	body += data.toString();
      	});
      	response.on('end', () => {
          try {
        	  const profile = JSON.parse(body);
            printMessage(username, profile.badges.length, profile.points.JavaScript);
          } catch (error) {
            printError(error);
          }
      	});
      } else {
        const message = `There was an error getting profile for ${username} (${http.STATUS_CODES[response.statusCode]})`
        const statusCodeError = new Error(message);
        printError(statusCodeError);
      }

    });
    request.on('error', printError);
  } catch (error) {
    printError(error);
  }
}

module.exports.get = get;
