enum Match {
    MATCHED, MATCHING, NOT_MATCHED
}

export class StringPatternMatcher{
    patternsToMatch: string[];
    matchesSoFar: Match[] = [];
    textSoFar: string = '';
    constructor(patternsToMatch:string[]){
        this.patternsToMatch = patternsToMatch;
    }
    clearBufor() {this.textSoFar=''; this.matchesSoFar = []}
    feed(nextSymbol:string){
        this.textSoFar += nextSymbol;
    }
    feedWithCheck(nextSymbol:string){
        this.feed(nextSymbol);
        this.matchToAllPatterns();
        const matchedIndex = this.matchesSoFar.findIndex((result) => result === Match.MATCHED);
        if (matchedIndex !== -1) return this.patternsToMatch[matchedIndex];
        const isEveryNotMatched = this.matchesSoFar.every((result) => result === Match.NOT_MATCHED);
        if (isEveryNotMatched) {this.clearBufor()}
        return ''
    }

    matchSingleStrings(strPattern:string, strInput:string) {
        if (strPattern === strInput) { return Match.MATCHED; }
        const patternSubstring = strPattern.substring(0, strInput.length);
        if (patternSubstring === strInput) {return Match.MATCHING};
        return Match.NOT_MATCHED;
    }

    matchToAllPatterns() {
        const that = this;
        const results = this.patternsToMatch.map((patternToMatch:string) => {
            return that.matchSingleStrings(patternToMatch, this.textSoFar);
        });
        this.matchesSoFar = results;
    }

}
