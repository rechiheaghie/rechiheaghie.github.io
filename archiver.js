let body = {
	"operationName": "programQuery",
	"query": "query programQuery($programId: String!) {\n  programById(id: $programId) {\n    byChild\n    category\n    created\n    creatorProfile: author {\n      id\n      nickname\n      profileRoot\n      profile {\n        accessLevel\n        __typename\n      }\n      __typename\n    }\n    deleted\n    description\n    spinoffCount: displayableSpinoffCount\n    docsUrlPath\n    flags\n    flaggedBy: flaggedByKaids\n    flaggedByUser: isFlaggedByCurrentUser\n    height\n    hideFromHotlist\n    id\n    imagePath\n    isProjectOrFork: originIsProject\n    isOwner\n    kaid: authorKaid\n    key\n    newUrlPath\n    originScratchpad: originProgram {\n      deleted\n      translatedTitle\n      url\n      __typename\n    }\n    restrictPosting\n    revision: latestRevision {\n      id\n      code\n      configVersion\n      created\n      editorType\n      folds\n      __typename\n    }\n    slug\n    sumVotesIncremented\n    title\n    topic: parentCurationNode {\n      id\n      nodeSlug: slug\n      relativeUrl\n      slug\n      translatedTitle\n      __typename\n    }\n    translatedTitle\n    url\n    userAuthoredContentType\n    upVoted\n    width\n    __typename\n  }\n}",
	"variables": {
		"programId":"4880537690423296"
	}
}
var index = 0;
var ids = [];
const fs = require("node:fs");
fs.readFile('/home/rotb/fails.txt', 'utf8', (err, data) => {
	if(err) {
		console.log("PAUL FARKEL IS BEHIND THIS BULLSCHEISSE");
		console.error(err);
		return;
	}
	ids = JSON.parse(data);
	console.log(ids.length);
	//index = ids.indexOf("5063365525") + 1;
});
async function idk() {
	console.log('hoi');
	if(index >= ids.length) return;
	body.variables.programId = ids[index];
	try {
	await fetch("https://www.khanacademy.org/api/internal/graphql/programQuery?lang=en&app=khanacademy&_=260127-1745-7a850421ddc4_1769541412536", {
	  "headers": {
		// "accept": "*/*",
		// "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,mni-Mtei;q=0.7,mni;q=0.6,am;q=0.5,ti;q=0.4",
		"content-type": "application/json",
		// "priority": "u=1, i",
		// "sec-ch-ua": "\"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"144\", \"Brave\";v=\"144\"",
		// "sec-ch-ua-mobile": "?0",
		// "sec-ch-ua-platform": "\"Linux\"",
		// "sec-fetch-dest": "empty",
		// "sec-fetch-mode": "cors",
		// "sec-fetch-site": "same-origin",
		// "sec-gpc": "1",
		// "x-ka-fkey": "1"
	  },
	  "referrer": "https://www.khanacademy.org/computer-programming/divide-gamecoc/4880537690423296",
	  "body": JSON.stringify(body),
	  "method": "POST",
	  "mode": "cors",
	  "credentials": "include"
	}).then(res=>res.json()).then(json=>json.data.programById).then(p=>{
		console.log(ids[index]);
		if(p === null) {
			console.log('Found a dud! >:/');
		} else if(p.id === ids[index]) {
			fs.writeFile(`/home/rotb/archives/${p.id}.txt`, JSON.stringify(p), err => {
				if(err) {console.error(err);}
				else {}
			})
		}
	});
	} catch(e) {
		console.log("PAUL FARKEL IS BEHIND THIS BULLSCHEISSE!!" + e);
		return;
	}
	index++;
}
setInterval(idk, 4999);