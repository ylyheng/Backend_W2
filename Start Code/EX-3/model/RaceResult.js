import { Duration } from "./Duration.js";
/**
 * This class handle a single race time for a given particicpant and sport type
 */
export class RaceResult {
     /**
      * Participant identifier.
      * @type {string}
      */
     participant_id;

     /**
      * Sport type.
      * @type {string}
      */
     sport;

     /**
      * Race duration.
      * @type {Duration}
      */
     time;

     /**
      * Builds a RaceResult instance.
      * @param {string} participant_id - Participant ID.
      * @param {string} sport - Sport name.
      * @param {Duration} time - Race duration.
      */
     constructor(participant_id, sport, time) {
          this.participant_id = participant_id;
          this.sport = sport;
          this.time = time;
     }
}