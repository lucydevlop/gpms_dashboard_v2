import { ISelectOptions } from '@/utils/form';
import { localeStore } from '@store/localeStore';

export enum EDelYn {
  Y = 'Y',
  N = 'N',
  ALL = 'ALL'
}
export const delYnOpt: ISelectOptions[] = [
  { value: EDelYn.Y, label: '비활성', color: 'red' },
  { value: EDelYn.N, label: '활성', color: 'blue' },
  { value: EDelYn.ALL, label: '전체', color: 'blue' }
];

export const useYnOpt: ISelectOptions[] = [
  { value: EDelYn.Y, label: '사용', color: 'blue' },
  { value: EDelYn.N, label: '미사용', color: 'red' }
];

export enum EStatus {
  On = 'On',
  Off = 'Off'
}

export const radioSelectOpt: ISelectOptions[] = [
  { value: EStatus.On, label: '사용', color: 'black' },
  { value: EStatus.Off, label: '사용안함', color: 'black' }
];

export enum EOnOff {
  ON = 'ON',
  OFF = 'OFF'
}

export const onOffSelectOpt: ISelectOptions[] = [
  { value: EOnOff.ON, label: '사용', color: 'black' },
  { value: EOnOff.OFF, label: '사용안함', color: 'black' }
];

export enum ECity {
  SEOUL = 'SEOUL',
  GYEONGGIDO = 'GYEONGGIDO',
  INCHEON = 'INCHEON',
  BUSAN = 'BUSAN',
  DAEJEON = 'DAEJEON',
  DAEGU = 'DAEGU',
  ULSAN = 'ULSAN',
  SEJONG = 'SEJONG',
  GWANGJU = 'GWANGJU',
  GANGWONDO = 'GANGWON-DO',
  CHUNGCHEONGBUKDO = 'CHUNGCHEONGBUKDO',
  CHUNGCHEONGNAMDO = 'CHUNGCHEONGNAMDO',
  GYEONGSANGBUKDO = 'GYEONGSANGBUKDO',
  GYEONGSANGNAMDO = 'GYEONGSANGNAMDO',
  JEOLLABUKDO = 'JEOLLABUKDO',
  JEOLLANAMDO = 'JEOLLANAMDO',
  JEJU = 'JEJU'
}

export const cityOpt: ISelectOptions[] = [
  { value: ECity.SEOUL, label: '서울시', color: 'black' },
  { value: ECity.GYEONGGIDO, label: '경기도', color: 'black' },
  { value: ECity.INCHEON, label: '인천시', color: 'black' },
  { value: ECity.BUSAN, label: '부산시', color: 'black' },
  { value: ECity.DAEJEON, label: '대전시', color: 'black' },
  { value: ECity.DAEGU, label: '대구시', color: 'black' },
  { value: ECity.ULSAN, label: '울산시', color: 'black' },
  { value: ECity.SEJONG, label: '세종시', color: 'black' },
  { value: ECity.GWANGJU, label: '광주시', color: 'black' },
  { value: ECity.GANGWONDO, label: '강원도', color: 'black' },
  { value: ECity.CHUNGCHEONGBUKDO, label: '충청북도', color: 'black' },
  { value: ECity.CHUNGCHEONGNAMDO, label: '충청남도', color: 'black' },
  { value: ECity.GYEONGSANGBUKDO, label: '경상북도', color: 'black' },
  { value: ECity.GYEONGSANGNAMDO, label: '경상남도', color: 'black' },
  { value: ECity.JEOLLABUKDO, label: '전라북도', color: 'black' },
  { value: ECity.JEOLLANAMDO, label: '전라남도', color: 'black' },
  { value: ECity.JEJU, label: '제주도', color: 'black' }
];

export enum ECategory {
  LPR = 'LPR',
  BREAKER = 'BREAKER',
  DISPLAY = 'DISPLAY',
  PAYSTATION = 'PAYSTATION',
  VOIP = 'VOIP'
}

