import axios from 'axios';
import faker from 'faker';

// Utility function to fill json-server
export function fillServerWithFakeData() {
  const data = [];

  for (let i = 0; i < 10; i++) {
    data.push(axios.post('http://localhost:3000/records/', {
      name: faker.name.findName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      phone: faker.phone.phoneNumber()
    }));
  }

  Promise.all(data).then(data => console.log(data));
}
