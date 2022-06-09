import lineReader from 'line-reader';
import Manager from "./folderManager";

export default class Terminal extends Manager {
    super() {};

    executeCommands(filePath: string): void {
        lineReader.eachLine(filePath, (command) => {
            this.executeCommand(command);
        });
    }

    private executeCommand(command: string) {
        const [arg1, arg2, arg3] = command.split(' ');
        let result = '';

        switch (arg1) {
            case 'CREATE': {
                this.addFolder(arg2);
                break;
            }
            case 'MOVE': {
                result = this.moveFolder(arg2, arg3);
                break;
            }
            case 'DELETE': {
                result = this.removeFolder(arg2);
                break;
            }
            case 'LIST': {
                result = this.showFolders();
                break;
            }
            default:
                result = 'Invalid task';
        }

        console.log(`${command}${result ? `\n${result}` : ''}`);
    } 
};