export const categoryOpt: ISelectOptions[] = [
  { value: ECategory.LPR, label: 'LPR', color: 'black' },
  { value: ECategory.BREAKER, label: '차단기', color: 'blue' },
  { value: ECategory.DISPLAY, label: '전광판', color: 'green' },
  { value: ECategory.PAYSTATION, label: '정산기', color: 'navy' },
  { value: ECategory.VOIP, label: 'VOIP', color: 'black' }
];

export enum EGateType {
  IN = 'IN',
  OUT = 'OUT',
  INOUT = 'IN_OUT',
  ETC = 'ETC'
}

export const gateTypeOpt: ISelectOptions[] = [
  { value: EGateType.IN, label: '입구전용', color: 'black' },
  { value: EGateType.OUT, label: '출구전용', color: 'blue' },
  { value: EGateType.INOUT, label: '입출구', color: 'green' },
  { value: EGateType.ETC, label: '기타', color: 'red' }
];

export enum EBreakerStatus {
  UP = 'UP',
  DOWN = 'DOWN',
  UNLOCK = 'UNLOCK',
  UPLOCK = 'UPLOCK',
  XUPLOCK = 'XUPLOCK',
  NONE = 'NONE'
}

export const breakerStatusOpt: ISelectOptions[] = [
  { value: EBreakerStatus.UP, label: '열림', color: 'blue' },
  { value: EBreakerStatus.UPLOCK, label: '열림고정', color: 'black' },
  { value: EBreakerStatus.UNLOCK, label: '고정해제', color: 'cyan' },
  { value: EBreakerStatus.DOWN, label: '닫힘', color: 'magenta' },
  { value: EBreakerStatus.XUPLOCK, label: '열림고정(수동)', color: 'gray' },
  { value: EBreakerStatus.NONE, label: 'NONE', color: 'gray' }
];

export enum ERemoteTool {
  ANYDESK = 'ANYDESK',
  TEAMVIEWER = 'TEAMVIEWER',
  NONE = 'NONE'
}

export const remoteToolOpt: ISelectOptions[] = [
  { value: ERemoteTool.ANYDESK, label: '애니데스크', color: 'black' },
  { value: ERemoteTool.TEAMVIEWER, label: '팀뷰어', color: 'black' },
  { value: ERemoteTool.NONE, label: '없음', color: 'red' }
];

export enum EVehicleType {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE'
}

export const vehicleTypeOpt: ISelectOptions[] = [
  { value: EVehicleType.SMALL, label: '소형', color: 'black' },
  { value: EVehicleType.MEDIUM, label: '중형', color: 'black' },
  { value: EVehicleType.LARGE, label: '대형', color: 'black' }
];

export enum ETicketType {
  ALL = 'ALL',
  NORMAL = 'NORMAL',
  SEASONTICKET = 'SEASONTICKET',
  FREETICKET = 'FREETICKET',
  VISITTICKET = 'VISITTICKET',
  UNRECOGNIZED = 'UNRECOGNIZED',
  DISCOUNT = 'DISCOUNT',
  PARTRECOGNIZED = 'PARTRECOGNIZED'
}

export const ticketTypeOpt: ISelectOptions[] = [
  { value: ETicketType.SEASONTICKET, label: '유료정기권', color: 'black' },
  { value: ETicketType.FREETICKET, label: '무료정기권', color: 'black' },
  { value: ETicketType.VISITTICKET, label: '방문권', color: 'black' },
  { value: ETicketType.NORMAL, label: '일반차량', color: 'black' },
  { value: ETicketType.UNRECOGNIZED, label: '미인식', color: 'red' },
  { value: ETicketType.PARTRECOGNIZED, label: '부분인식', color: 'red' },
  { value: ETicketType.DISCOUNT, label: '할인', color: 'red' },
  { value: ETicketType.ALL, label: '전체', color: 'red' }
];

export enum ETicketSearchDateType {
  EFFECT = 'EFFECT',
  EXPIRE = 'EXPIRE',
  VALIDATE = 'VALIDATE'
}

