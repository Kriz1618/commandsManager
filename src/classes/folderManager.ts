import Folder from "./folder";

export default class FolderManager {
    root: Folder;

    constructor() {
        this.root = new Folder('', true);
    }

    addFolder(path: string, parentRoot = this.root, target = '', targetFolders?: Folder[]): void {
        if (!path) {
            return;
        }

        const paths = path.split('/');
        const name: string = paths.shift() as string;
        const subPath = paths.join('/');
        const subfolders = parentRoot.getSubfolders();
        let subfolder = subfolders.find(folder => folder.name === name);

        if (parentRoot.isMain() && !subfolder) {
            subfolder = new Folder(name);
            subfolders.push(subfolder);
            parentRoot.updateSubfolder(subfolders);
            return this.addFolder(subPath, subfolder, target, targetFolders);
        }

        if (!subfolder) {
            subfolder = new Folder(name);
            subfolders.push(subfolder);
        }

        if (name === target && targetFolders) {
            subfolder.updateSubfolder(targetFolders);
        }

        parentRoot.updateSubfolder(subfolders as Folder[]);
        return this.addFolder(subPath, subfolder, target, targetFolders);
    }

    removeFolder(folderPath: string): string {
        const folders = folderPath.split('/');
        const folder = folders.at(-1);
        const rootPath = folders.shift() || '';
        const mainFolders = this.root.getSubfolders();
        let lastPath = mainFolders.find(fl => fl.name === rootPath) as Folder;

        if (!lastPath) {
            return `Cannot delete ${folderPath} - ${rootPath} does not exist`;
        }
        if (!folders.length && folder === lastPath.name) {
            this.root.updateSubfolder(mainFolders.filter(fl => fl.name !== folder));
            return '';
        }

        for (const path of folders) {
            const subfolders = lastPath.getSubfolders();
            const pathIndex = subfolders.findIndex(fl => fl.name === path);

            if (path === folder && pathIndex > -1) {
                subfolders.splice(pathIndex, 1);
                lastPath.updateSubfolder(subfolders);
                break;
            }
            if (pathIndex === -1) {
                return `Cannot delete ${folderPath} - ${path} does not exist`;
            }

            lastPath = subfolders[pathIndex];
        }

        return '';
    }

    moveFolder(path: string, folder: string): string {
        const folders = path.split('/');
        const newFolder = folders.at(-1);
        const validOrigin = this.validatePath(path);
        const validDestiny = this.validatePath(folder);
        const error = `Cannot move ${newFolder} - `;

        if (!validOrigin || !validDestiny) {
            return `${error}${!validOrigin ? path : folder} does not exist`;
        }

        const subfolders = this.retrieveSubFolders(path, newFolder);
        this.addFolder(`${folder}/${newFolder}`, this.root, newFolder, subfolders);
        this.removeFolder(path);

        return '';
    }

    showFolders(root = this.root, identation = 0): string {
        const spaces = new Array(identation).join(' ');
        const nextSpace = root.isMain() ? 0 : 2;
        const subfolders = root.getSubfolders();
        let ss = root.isMain() ? '' : `${spaces}${root.name}\n`;

        for (const folder of subfolders) {
            ss += this.showFolders(folder, identation + nextSpace);
        }

        return ss;
    }

    private validatePath(path: string): boolean {
        const folders = path.split('/');
        const mainFolder = folders[0];
        const mainFolders = this.root.getSubfolders();
        let subPath = mainFolders.find(fl => fl.name === mainFolder) as Folder;

        if (!subPath) {
            false;
        }

        for (let i = 0; i < folders.length; i++) {
            const folder = folders[i];
            const nextPath = folders[i + 1];

            if (subPath?.name !== folder) {
                return false;
            }
            if (nextPath) {
                subPath = subPath.getSubfolders().find(folder => folder.name === nextPath)  as Folder;
            }
            if (!subPath) {
                return false;
            }
        }
    
        return true;
    }

    private retrieveSubFolders(path: string, target?: string): Folder [] {
        const mainFolders = this.root.getSubfolders();
        const folders = path.split('/');
        const mainFolder = folders.shift();
        let mainPath = mainFolders.find(fl => fl.name === mainFolder) as Folder;
        let subfolders = mainPath.getSubfolders();

        if (target === mainPath.name) {
            return subfolders;
        }

        for (const folder of folders) {
            subfolders = mainPath.getSubfolders();
            mainPath = subfolders.find(fl => fl.name === folder) as Folder;

            if (target === mainPath.name) {
                subfolders = mainPath.getSubfolders();
                break;
            }
        }

        return subfolders;
    }
};
