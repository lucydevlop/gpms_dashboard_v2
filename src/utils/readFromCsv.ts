import { ITicketObj } from '@models/ticket';
import * as Papa from 'papaparse';
import { conversionEnumLabel, conversionEnumValue, convertDateToDateTime } from '@utils/conversion';
import { EDelYn, ETicketType, EVehicleType, ticketTypeOpt, vehicleTypeOpt } from '@/constants/list';

export const readTicketObj = (textData: string): ITicketObj[] => {
  let parsedOutput = Papa.parse(textData, { skipEmptyLines: true });
  const knownDelimiters = ['\t', ' ', ','];
  knownDelimiters.forEach((knownDelimiter) => {
    if (parsedOutput.errors.length > 0) {
      parsedOutput = Papa.parse(textData, {
        delimiter: knownDelimiter,
        skipEmptyLines: true
      });
    }
  });
  let parsedData: any = parsedOutput.data;
  if (parsedOutput.data.length === 0) {
    throw new Error('Unable to parse data');
  }

  const maybeColumnHeader: any = parsedData[0][0];
  //console.log("headers" + JSON.stringify(maybeColumnHeader))
  if (maybeColumnHeader === '차량번호' || maybeColumnHeader === '차량 번호') {
    parsedData.shift();
  } else if (maybeColumnHeader.indexOf('정기권')) {
    parsedData.shift();
    const parseData: any = [];
    for (let columnIndex = 0; columnIndex < parsedData.length; columnIndex++) {
      //     if (String(headers[headerIndex]).trim() === String(parsedData[columnIndex]).trim()) {
      parseData.push(parsedData[columnIndex]);
    }
    parsedData = parseData;
  }

  return buildTicketFromRows(parsedData);
};

const buildTicketFromRows = (parsedData: string[][]): ITicketObj[] => {
  console.log('buildTicket ' + parsedData);
  // @ts-ignore
  return parsedData.map<ITicketObj>((row) => ({
    vehicleNo: row[0],
    ticketType: conversionEnumLabel(row[1], ticketTypeOpt).value as ETicketType,
    name: row[2],
    tel: row[3],
    effectDate: convertDateToDateTime(row[4], '00', '00', '00'),
    expireDate: convertDateToDateTime(row[5], '23', '59', '59'),
    vehicleType: conversionEnumLabel(row[6], vehicleTypeOpt).value as EVehicleType,
    vehiclekind: row[7],
    corpName: row[8],
    etc: row[9],
    etc1: row[10],
    delYn: EDelYn.N,
    sn: Number(row[11])
  }));
};