export const ticketSearchDateTypeOpt: ISelectOptions[] = [
  { value: ETicketSearchDateType.EFFECT, label: '시작일', color: 'black' },
  { value: ETicketSearchDateType.EXPIRE, label: '종료일', color: 'black' },
  { value: ETicketSearchDateType.VALIDATE, label: '사용가능', color: 'black' }
];

export enum EInoutType {
  IN = 'IN',
  OUT = 'OUT',
  DOUBLE = 'DOUBLE'
}

export const inoutSearchDateTypeOpt: ISelectOptions[] = [
  { value: EInoutType.IN, label: '입차', color: 'black' },
  { value: EInoutType.OUT, label: '출차', color: 'black' }
];

export enum EDiscountType {
  DISCOUNT = 'DISCOUNT',
  REDUCTION = 'REDUCTION'
}

export const discountTypeOpt: ISelectOptions[] = [
  { value: EDiscountType.DISCOUNT, label: '할인', color: 'black' },
  { value: EDiscountType.REDUCTION, label: '감면', color: 'black' }
];

export enum EDiscountApplyType {
  TIME = 'TIME',
  WON = 'WON',
  PERCENT = 'PERCENT'
}

export const discountApplyTypeOpt: ISelectOptions[] = [
  { value: EDiscountApplyType.TIME, label: '시간', color: 'black' },
  { value: EDiscountApplyType.WON, label: '원', color: 'black' },
  { value: EDiscountApplyType.PERCENT, label: '%', color: 'black' }
];

export enum EDiscountApplyRate {
  FIX = 'FIX',
  VARIABLE = 'VARIABLE'
}

export const discountApplyRateOpt: ISelectOptions[] = [
  { value: EDiscountApplyRate.FIX, label: '고정할인', color: 'black' },
  { value: EDiscountApplyRate.VARIABLE, label: '변동할인', color: 'black' }
];

export enum EDayRangeType {
  ALL = 'ALL',
  WEEKDAY = 'WEEKDAY',
  WEEKEND = 'WEEKEND'
}

export const dayRangeTypeOpt: ISelectOptions[] = [
  { value: EDayRangeType.ALL, label: '전체', color: 'black' },
  { value: EDayRangeType.WEEKDAY, label: '주중', color: 'black' },
  { value: EDayRangeType.WEEKEND, label: '주말', color: 'black' }
];

export const operatingDaysTypeOpt: ISelectOptions[] = [
  { value: EDayRangeType.ALL, label: '무휴', color: 'black' },
  { value: EDayRangeType.WEEKDAY, label: '주중', color: 'black' },
  { value: EDayRangeType.WEEKEND, label: '주말', color: 'black' }
];

export enum EPayType {
  PAID = 'PAID',
  FREE = 'FREE'
}

export const payTypeOpt: ISelectOptions[] = [
  { value: EPayType.PAID, label: '유료', color: 'black' },
  { value: EPayType.FREE, label: '무료', color: 'black' }
];

export enum EGateActionType {
  PCC = 'PCC',
  GATE = 'GATE'
}

export const gateActionTypeOpt: ISelectOptions[] = [
  { value: EGateActionType.PCC, label: 'PCC', color: 'black' },
  { value: EGateActionType.GATE, label: 'GATE', color: 'black' }
];

export enum EGateOpenActionType {
  NONE = 'NONE',
  RECOGNITION = 'RECOGNITION',
  RESTRICT = 'RESTRICT',
  MULTI = 'MULTI'
}

export const gateOpenActionTypeOpt: ISelectOptions[] = [
  { value: EGateOpenActionType.NONE, label: '모두허용', color: 'black' },
  { value: EGateOpenActionType.RECOGNITION, label: '인식차량허용', color: 'black' },
  { value: EGateOpenActionType.RESTRICT, label: '등록차량허용', color: 'black' },
  { value: EGateOpenActionType.MULTI, label: '복합허용', color: 'black' }
];

export enum EMessageClassType {
  IN = 'IN',
  OUT = 'OUT',
  WAIT = 'WAIT'
}

