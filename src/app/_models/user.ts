export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  constructor({
    id = 0,
    firstName = '',
    lastName = '',
    email = '',
    token = '',
    ...rest
}) {
    Object.assign(this, rest)
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.token = token
}
}
