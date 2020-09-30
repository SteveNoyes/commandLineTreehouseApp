const https = require('https');
const username = "stevennoyes";

function printMessage(username, badgeCount, point) {
  const message = `${username} has ${badgeCount} total badge(s) and ${point} points in JavaScript.`;
  console.log(message);
}

const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
	let body = '';			
	response.on('data', data => {
  	body += data.toString();
	});

	response.on('end', () => {
	  const profile = JSON.parse(body);
	  
    printMessage(username, profile.badges.length, profile.points.JavaScript);
					
	});
});
