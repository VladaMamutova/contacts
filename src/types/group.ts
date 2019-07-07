import { Groups } from './groups';

// Группа контактов.
export default class Group {
    public key: Groups; // Ключ группы.
    public name: string; // Имя группы на русском.
    public color: string; // Цвет группы.

    constructor(key: Groups) {
        this.key = key;
        this.name = this.generateName(key);
        this.color = this.generateColor(key);
    }

    private generateName(key: Groups) {
        let name: string = '';
        switch (this.key) {
            case Groups.Family: {
                name = 'Семья';
                break;
            }
            case Groups.Friends: {
                name = 'Друзья';
                break;
            }
            case Groups.Сolleagues: {
                name = 'Коллеги';
                break;
            }
            default: {
                name = 'Все';
                break;
            }
        }
        return name;
    }

    private generateColor(key: Groups) {
        let color: string = '';
        switch (this.key) {
            case Groups.Family: {
                color = 'pink lighten-1';
                break;
            }
            case Groups.Friends: {
                color = 'amber accent-4';
                break;
            }
            case Groups.Сolleagues: {
                color = '#60cc11'; // ~ light-green accent-4
                break;
            }
            default: {
                color = 'light-blue accent-4';
                break;
            }
        }
        return color;
    }
}
