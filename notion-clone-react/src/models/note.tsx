export default class Note {
    public id: string;
    public name: string = "";
    public imageUrl: string = "";
    public createdAt: Date = new Date();
    
    constructor(id: string, name: string, imageUrl: string, createdAt: Date) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
    }
}