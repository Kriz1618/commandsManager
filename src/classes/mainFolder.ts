export default abstract class MainFolder {
    protected main: boolean;

    constructor(main: boolean) {
        this.main = main;
    }

    isMain() {
        return this.main;
    }
}
