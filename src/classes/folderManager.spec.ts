import Folder from "./folder";
import Manager from "./folderManager";

describe('Folder manager test', () => {
    describe('Create a new manager istance', () => {
        it('Should create a new folder istance without root', () => {
            const managerObj = new Manager();
            expect(managerObj.root).toBe(null);
        });  
    });

    describe('Adding folders', () => {
        it('Should add a new folder', () => {
            const manager = new Manager();
            manager.addFolder('first/second');

            // @ts-ignore
            expect(manager.root).not.toBe(null);
        });

        it('Should add a new subfolders', () => {
            const manager = new Manager();
            manager.addFolder('first/second/third');
            manager.addFolder('first/other');

            expect(manager?.root?.getSubfolders()?.length).toEqual(2);
            expect(manager?.root?.name).toEqual('first');
        });
    });

    describe('Moving folders', () => {
        it('Should not move folder to invalid folder', () => {
            const manager = new Manager();
            manager.addFolder('first/second/third');
            expect(
                manager.moveFolder('first/second/third', 'first/other'),
            ).toEqual('Cannot move third - first/other does not exist');
        });

        it('Should not move invalid folder', () => {
            const manager = new Manager();
            manager.addFolder('first/second');
            expect(
                manager.moveFolder('other/third', 'first/second'),
            ).toEqual('Cannot move third - other/third does not exist');
        });

        it('Should move a folder', () => {
            const manager = new Manager();
            manager.addFolder('first/second/third');
            manager.addFolder('first/other');
            expect(manager.moveFolder('first/second/third', 'first/second')).toEqual('');
        });
    });

    describe('Deleting folders', () => {
        it('Should not delete an invalid folder', () => {
            const manager = new Manager();
            manager.addFolder('first/second/third');
            expect(
                manager.removeFolder('first/other'),
            ).toEqual('Cannot delete first/other - other does not exist');
        });

        it('Should not delete from an invalid folder', () => {
            const manager = new Manager();
            manager.addFolder('first/second/third');
            expect(
                manager.removeFolder('test/other'),
            ).toEqual('Cannot delete test/other - test does not exist');
        });

        it('Should remove the root folder', () => {
            const manager = new Manager();
            manager.addFolder('first');
            expect(manager.removeFolder('first')).toEqual('');
            expect(manager.root).toBe(null);
        });

        it('Should remove a valid folder', () => {
            const manager = new Manager();
            manager.addFolder('first/second');
            expect(manager.removeFolder('first/second')).toEqual('');
        });
    });

    describe('Showing paths', () => {
        it('Should not show empty path', () => {
            const manager = new Manager();
            expect(manager.showFolders()).toEqual('');
        });

        it('Should show the whole path', () => {
            const manager = new Manager();
            manager.addFolder('first/second/third');
            expect(manager.showFolders()).toEqual('first\n second\n   third\n');
        });

    });

    // it('Should modify subfolders', () => {
    //     const folderObj = new Folder('test');
    //     folderObj.updateSubfolder([new Folder('subfolder')]);
    //     expect(folderObj.getSubfolders()).not.toEqual([]);
    // });
});