export const messageClassTypeOpt: ISelectOptions[] = [
  { value: EMessageClassType.IN, label: '입차', color: 'red' },
  { value: EMessageClassType.OUT, label: '출차', color: 'blue' },
  { value: EMessageClassType.WAIT, label: '정산', color: 'green' }
];

export enum EMessageTypeType {
  NONMEMBER = 'NONMEMBER',
  MEMBER = 'MEMBER',
  CALL = 'CALL',
  RESTRICTE = 'RESTRICTE',
  FAILNUMBER = 'FAILNUMBER',
  INIT = 'INIT',
  FULL = 'FULL',
  VIP = 'VIP'
}
export const messageTypeTypeOpt: ISelectOptions[] = [
  { value: EMessageTypeType.INIT, label: '리셋', color: 'black' },
  { value: EMessageTypeType.NONMEMBER, label: '일반차량', color: 'black' },
  { value: EMessageTypeType.MEMBER, label: '티맵회원', color: 'black' },
  { value: EMessageTypeType.VIP, label: '정기권', color: 'black' },
  { value: EMessageTypeType.CALL, label: '호출', color: 'black' },
  { value: EMessageTypeType.RESTRICTE, label: '입차제한차량', color: 'black' },
  { value: EMessageTypeType.FAILNUMBER, label: '번호인식실패', color: 'black' },
  { value: EMessageTypeType.FULL, label: '만차', color: 'black' }
];

export const useOrUnuseOpt: ISelectOptions[] = [
  { value: EDelYn.N, label: '사용', color: 'blue' },
  { value: EDelYn.Y, label: '미사용', color: 'red' },
  { value: 'ALL', label: '전체', color: 'black' }
];

export enum EUseType {
  TRUE = 1,
  FALSE = 0
}

export const useOpt: ISelectOptions[] = [
  { value: EUseType.FALSE, label: '미사용', color: 'blue' },
  { value: EUseType.TRUE, label: '사용', color: 'red' }
];

export enum ESearchLable {
  CARNUM = 'CARNUM',
  USERNAME = 'USERNAME'
}

export enum ETicketSearchType {
  EFFECT = 'EFFECT',
  EXPIRE = 'EXPIRE',
  VALIDATE = 'VALIDATE'
}

export enum EVehiclDayType {
  OFF = 'OFF',
  DAY2 = 'DAY2',
  DAY5 = 'DAY5'
}

export const ticketSearchTypeOpt: ISelectOptions[] = [
  { value: ETicketSearchType.EFFECT, label: '시작일', color: 'black' },
  { value: ETicketSearchType.EXPIRE, label: '종료일', color: 'black' },
  { value: ETicketSearchType.VALIDATE, label: '사용일', color: 'balck' }
];

export const searchLableOpt: ISelectOptions[] = [
  { value: ESearchLable.CARNUM, label: '차량번호', color: 'black' },
  { value: ESearchLable.USERNAME, label: '이름', color: 'black' }
];

export const vehicleDayOpt: ISelectOptions[] = [
  { value: EVehiclDayType.OFF, label: '사용안함', color: 'black' },
  { value: EVehiclDayType.DAY2, label: '2부제', color: 'black' },
  { value: EVehiclDayType.DAY5, label: '5부제', color: 'black' }
];

export enum EExternalSvrType {
  NONE = 'NONE',
  TMAP = 'TMAP',
  ADTCAPS = 'ADTCAPS',
  GLNT = 'GLNT'
}

export const externalSvrTypeOpt: ISelectOptions[] = [
  { value: EExternalSvrType.NONE, label: '사용안함', color: 'black' },
  // { value: EExternalSvrType.TMAP, label: '티맵', color: 'black' },
  // { value: EExternalSvrType.ADTCAPS, label: 'ADT캡스', color: 'black' },
  { value: EExternalSvrType.GLNT, label: '사용', color: 'black' }
];

export const VisitorExternalTypeOpt: ISelectOptions[] = [{ value: 'APTNER', label: '아파트너' }];

export enum ESearchUserType {
  USERNAME = 'USERNAME',
  USERID = 'USERID'
}

