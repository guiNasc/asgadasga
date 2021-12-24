export class Client {
  id: number;
  name: string;
  email: string;
  cpf: string;
  registerNumber: string;
  status: string;
  internalId: string;
  phone: string;
  address: string;

  static build(
    id: number,
    name: string,
    email: string,
    cpf: string,
    registerNumber: string,
    status: string,
    internalId: string,
    phone: string,
    address: string,
  ): Client {
    const client = new Client();
    client.id = id;
    client.name = name;
    client.email = email;
    client.cpf = cpf;
    client.registerNumber = registerNumber;
    client.status = status;
    client.internalId = internalId;
    client.phone = phone;
    client.address = address;
    return client;
  }
}
