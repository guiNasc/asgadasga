export class Equipment {
  id: number;
  name: string;
  internalId: string;
  internalClientId: string;
  serialNumber: string;
  model: string;
  producer: string;
  info: string;
  lastMaintenance: string;

  static build(
    id: number,
    name: string,
    internalId: string,
    internalClientId: string,
    serialNumber: string,
    model: string,
    producer: string,
    info: string
  ): Equipment {
    const equipment = new Equipment();
    equipment.id = id;
    equipment.name = name;
    equipment.internalId = internalId;
    equipment.internalClientId = internalClientId;
    equipment.serialNumber = serialNumber;
    equipment.model = model;
    equipment.producer = producer;
    equipment.info = info;
    return equipment;
  }
}
