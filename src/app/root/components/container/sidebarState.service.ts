export class SidebarStateService {

    public static isOpened(): boolean {
        return Boolean(localStorage.getItem(this.key));
    }

    public static toggleState() {
        if (this.isOpened()) {
            localStorage.removeItem(this.key);
        } else {
            localStorage.setItem(this.key, 'true');
        }
    }

    private static key: string = 'isSidebarOpened';

}
