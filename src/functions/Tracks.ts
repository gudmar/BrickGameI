import * as Tone from "tone";
import { ChordDescriptor, Melody, MelodySettings, Oscillators } from "../types/types";
import { Track } from "./Track";

export class Tracks {
    instruments: {notes: any, oscillator?: Oscillators}[] | undefined;
    chords: {notes: any, oscillator?: Oscillators}[] | undefined;
    settings: MelodySettings = {}
    tracks: any[] = [];
    timeSignature: number | [number, number] = 4
    tempo: number = 150;

    constructor({instruments, settings, chords}: Melody) {
        if (!instruments && !chords) throw new Error('Instruments have to be defined')
        this.instruments = instruments
        this.chords = chords;
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

    getNrOfVoices() {
        if (this.instruments?.length) return 0;
        if (!this.chords) return 0;
        const voices = this.chords.map(({notes}) => notes).map(this.getNrVoicesFromSingleSource)
        return Math.max(...voices);
    }

    getNrVoicesFromSingleSource(source: ChordDescriptor[]) {
        const voices = source.map(({note}) => note.length);
        return Math.max(...voices);
    }

    createTrack({notes, oscillator}: {notes: any, oscillator: Oscillators}){
        const trackCreator = this.chords?.length ? this.createChordsTrack.bind(this) :
            this.createSoloTrack.bind(this);
        const track = trackCreator({notes, oscillator})
        this.tracks.push(track);
    }
    createSoloTrack({notes, oscillator}: {notes: any, oscillator: Oscillators}){
        const track = new Track({
            oscillator,
            tempo: this.tempo,
            timeSignature: this.timeSignature,
            notes,
            instrument: Tone.Synth,
        })
        return track
    }
    createChordsTrack({notes, oscillator}: {notes: any, oscillator: Oscillators}){
        const track = new Track({
            oscillator,
            tempo: this.tempo,
            timeSignature: this.timeSignature,
            notes,
            instrument: Tone.PolySynth,
        })
        return track
    }

    play(){
        this.tracks.forEach((track) => track.play())
    }

    stop(){
        this.tracks.forEach((track) => track.stop())
    }
}
