import { RaceResultsService } from "./service/RaceResultsService.js";


const raceResultService = new RaceResultsService();


raceResultService.loadFromFile("./data/raceScores.json");


console.log(raceResultService.raceResults);

const time1 = raceResultService.getTimeForParticipant("participant1", "swim");
console.log(time1 ? time1.toString() : null);


const totalTime1 = raceResultService.getTotalTimeForParticipant("participant1");
console.log(totalTime1.toString());
