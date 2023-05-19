export const runFunctionTimes = (func: () => any, times:number) => {
    const runner = (func: () => any, iteration:number) => {
        if (iteration < times) {
            runner(func, iteration + 1);
            func();
        }
    }
    runner(func, 0);
}
