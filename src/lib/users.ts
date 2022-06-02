export interface UserInfo {
    name: string;
    email: string;
    profileURL: string;
    isSelected: boolean;
    order: number;
}

export const usersInfo: UserInfo[] = [
    {
        name: 'Soham Newman',
        email: 'soham.newman@example.com',
        profileURL: process.env.PUBLIC_URL + '/images/user/user6.jpg',
        isSelected: false,
        order: -1,
    },
    {
        name: 'Ken Alvarez',
        email: 'ken.alvarez@example.com',
        profileURL: process.env.PUBLIC_URL + '/images/user/user1.jpg',
        isSelected: false,
        order: -1,
    },
    {
        name: 'Denise Hall',
        email: 'deni.hall@abc.com',
        profileURL: process.env.PUBLIC_URL + '/images/user/user2.jpg',
        isSelected: false,
        order: -1,
    },
    {
        name: 'Tracy Bing',
        email: 'tracky.bing@example.com',
        profileURL: process.env.PUBLIC_URL + '/images/user/user3.jpg',
        isSelected: false,
        order: -1,
    },
    {
        name: 'Letitia George',
        email: 'letitia.george@example.com',
        profileURL: process.env.PUBLIC_URL + '/images/user/user4.jpg',
        isSelected: false,
        order: -1,
    },
    {
        name: 'Calvin Jones',
        email: 'calvin.jones@abc.com',
        profileURL: process.env.PUBLIC_URL + '/images/user/user5.jpg',
        isSelected: false,
        order: -1,
    },
    {
        name: 'Bradley Wells',
        email: 'bradley.wells@example.com',
        profileURL: process.env.PUBLIC_URL + '/images/user/user7.jpg',
        isSelected: false,
        order: -1,
    },
    {
        name: 'Brad Grant',
        email: 'brad.grant@example.com',
        profileURL: process.env.PUBLIC_URL + '/images/user/user8.jpg',
        isSelected: false,
        order: -1,
    },
    {
        name: 'Tim Hall',
        email: 'tim.hall@example.com',
        profileURL: process.env.PUBLIC_URL + '/images/user/user9.jpg',
        isSelected: false,
        order: -1,
    },
    {
        name: 'Tamara Cox',
        email: 'tamara.cox@example.com',
        profileURL: process.env.PUBLIC_URL + '/images/user/user10.jpg',
        isSelected: false,
        order: -1,
    },
];
