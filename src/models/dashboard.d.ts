export interface IDashboardObj {
  date: Date;
  image?: string;
  breakerStatus?: string;
  breakerAction?: string;
  displayStatus?: string;
  inDisplayStatus?: string;
  outDisplayStatus?: string;
  paystationAction?: string;
  paystationStatus?: string;
  lprStatus?: string;
  inLprStatus?: string;
  outLprStatus?: string;
  gateName: string;
  gateId: string;
  gateType: string;
  vehicleNo?: string;
  carType?: string;
  outImage?: string;
  outVehicleNo?: string;
  outCarType?: string;
  outDate?: Date;
}
