import { ITicketObj } from '@models/ticket';
import * as Papa from 'papaparse';
import { conversionEnumLabel, convertDateToDateTime } from '@utils/conversion';
import {
  EDelYn,
  EPayMethod,
  ETicketType,
  EVehicleType,
  payMethodOpt,
  ticketTypeOpt,
  useYnOpt,
  vehicleTypeOpt
} from '@/constants/list';
import { ICorpObj } from '@models/corp';
import { string2mobile } from '@utils/tools';
import Exception from '@components/Exception';
import { ISelectOptions } from '@utils/form';
import { corpStore } from '@store/corpStore';

export const readTicketObj = (textData: string): ITicketObj[] => {
  //console.log(textData);
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
  //console.log('buildTicket ' + parsedData);
  const { corpSelectList } = corpStore;
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
    corpSn: conversionEnumLabel(row[8], corpSelectList).value as number,
    //corpName: row[8],
    etc: row[9],
    etc1: row[10],
    delYn: EDelYn.N,
    sn: Number(row[12])
  }));
};

export const readSeasonTicketObj = (
  textData: string,
  ticketClass: ISelectOptions[]
): ITicketObj[] => {
  //console.log(textData);
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

  return buildSeasonTicketFromRows(parsedData, ticketClass);
};

const buildSeasonTicketFromRows = (
  parsedData: string[][],
  ticketClass: ISelectOptions[]
): ITicketObj[] => {
  const { corpSelectList } = corpStore;
  //console.log('buildTicket ' + parsedData);
  // @ts-ignore
  return parsedData.map<ITicketObj>((row) => ({
    vehicleNo: row[0],
    ticketType: conversionEnumLabel(row[1], ticketTypeOpt).value as ETicketType,
    ticketSn: conversionEnumLabel(row[2], ticketClass).value as number,
    name: row[3],
    tel: row[4],
    effectDate: convertDateToDateTime(row[5], '00', '00', '00'),
    expireDate: convertDateToDateTime(row[6], '23', '59', '59'),
    vehicleType: conversionEnumLabel(row[7], vehicleTypeOpt).value as EVehicleType,
    vehiclekind: row[8],
    corpSn: conversionEnumLabel(row[9], corpSelectList).value as number,
    //corpName: row[9],
    etc: row[10],
    etc1: row[11],
    payMethod: conversionEnumLabel(row[12], payMethodOpt).value as EPayMethod,
    extendYn: conversionEnumLabel(row[13], useYnOpt).value as EDelYn,
    delYn: EDelYn.N,
    sn: Number(row[15])
  }));
};

export const readCorpObj = (textData: string): ICorpObj[] => {
  let parsedOutput = Papa.parse(textData, { skipEmptyLines: true });
  const knownDelimiters = ['\t', ' ', ','];
  knownDelimiters.forEach((knownDelimiters) => {
    if (parsedOutput.errors.length > 0) {
      parsedOutput = Papa.parse(textData, {
        delimiter: knownDelimiters,
        skipEmptyLines: true
      });
    }
  });
  let parsedData: any = parsedOutput.data;
  if (parsedOutput.data.length === 0) {
    throw new Error('Unable to parse data');
  }
  const maybeColumnHeader: any = parsedData[0][0];
  if (
    maybeColumnHeader === '사용여부(미입력 가능)' ||
    maybeColumnHeader === '입주사ID(업로드시 입력금지)'
  ) {
    parsedData.shift();
  } else if (maybeColumnHeader.indexOf('입주사 리스트')) {
    parsedData.shift();
    const parseData: any = [];
    for (let columnIndex = 0; columnIndex < parsedData.length; columnIndex++) {
      //     if (String(headers[headerIndex]).trim() === String(parsedData[columnIndex]).trim()) {
      parseData.push(parsedData[columnIndex]);
    }
    parsedData = parseData;
  }
  return buildTenantFormRows(parsedData);
};

const buildTenantFormRows = (parsedData: string[][]): ICorpObj[] => {
  console.log('buildTenant' + parsedData);

  return parsedData.map<ICorpObj>((row) => ({
    delYn: row[0] ? row[0] : EDelYn.N,
    corpId: row[1] ? row[1] : '',
    password: row[2] ? row[2] : 'store123!@#',
    corpName: row[3],
    userName: row[4],
    dong: row[5],
    ho: row[6],
    userPhone: row[7] ? string2mobile(row[7]) : row[7],
    userRole: 'STORE'
  }));
};
