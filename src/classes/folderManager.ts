import Folder from "./folder";

export default class FolderManager {
    root: Folder | null;

    constructor() {
        this.root = null;
    }

    addFolder(path: string, parentRoot?: Folder): void {
        if (!path) {
            return;
        }

        const paths = path.split('/');
        const name: string = paths.shift() as string;
        const subPath = paths.join('/');

        if (!this.root) {
            this.root = new Folder(name);
            return this.addFolder(subPath, this.root);
        }
        if (this.root.name === name) {
            return this.addFolder(subPath, this.root);
        }

        const subfolders = (parentRoot as Folder).getSubfolders();
        let subfolder = subfolders.find(folder => folder.name === name);

        if (!subfolder) {
            subfolder = new Folder(name);
            subfolders.push(subfolder);
        }

        parentRoot?.updateSubfolder(subfolders);
        return this.addFolder(subPath, subfolder);
    }

    removeFolder(folderPath: string): string {
        const folders = folderPath.split('/');
        const folder = folders.at(-1);
        const rootPath = folders.shift() || '';

        if (rootPath !== this.root?.name) {
            return `Cannot delete ${folderPath} - ${rootPath} does not exist`;
        }
        if (!folders.length && folder === this.root.name) {
            this.root = null;
            return '';
        }

        let lastPath = this.root;

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
        const newFolder = folders.pop();
        const validOrigin = this.validatePath(folders.join('/'));
        const validDestiny = this.validatePath(folder);
        const error = `Cannot move ${newFolder} - `;

        if (!validOrigin || !validDestiny) {
            return `${error}${!validOrigin ? path : folder} does not exist`;
        }

        this.addFolder(`${folder}/${newFolder}`);
        this.removeFolder(path);

        return '';
    }

    showFolders(root = this.root, identation = 0): string {
        if (!root) {
            return '';
        }

        const spaces = new Array(identation).join(' ');
        const subfolders = root.getSubfolders();
        let ss = `${spaces}${root.name}\n`;

        for (const folder of subfolders) {
            ss += this.showFolders(folder, identation + 2);
        }

        return ss;
    }

    private validatePath(path: string): boolean {
        const folders = path.split('/');
        let subPath = this.root;

        for (let i = 0; i < folders.length; i++) {
            const folder = folders[i];
            const nextPath = folders[i + 1];

            if (subPath?.name !== folder) {
                return false;
            }
            if (nextPath) {
                subPath = subPath.getSubfolders().find(folder => folder.name === nextPath) || null;
            }
        }
    
        return true;
    }   
};
