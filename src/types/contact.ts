import Group from './group';
import { Groups } from './groups';


export default class Contact {
    public fio: string;
    public phones: string[];
    public emails: string[];
    public group: Group;
    public website: string;
    public birthday: string;
    public company: string;
    public photo: string;

    constructor(
        fio: string = '',
        phones: string[] = [],
        groupKey = Groups.None,
        emails: string[] = [],
        website: string = '',
        birthday: string = '',
        company: string = '',
        photo: string = '//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png',
        ) {
        this.fio = fio;
        this.phones = phones;
        this.group = new Group(groupKey);
        this.emails = emails;
        this.website = website;
        this.birthday = birthday;
        this.company = company;
        this.photo = photo;
    }

    public isInGroup(): boolean {
        return this.group.key !== Groups.None;
    }

    public clone(): Contact {
        const clone = new Contact();
        clone.fio = this.fio;
        clone.phones = [];
        this.phones.forEach((phone) => {
            clone.phones.push(phone);
        });
        clone.group = this.group;
        clone.emails = [];
        this.emails.forEach((email) => {
            clone.emails.push(email);
        });
        clone.website = this.website;
        clone.birthday = this.birthday;
        clone.company = this.company;
        clone.photo = this.photo;
        return clone;
    }
}
