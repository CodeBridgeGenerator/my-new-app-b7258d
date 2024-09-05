
import { faker } from "@faker-js/faker";
export default (user,count,departmentIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: faker.lorem.sentence(""),
department: departmentIds[i % departmentIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
