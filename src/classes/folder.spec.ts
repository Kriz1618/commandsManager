import Folder from "./folder";

describe('Folder test', () => {
    it('Should create a new folder istance', () => {
        const folderObj = new Folder('folder test');
        expect(folderObj.name).toEqual('folder test');
    });

    it('Should modify subfolders', () => {
        const folderObj = new Folder('test');
        folderObj.updateSubfolder([new Folder('subfolder')]);
        expect(folderObj.getSubfolders()).not.toEqual([]);
    });
});