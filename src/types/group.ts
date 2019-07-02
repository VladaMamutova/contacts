import { Groups } from './groups';

// Группа контактов.
export class Group {
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
                name = '';
                break;
            }
        }
        return name;
    }

    private generateColor(key: Groups) {
        let color: string = '';
        switch (this.key) {
            case Groups.Family: {
                color = '#EC407A'; // pink darken-1
                break;
            }
            case Groups.Friends: {
                color = '#8E24AA'; // purple darken-1
                break;
            }
            case Groups.Сolleagues: {
                color = '#64DD17'; // light-green accent-4
                break;
            }
            default: {
                color = '';
                break;
            }
        }
        return color;
    }
}
