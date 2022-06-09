export default class Folder {
    name: string;
    protected subfolders: Folder[];

    constructor(name: string) {
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
