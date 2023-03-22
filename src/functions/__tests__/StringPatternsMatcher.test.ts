import { keyCodes } from "../KeyReader";
import { StringPatternMatcher } from "../StringPatternsMatcher"

const MONEY = 'show me the money';
const MAP = 'black sheep wall';
const IMMORTALITY = 'IDDQD';
const EQUIP = 'IDKFA';
const W2 = "it is a good day to die";

describe('Testing StringPatternsMatcher', () => {
    const PATTERNS = [ MONEY, MAP, IMMORTALITY, EQUIP, W2]
    let matcher : any;
    beforeEach(() => matcher = new StringPatternMatcher(PATTERNS))
    it('Should construct an instance with pattenrsToMatch assigned properly', () => {
        expect(matcher.patternsToMatch).toEqual(PATTERNS);
    })
    it('Should add new characters to testSoFar if caracters match some pattern', () => {
        'black'.split('').forEach((char:string) => matcher.feed(char));
        expect(matcher.textSoFar).toBe('black')
    })
    it('Should add whole "Contror" string to textSoFar if control pressed', () => {
        `black${keyCodes.CTRL}`.split('').forEach((char:string) => matcher.feed(char));
        expect(matcher.textSoFar).toBe(`black${keyCodes.CTRL}`)
    })
    it('Should clear bufor after clearBufor method invoked', () => {
        `black${keyCodes.CTRL}`.split('').forEach((char:string) => matcher.feed(char));
        matcher.clearBufor();
        expect(matcher.textSoFar).toBe('')
    })
    it('Should clear bufor after typing some matching chars, but one not matching typed', () => {
        `black w`.split('').forEach((char:string) => matcher.feedWithCheck(char));
        expect(matcher.textSoFar).toBe('')
    })
    it('Should return matched string in case a matching string is typed, should clear bufor after match', () => {
        let result = ''
        MAP.split('').forEach((char) => {
            const localResult = matcher.feedWithCheck(char);
            if (localResult !== '') result = localResult;
        })
        expect(result).toEqual(MAP);
    })
})
