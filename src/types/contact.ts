import Group from './group';
import { Groups } from './groups';


export default class Contact {
    public id: number;
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
        id: number = -1,
        ) {
        this.id = id;
        this.fio = fio;
        this.phones = phones;
        this.group = new Group(groupKey);
        this.emails = emails;
        this.website = website;
        this.birthday = birthday;
        this.company = company;
        this.photo = photo;
    }

    public setFromJSONObject(obj: any): void {
        const group = obj.group;
        this.id = obj.id;
        this.fio = obj.fio || '';
        this.phones = obj.phones || [];
        this.group = new Group(group.key);
        this.emails = obj.emails || [];
        this.website = obj.website;
        this.company = obj.company;
        this.birthday = obj.birthday;
        this.photo = obj.photo;
    }

    public isInGroup(): boolean {
        return this.group.key !== Groups.None;
    }

    public getFormattedMainPhoneNumber() {
        let phoneNumber = '';
        if (this.phones.length > 0) {
            phoneNumber = '+' + this.phones[0];
        }

        return phoneNumber;
    }

    public getMonthDateOfBirthday(): string {
      let birthday: string = '';
      if (this.birthday) {
        const [year, month, date] = this.birthday.split('-');
        birthday = month + date;
      }
      return birthday;
    }

    public getFormattedBirthday(): string {
        if (!this.birthday) {
          return '';
        }
        const [year, month, day] = this.birthday.split('-');
        return `${day}.${month}.${year}`;
    }

    public clone(): Contact {
        const clone = new Contact();
        clone.id = this.id;
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
    public set(contact: Contact): void {
        this.id = contact.id;
        this.fio = contact.fio;
        this.phones = [];
        contact.phones.forEach((phone) => {
            this.phones.push(phone);
        });
        this.group = new Group(contact.group.key);
        this.emails = [];
        contact.emails.forEach((email) => {
            this.emails.push(email);
        });
        this.website = contact.website;
        this.birthday = contact.birthday;
        this.company = contact.company;
        this.photo = contact.photo;
    }
    public IsEmpty(): boolean {
        if (!this.fio && !this.website && !this.birthday && !this.company &&
            this.phones.length === 0 && this.emails.length === 0) {
            return true;
        }
        return false;
    }
    public IsReadyToSave() {
        return this.fio || this.phones.length > 0;
    }
}
