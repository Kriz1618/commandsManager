import MainFolder from "./mainFolder";

export default class Folder extends MainFolder{
    name: string;
    protected subfolders: Folder[];

    constructor(name: string, main = false) {
        super(main);
        this.name = name;
        this.subfolders = [];
    }

    public getSubfolders(): Folder[] {
        return this.subfolders;
    }

    updateSubfolder(subfolders: Folder[]): void {
        this.subfolders = subfolders;
    }
}
