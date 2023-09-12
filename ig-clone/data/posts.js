import { USERS } from "./users";

export const POSTS = [
    {
        imageUrl: require('../assets/postimg.jpg'),
        user: USERS[0].user,
        likes: 7080,
        caption: 'HEllo worlD!~!',
        profile_picture: USERS[0].image,
        comments: [
            {
                user: 'papahphp',
                comment: 'holly molly so english'
            },
            {
                user: 'millly',
                comment: 'oh its lopsided'
            },
            {
                user: 'papahphp',
                comment: 'holly molly so english'
            },
            {
                user: 'millly',
                comment: 'oh its lopsided'
            },
        ]
    },
    {
        imageUrl: require('../assets/postimg.jpg'),
        user: USERS[3].user,
        likes: 9090,
        caption: '💛💙💚💙💜🤎 kkkkkkkk',
        profile_picture: USERS[3].image,
        comments: [
            {
                user: 'papahphp',
                comment: 'holly molly so english'
            },
            {
                user: 'millly',
                comment: 'oh its lopsided'
            },
            {
                user: 'papahphp',
                comment: 'holly molly so english'
            },
            {
                user: 'papahphp',
                comment: 'holly molly so english'
            },
            {
                user: 'millly',
                comment: 'oh its lopsided'
            },
        ]
    },
    {
        imageUrl: require('../assets/postimg.jpg'),
        user: USERS[3].user,
        likes: 9090,
        caption: 'fsjlekflrbjwkjlwdfjwe; f dwkfjwdlfwlkfjwld dwfdwhfkjwhelkf weif wefhwelf wefj  kwdf  wdfhwjflwe',
        profile_picture: USERS[3].image,
        comments: [
            {
                user: 'papahphp',
                comment: 'holly molly so english'
            },
        ]
    },
    {
        imageUrl: require('../assets/postimg.jpg'),
        user: USERS[3].user,
        likes: 9090,
        caption: 'who are you? who are you?',
        profile_picture: USERS[3].image,
        comments: []
    },
]