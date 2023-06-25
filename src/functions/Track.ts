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

    constructor({oscillator, tempo, timeSignature, notes, instrument}: {
        oscillator: Oscillators, timeSignature: number | [number, number], notes: any, tempo: number, instrument: any
    }) {
        if (oscillator) this.oscillator = oscillator;
        if (tempo) this.tempo = tempo;
        if (timeSignature) this.timeSignature = timeSignature;
        if (notes) this.notes = notes;
        if (this.instrument) this.instrument = instrument;
        this.createTrack();
        this.createSequence();
        console.log('Creating Track')
    }

    

    createTrack() {
        // this.track = new this.instrument(
        //     { oscillator: { type: this.oscillator } }
        // ).toDestination();
        this.track = this.instrument({oscillator: {type: this.oscillator}});
        Tone.Transport.bpm.value = this.tempo;
        Tone.Transport.timeSignature = this.timeSignature;
    }

    createSequence() {
        this.sequence = new Tone.Part((time, note) => {
                console.log(note)
                    this.track.triggerAttackRelease(note.note, note.duration, time)
            },
            this.notes
        );
    }

    play() {
        this.sequence.start(0); Tone.Transport.start()  
    }
    stop() {
        // this.sequence.stop();
        Tone.Transport.pause()
    }
}
