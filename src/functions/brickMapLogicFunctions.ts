const booleanize = (a: number) => a === 0 ? false : true;

export const or = (a: number, b: number ) => (booleanize(a) || booleanize(b)) ? 1 : 0;

export const and = (a: number, b: number ) => (booleanize(a) && booleanize(b)) ? 1 : 0;

export const replaceWithA = (a: number, b: number) => booleanize(a) ? 1 : 0;
