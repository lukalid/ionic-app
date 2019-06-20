export class Util {

    private static possibleEyes = ['eyes1', 'eyes2', 'eyes3', 'eyes4', 'eyes5', 'eyes6', 'eyes7', 'eyes9', 'eyes10'];
    private static possibleNoses = ['nose2', 'nose3', 'nose4', 'nose5', 'nose6', 'nose7', 'nose8', 'nose9'];
    private static possibleMouths = ['mouth1', 'mouth3', 'mouth5', 'mouth6', 'mouth7', 'mouth9', 'mouth10', 'mouth11'];

    static generateAvatarUrl(color?: string) {
        const eyes = this.possibleEyes[Math.floor(Math.random() * 9)];
        const nose = this.possibleNoses[Math.floor(Math.random() * 8)];
        const mouth = this.possibleMouths[Math.floor(Math.random() * 8)];
        if (!color) {
            color = this.generateRandomColor();
        }
        return `https://api.adorable.io/avatars/face/${eyes}/${nose}/${mouth}/${color}`;
    }

    static generateRandomColor() {
        return Math.random().toString(16).substr(-6);
    }

}
