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

    clear() {
        this.clearTracks();
        this.instruments = undefined;
        this.chords = undefined;
        this.settings = {}
        this.tracks = [];
        this.timeSignature = 4;
        this.tempo = 150;
    }

    createTracks() {
        const soundSources = this.chords ? this.chords : this.instruments;
        if (!soundSources) throw new Error('No sound sources defined')
        console.log(soundSources)
        soundSources.forEach(({notes, oscillator}) => this.createTrack({
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
    monoSynthCreator(options: any) {
        const synth = new Tone.Synth(options)
        return synth
    }
    createSoloTrack({notes, oscillator}: {notes: any, oscillator: Oscillators}){
        const track = new Track({
            oscillator,
            tempo: this.tempo,
            timeSignature: this.timeSignature,
            notes,
            instrument: this.monoSynthCreator.bind(this),
        })
        return track
    }
    polySyncCreator(options: any){
        const synth = new Tone.PolySynth().toDestination();
        synth.set(options)
        return synth
    }
    createChordsTrack({notes, oscillator}: {notes: any, oscillator: Oscillators}){

        const track = new Track({
            oscillator,
            tempo: this.tempo,
            timeSignature: this.timeSignature,
            notes,
            instrument: this.polySyncCreator.bind(this),
        })
        return track
    }

    play(){
        this.tracks.forEach((track) => track.play())
    }

    stop(){
        this.tracks.forEach((track) => track.stop())
    }

    clearTracks() {
        this.tracks.forEach((track) => track.clear())
    }
}
