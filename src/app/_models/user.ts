export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  location: string;
  token: string;
  constructor({
    id = 0,
    firstName = '',
    lastName = '',
    email = '',
    username = '',
    password = '',
    location = '',
    token = '',
    ...rest
  })
  {
    Object.assign(this, rest)
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.username = username
    this.password = password
    this.location = location
    this.token = token
  }
}
