import { faker } from '@faker-js/faker';

export const onePost = {
    userId: faker.random.numeric(),
    id: faker.random.numeric(),
    title: faker.random.word(),
    body: faker.random.words()
}

export const allPosts = [
    {
        userId: faker.random.numeric(),
        id: faker.random.numeric(),
        title: faker.random.word(),
        body: faker.random.words()
    },
    {
        userId: faker.random.numeric(),
        id: faker.random.numeric(),
        title: faker.random.word(),
        body: faker.random.words()
    }
];