export class Logger {
    // infoStyle = 'background-color: blue; padding: 2px; border-radius: 3px; border: solid thin blue;';
    infoStyle = 'color: red';
    warnStyle = 'background: orange, padding: 2px, border-radius: 3px';
    errorStyle = 'background: light-red, padding: 2px, border-radius: 3px';

    inform(message){ console.log(`%c${message}`, this.infoStyle) };
    warn(message){ console.log(`%c${message}`, this.warnStyle) };
    error(message){ console.log(`%c${message}`, this.errorStyle) };

    static inform(message){ console.log(`%c${message}`, this.infoStyle) };
}
