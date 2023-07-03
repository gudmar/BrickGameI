import * as Tone from "tone";
import { TRIANGLE } from "../constants/constants";
import { Oscillators } from "../types/types";

export class Track {
    oscillator: Oscillators = TRIANGLE;
    tempo: number = 150;
    timeSignature: number | [number, number] = 4;
    notes: any[] = [];
    track: any;
    instrument: any = Tone.Synth;
    sequence: any;
    static debugMode: boolean = false;
    static instances: any[] = [];

    constructor({oscillator, tempo, timeSignature, notes, instrument}: {
        oscillator: Oscillators, timeSignature: number | [number, number], notes: any, tempo: number, instrument: any
    }) {
        Track.instances.push(this);
        if (oscillator) this.oscillator = oscillator;
        if (tempo) this.tempo = tempo;
        if (timeSignature) this.timeSignature = timeSignature;
        if (notes) this.notes = notes;
        if (this.instrument) this.instrument = instrument;
        this.createTrack();
        this.createSequence();
    }

    turnOnDebug() {Track.debugMode = true;}

    createTrack() {
        this.track = this.instrument({oscillator: {type: this.oscillator}}).toDestination();
        Tone.Transport.bpm.value = this.tempo;
        Tone.Transport.timeSignature = this.timeSignature;
    }

    createSequence() {

        this.sequence = new Tone.Part((time, note) => {
                if (Track.debugMode) console.log(note)
                    this.track.triggerAttackRelease(note.note, note.duration, time)
            },
            this.notes
        );
        this.sequence.loop = true;
        this.sequence.loopStart = 0;
        this.sequence.loopEnd = this.getTimeOfLastNote();
    }

    getTimeOfLastNote() {
        const time = this.notes[this.notes.length - 1].time;
        const [tact, ] = time.split(':');
        return `${parseInt(tact) + 1}:${0}`
    }

    play() {
        this.sequence.start(0);
        Tone.Transport.start()
    }
    stop() {
        Tone.Transport.pause()
    }
    clear() {
        Tone.Transport.stop();
        this.sequence.stop();
        this.track.dispose();
    }
}
