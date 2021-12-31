export class Maintenance {
  id: number;
  internalEquipmentId: string;
  professionalRelated: string;
  madeAt: number;
  guarantee: number;
  info: string;
  madeAtAsString: string;
  guaranteeAsString: string;

  static build(
    id: number,
    internalEquipmentId: string,
    professionalRelated: string,
    madeAt: number,
    guarantee: number,
    info: string
  ): Maintenance {
    const maintenance = new Maintenance();
    maintenance.id = id;
    maintenance.internalEquipmentId = internalEquipmentId;
    maintenance.professionalRelated = professionalRelated;
    maintenance.madeAt = madeAt;
    maintenance.guarantee = guarantee;
    maintenance.info = info;

    maintenance.madeAtAsString = madeAt ? new Date(madeAt).toISOString() : new Date().toISOString();
    maintenance.guaranteeAsString = guarantee ? new Date(guarantee).toISOString() : new Date().toISOString();


    return maintenance;
  }
}