export enum ERoleType {
  ADMIN = 'ADMIN',
  OPERATION = 'OPERATION'
}

export const roleOpt: ISelectOptions[] = [
  { value: ERoleType.ADMIN, label: '관리자', color: 'black' },
  { value: ERoleType.OPERATION, label: '운영자', color: 'black' }
];

export const userSearchOpt: ISelectOptions[] = [
  { value: ESearchUserType.USERNAME, label: '사용자이름', color: 'black' },
  { value: ESearchUserType.USERID, label: '사용자ID', color: 'black' }
];

export enum ELprTypeType {
  FRONT = 'FRONT',
  BACK = 'BACK',
  ASSIST = 'ASSIST',
  INFRONT = 'INFRONT',
  INBACK = 'INBACK',
  OUTFRONT = 'OUTFRONT'
}
export const lprTypeTypeOpt: ISelectOptions[] = [
  { value: ELprTypeType.FRONT, label: '전방', color: 'black' },
  { value: ELprTypeType.BACK, label: '후방', color: 'black' },
  { value: ELprTypeType.ASSIST, label: '보조', color: 'black' },
  { value: ELprTypeType.INFRONT, label: '양방향 입차전방', color: 'black' },
  { value: ELprTypeType.INBACK, label: '양방향 입차후방', color: 'black' },
  { value: ELprTypeType.OUTFRONT, label: '양방향 출차전방', color: 'black' }
];

export enum EColorType {
  C1 = 'C1',
  C3 = 'C3',
  C4 = 'C4',
  C5 = 'C5'
}

export const colorTypeOpt: ISelectOptions[] = [
  { value: EColorType.C1, label: '초록색', color: 'black' },
  { value: EColorType.C3, label: '하늘색', color: 'black' },
  { value: EColorType.C4, label: '빨강색', color: 'black' },
  { value: EColorType.C5, label: '노란색', color: 'black' }
];

export const lineOpt: ISelectOptions[] = [
  { value: 1, label: '첫번째', color: 'black' },
  { value: 2, label: '두번째', color: 'black' }
];

export const orderOpt: ISelectOptions[] = [
  { value: 1, label: '첫번째', color: 'black' },
  { value: 2, label: '두번째', color: 'black' }
  // ,
  // { value: 3, label: '세번째', color: 'black' },
  // { value: 4, label: '네번째', color: 'black' },
  // { value: 5, label: '다섯번째', color: 'black' },
  // { value: 6, label: '여섯번째', color: 'black' },
  // { value: 7, label: '일곱번째', color: 'black' }
];

export enum ELineStatus {
  FLOW = 'FLOW',
  FIX = 'FIX'
}

export const elineStatusOpt: ISelectOptions[] = [
  { value: ELineStatus.FIX, label: '고정', color: 'black' },
  { value: ELineStatus.FLOW, label: '흐름', color: 'black' }
];

export enum EFareType {
  BASIC = 'BASIC',
  ADD = 'ADD'
}

export const fareTypeOpt: ISelectOptions[] = [
  { value: EFareType.BASIC, label: '기본', color: 'black' },
  { value: EFareType.ADD, label: '추가', color: 'black' }
];

export enum ECorpSearchCondition {
  NAME = 'NAME',
  ID = 'ID',
  MOBILE = 'MOBILE'
}

export const corpSearchOpt: ISelectOptions[] = [
  { value: ECorpSearchCondition.ID, label: '입주사ID', color: 'black' },
  { value: ECorpSearchCondition.NAME, label: '입주사명', color: 'black' },
  { value: ECorpSearchCondition.MOBILE, label: '전화번호', color: 'black' }
];

export enum ETicketAplyType {
  FULL = 'FULL',
  DAY = 'DAY',
  NIGHT = 'NIGHT',
  TIME = 'TIME'
}

export const ticketAplyTypeOpt: ISelectOptions[] = [
  { value: ETicketAplyType.FULL, label: '전일', color: 'black' },
  { value: ETicketAplyType.DAY, label: '주간', color: 'black' },
  { value: ETicketAplyType.NIGHT, label: '야간', color: 'black' },
  { value: ETicketAplyType.TIME, label: '시간', color: 'black' }
];

