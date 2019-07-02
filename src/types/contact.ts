import { Group } from './group';

export default class Contact {
    public fio: string;
    public phones: string[];
    public email: string[];
    public groupName: string;
    public website: string;
    public birthday: string;
    public company: string;
    public photo: string;

    private group: Group;

    constructor(
        fio: string,
        phones: string[],
        group = Group.None,
        emails: string[] = [''],
        website: string = '',
        birthday: string = '',
        company: string = '',
        photo: string = 'https://www.beautifulpeople.com/cdn/beautifulpeople/images/default_profile/signup_male.png',
        ) {
            this.fio = fio;
            this.phones = phones;
            this.group = group;
            this.groupName = this.generateGroupName(group);
            this.email = emails;
            this.website = website;
            this.birthday = birthday;
            this.company = company;
            this.photo = photo;
        }
        private generateGroupName(group: Group): string {
            let groupName = '';
            switch (group) {
                case Group.Family: {
                    groupName = 'Семья';
                    break;
                }
                case Group.Friends: {
                    groupName = 'Друзья';
                    break;
                }
                case Group.Сolleagues: {
                    groupName = 'Коллеги';
                    break;
                }
                default: {
                    groupName = '';
                    break;
                }
            }
            return groupName;
        }
}
