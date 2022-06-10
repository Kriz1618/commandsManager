import Folder from "./folder";

describe('Folder test', () => {
    it('Should create a new folder istance', () => {
        const folder = new Folder('folder test');
        expect(folder.name).toEqual('folder test');
        expect(folder.isMain()).toBe(false);
    });
    it('Should create a main folder', () => {
        const folder = new Folder('main', true);
        expect(folder.name).toEqual('main');
        expect(folder.isMain()).toBe(true);
    });

    it('Should modify subfolders', () => {
        const folder = new Folder('test');
        folder.updateSubfolder([new Folder('subfolder')]);
        expect(folder.getSubfolders()).not.toEqual([]);
    });
});