export enum EDayType {
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
  SUN = 'SUN',
  ALL = 'ALL'
}

export const dayTYpeOpt: ISelectOptions[] = [
  { value: EDayType.MON, label: '월', color: 'black' },
  { value: EDayType.TUE, label: '화', color: 'black' },
  { value: EDayType.WED, label: '수', color: 'black' },
  { value: EDayType.THU, label: '목', color: 'black' },
  { value: EDayType.FRI, label: '금', color: 'black' },
  { value: EDayType.SAT, label: '토', color: 'black' },
  { value: EDayType.SUN, label: '일', color: 'black' },
  { value: EDayType.ALL, label: '전체', color: 'black' }
];

export enum EPaymentType {
  PAYMENT = 'PAYMENT',
  PREPAYMENT = 'PREPAYMENT',
  MANPAYMENT = 'MANPAYMENT'
}

export const paymentTypeOpt: ISelectOptions[] = [
  { value: EPaymentType.PAYMENT, label: '출차정산', color: 'black' },
  { value: EPaymentType.MANPAYMENT, label: '출차정산', color: 'black' },
  { value: EPaymentType.PREPAYMENT, label: '사전정산', color: 'black' }
];

export enum ETicketApplyTargetTyoe {
  IN = 'IN',
  NOW = 'NOW'
}

export const ticketApplyTargetTypeOpt: ISelectOptions[] = [
  { value: ETicketApplyTargetTyoe.IN, label: '입차시간', color: 'black' },
  { value: ETicketApplyTargetTyoe.NOW, label: '현재시간', color: 'black' }
];

export enum EDiscountApplyCriteriaType {
  FRONT = 'FRONT',
  BACK = 'BACK'
}

export const discountApplyCriteriaTypeOpt: ISelectOptions[] = [
  { value: EDiscountApplyCriteriaType.FRONT, label: '입차시간', color: 'black' },
  { value: EDiscountApplyCriteriaType.BACK, label: '출차시간', color: 'black' }
];

export enum EFailureCodeType {
  crossingGateLongTimeOpen = 'crossingGateLongTimeOpen',
  paymentFailure = 'paymentFailure',
  icCardReaderFailure = 'icCardReaderFailure',
  printFailure = 'printFailure'
}

export const failureCodeTypeOpt: ISelectOptions[] = [
  { value: EFailureCodeType.crossingGateLongTimeOpen, label: '장시간차단기오픈', color: 'black' },
  { value: EFailureCodeType.paymentFailure, label: '정산기장애', color: 'black' },
  { value: EFailureCodeType.icCardReaderFailure, label: '카드단말기장애', color: 'black' },
  { value: EFailureCodeType.printFailure, label: '영수증프린터장애', color: 'black' }
];

export enum EResultType {
  ERROR = 'ERROR',
  FAILURE = 'FAILURE',
  WAIT = 'WAIT',
  SUCCESS = 'SUCCESS'
}

export const resultTypeOpt: ISelectOptions[] = [
  { value: EResultType.ERROR, label: '에러', color: 'red' },
  { value: EResultType.FAILURE, label: '실패', color: 'blue' },
  { value: EResultType.WAIT, label: '대기', color: 'light gray' },
  { value: EResultType.SUCCESS, label: '성공', color: 'black' }
];

export enum EPeriodType {
  MONTH = 'MONTH',
  DAY = 'DAY'
}

export const periodTypeOpt: ISelectOptions[] = [
  { value: EPeriodType.MONTH, label: '달', color: 'black' },
  { value: EPeriodType.DAY, label: '일', color: 'black' }
];

export enum EPayMethod {
  CARD = 'CARD',
  CASH = 'CASH'
}

export const payMethodOpt: ISelectOptions[] = [
  { value: EPayMethod.CARD, label: '카드', color: 'black' },
  { value: EPayMethod.CASH, label: '현금', color: 'black' }
];
