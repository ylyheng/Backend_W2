
import fs from "fs";
import { Duration } from "../model/Duration.js";
import { RaceResult } from "../model/RaceResult.js";

/**
 * This class handle the race results management system.
 */
export class RaceResultsService {
  /**
   * The list of race results.
   * @type {Array<RaceResult>}
   * @private
   */
  _raceResults = [];

  get raceResults() {
    return this._raceResults;
  }

  /**
   * Adds a new race result to the race list.
   * @param {RaceResult} result - The prace result.
   */
  addRaceResult(result) {
    this._raceResults.push(result);
  }

  /**
   * Saves the race results list to a JSON file.
   * @param {string} filePath - The path to the file where data should be saved.
   */
  saveToFile(filePath) {
    const jsonData = JSON.stringify(this._raceResults, null, 2);
    fs.writeFileSync(filePath, jsonData, "utf8");
  }

  /**
   * Loads the race results list from a JSON file.
   * @param {string} filePath - The path to the file to load data from.
   * @returns {boolean} True if loading was successful, false otherwise.
   */
  loadFromFile(filePath) {
    try {
      const data = fs.readFileSync(filePath, "utf8");
      const parsed = JSON.parse(data);

      this._raceResults = parsed.map(
        (item) =>
          new RaceResult(
            item.participant_id,
            item.sport,
            new Duration(item.time?._totalSeconds ?? 0)
          )
      );

      return true;
    } catch (error) {
      console.error("Error loading race results:", error.message);
      return false;
    }
  }

  /**
   * Retrieves the race time for a given participant and sport.
   * @param {string} participantId - Participant ID.
   * @param {string} sport - Sport name.
   * @returns {Duration|null} Duration if found, else null.
   */
  getTimeForParticipant(participantId, sport) {
    const foundResult = this._raceResults.find(
      (result) =>
        result.participant_id === participantId && result.sport === sport
    );

    return foundResult ? foundResult.time : null;
  }

  /**
   * Computes the total time for a given participant by summing their race times.
   * @param {string} participantId - The ID of the participant.
   * @returns {Duration} The total Duration object.
   */
  getTotalTimeForParticipant(participantId) {
    const participantResults = this._raceResults.filter(
      (result) => result.participant_id === participantId
    );

    return participantResults.reduce(
      (totalDuration, result) => totalDuration.plus(result.time),
      new Duration(0)
    );
  }
}
