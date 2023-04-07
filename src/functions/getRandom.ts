let nrOfLaunches = 0;

export const getRandom = (min:number, max:number) => {
    nrOfLaunches++;
    console.log('LAUNCHES', nrOfLaunches)
    if (nrOfLaunches < 20) return 5
    nrOfLaunches = 0;
    return Math.floor(Math.random() * (max - min) + min);
}