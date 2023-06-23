import * as Tone from "tone";
import { Melody, MelodySettings, Oscillators } from "../types/types";
import { Track } from "./Track";

export class Tracks {
    instruments: {notes: any, oscillator?: Oscillators}[] | null = null;
    settings: MelodySettings = {}
    tracks: any[] = [];
    timeSignature: number | [number, number] = 4
    tempo: number = 150;

    constructor({instruments, settings}: Melody) {
        if (!instruments) throw new Error('Instruments have to be defined')
        this.instruments = instruments
        const timeSignature = settings?.timeSignature;
        const tempo = settings?.tempo;
        if (timeSignature) this.timeSignature = timeSignature;
        if (tempo) this.tempo = tempo;
        this.createTracks();
    }

    createTracks() {
        this.instruments?.forEach(({notes, oscillator}) => this.createTrack({
            notes, 
            oscillator: oscillator as Oscillators
        }))
    }
    createTrack({notes, oscillator}: {notes: any, oscillator: Oscillators}){
        const track = new Track({
            oscillator,
            tempo: this.tempo,
            timeSignature: this.timeSignature,
            notes,
            instrument: Tone.Synth,
        })
        this.tracks.push(track);
    }
    play(){
        this.tracks.forEach((track) => track.play())
    }

    stop(){
        this.tracks.forEach((track) => track.stop())
    }
}
