export interface UserInfo {
    name: string;
    email: string;
    profileURL: string;
    isSelected: boolean;
}

export const usersInfo: UserInfo[] = [
    {
        name: 'Soham Newman',
        email: 'soham.newman@example.com',
        profileURL: process.env.PUBLIC_URL + '/images/user/user6.jpg',
        isSelected: false,
    },
    {
        name: 'Ken Alvarez',
        email: 'ken.alvarez@example.com',
        profileURL: process.env.PUBLIC_URL + '/images/user/user1.jpg',
        isSelected: true,
    },
    {
        name: 'Denise Hall',
        email: 'deni.hall@abc.com',
        profileURL: process.env.PUBLIC_URL + '/images/user/user2.jpg',
        isSelected: false,
    },
    {
        name: 'Tracy Bing',
        email: 'tracky.bing@example.com',
        profileURL: process.env.PUBLIC_URL + '/images/user/user3.jpg',
        isSelected: true,
    },
    {
        name: 'Letitia George',
        email: 'letitia.george@example.com',
        profileURL: process.env.PUBLIC_URL + '/images/user/user4.jpg',
        isSelected: false,
    },
    {
        name: 'Calvin Jones',
        email: 'calvin.jones@abc.com',
        profileURL: process.env.PUBLIC_URL + '/images/user/user5.jpg',
        isSelected: false,
    },
    {
        name: 'Bradley Wells',
        email: 'bradley.wells@example.com',
        profileURL: process.env.PUBLIC_URL + '/images/user/user7.jpg',
        isSelected: false,
    },
    {
        name: 'Brad Grant',
        email: 'brad.grant@example.com',
        profileURL: process.env.PUBLIC_URL + '/images/user/user8.jpg',
        isSelected: false,
    },
    {
        name: 'Tim Hall',
        email: 'tim.hall@example.com',
        profileURL: process.env.PUBLIC_URL + '/images/user/user9.jpg',
        isSelected: false,
    },
    {
        name: 'Tamara Cox',
        email: 'tamara.cox@example.com',
        profileURL: process.env.PUBLIC_URL + '/images/user/user10.jpg',
        isSelected: false,
    },
];
