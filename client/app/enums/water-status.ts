export enum WaterStatus {
  Increase = 'increase', // เพิ่มขึ้น
  Decrease = 'decrease', // ลดลง
  Stable = 'stable', // ทรงตัว
  NoData = 'no_data', // ไม่มีข้อมูล
  AboveBank = 'above_bank', // สูงกว่าตลิ่ง
  BelowBank = 'below_bank', // ต่ำกว่าตลิ่ง
}

export enum ImgBasinImg {
  Salawin = '/images/Salawin.jpg',
  KhongNorth = '/images/KhongNorth.jpg',
  Ping = '/images/Ping.jpg',
  Wang = '/images/Wang.jpg',
  Yom = '/images/Yom.png',
  Nan = '/images/Nan.jpg',
  KhongNortheast = '/images/KhongNortheast.png',
  Chi = '/images/Chi2.png',
  Mun = '/images/Mun.jpg',
  ChaoPhraya = '/images/ChaoPhraya.png',
  SakaeKrang = '/images/SakaeKrang.png',
  PaSak = '/images/PaSak.png',
  MaeKlong = '/images/MaeKlong.png',
  BangPakong = '/images/BangPakong.png',
  EastCoast = '/images/EastCoast.jpg',
  PhetchaburiPrachuap = '/images/PhetchaburiPrachuap.jpg',
  UpperSouth = '/images/UpperSouth.png',
  LowerSouth = '/images/LowerSouth.png',
}

export enum BasinName {
  Salawin = 'สาละวิน',
  KhongNorth = 'โขงเหนือ',
  Ping = 'ปิง',
  Wang = 'วัง',
  Yom = 'ยม',
  Nan = 'น่าน',
  KhongNortheast = 'ตะวันออกเฉียงเหนือ',
  Chi = 'ชี',
  Mun = 'มูล',
  ChaoPhraya = 'เจ้าพระยา',
  SakaeKrang = 'สะแกกรัง',
  PaSak = 'ป่าสัก',
  MaeKlong = 'แม่กลอง',
  BangPakong = 'บางปะกง',
  EastCoast = 'ชายฝั่งทะเลตะวันออก',
  PhetchaburiPrachuap = 'เพชรบุรี-ประจวบคีรีขันธ์',
  UpperSouth = 'ภาคใต้ตอนบน',
  LowerSouth = 'ภาคใต้ตอนล่าง',
}

// If you need to use numeric IDs, you can create a numeric enum like this:
export enum BasinId {
  Salawin = 1,
  KhongNorth = 2,
  Ping = 3,
  Wang = 4,
  Yom = 5,
  Nan = 6,
  KhongNortheast = 7,
  Chi = 8,
  Mun = 9,
  ChaoPhraya = 10,
  SakaeKrang = 11,
  PaSak = 12,
  MaeKlong = 13,
  BangPakong = 14,
  EastCoast = 15,
  PhetchaburiPrachuap = 16,
  UpperSouth = 17,
  LowerSouth = 18,
}

// Interface สำหรับข้อมูลลุ่มน้ำ
export interface BasinInfo {
  id: BasinId
  name: string
  img: string
}

// Array ที่รวม id, name และ img ของลุ่มน้ำทั้งหมด
export const BasinList: BasinInfo[] = [
  {
    id: BasinId.Salawin,
    name: BasinName.Salawin,
    img: ImgBasinImg.Salawin,
  },
  {
    id: BasinId.KhongNorth,
    name: BasinName.KhongNorth,
    img: ImgBasinImg.KhongNorth,
  },
  {
    id: BasinId.Ping,
    name: BasinName.Ping,
    img: ImgBasinImg.Ping,
  },
  {
    id: BasinId.Wang,
    name: BasinName.Wang,
    img: ImgBasinImg.Wang,
  },
  {
    id: BasinId.Yom,
    name: BasinName.Yom,
    img: ImgBasinImg.Yom,
  },
  {
    id: BasinId.Nan,
    name: BasinName.Nan,
    img: ImgBasinImg.Nan,
  },
  {
    id: BasinId.KhongNortheast,
    name: BasinName.KhongNortheast,
    img: ImgBasinImg.KhongNortheast,
  },
  {
    id: BasinId.Chi,
    name: BasinName.Chi,
    img: ImgBasinImg.Chi,
  },
  {
    id: BasinId.Mun,
    name: BasinName.Mun,
    img: ImgBasinImg.Mun,
  },
  {
    id: BasinId.ChaoPhraya,
    name: BasinName.ChaoPhraya,
    img: ImgBasinImg.ChaoPhraya,
  },
  {
    id: BasinId.SakaeKrang,
    name: BasinName.SakaeKrang,
    img: ImgBasinImg.SakaeKrang,
  },
  {
    id: BasinId.PaSak,
    name: BasinName.PaSak,
    img: ImgBasinImg.PaSak,
  },
  {
    id: BasinId.MaeKlong,
    name: BasinName.MaeKlong,
    img: ImgBasinImg.MaeKlong,
  },
  {
    id: BasinId.BangPakong,
    name: BasinName.BangPakong,
    img: ImgBasinImg.BangPakong,
  },
  {
    id: BasinId.EastCoast,
    name: BasinName.EastCoast,
    img: ImgBasinImg.EastCoast,
  },
  {
    id: BasinId.PhetchaburiPrachuap,
    name: BasinName.PhetchaburiPrachuap,
    img: ImgBasinImg.PhetchaburiPrachuap,
  },
  {
    id: BasinId.UpperSouth,
    name: BasinName.UpperSouth,
    img: ImgBasinImg.UpperSouth,
  },
  {
    id: BasinId.LowerSouth,
    name: BasinName.LowerSouth,
    img: ImgBasinImg.LowerSouth,
  },
]

// เปลี่ยน BasinStation เป็น array
export interface BasinStationItem {
  basinId: BasinId
  stations: Array<{
    station_code: string
    province: string
    brae_level: number
    xCard: number
    yCard: number
    xStation: number
    yStation: number
    xProvince: number
    yProvince: number
    measure_time: string
    q_today: number
    q_yesterday: number
    q_diff: number
    wl_today: number
    wl_yesterday: number
    wl_diff: number
    wl_diff_brae_lv: number
    q_average_today: number | null
    q_average_yesterday: number | null
    q_average_diff: number | null
  }>
}

export interface DamStationItem {
  basinId: BasinId
  stations: Array<{
    xStaion?: number
    yStation?: number
    xValue?: number
    yValue?: number
    water_resource_name: string
    measure_time: string
    value: number
  }>
}

export const BasinStation: BasinStationItem[] = [
  {
    basinId: BasinId.Chi,
    stations: [
      {
        xCard: 345,
        yCard: 665,
        xStation: 400,
        yStation: 630,
        xProvince: 355,
        yProvince: 625,
        station_code: 'E.23',
        province: 'จ.ชัยภูมิ',
        brae_level: 9.0,
        measure_time: '2025-09-20T06:00:00.000Z',
        q_today: 232.67,
        q_yesterday: 243.33,
        q_diff: -10.66,
        wl_today: 8.57,
        wl_yesterday: 8.65,
        wl_diff: -0.08,
        wl_diff_brae_lv: -0.43,
        q_average_today: null,
        q_average_yesterday: null,
        q_average_diff: null,
      },
      {
        xCard: 520,
        yCard: 570,
        xStation: 470,
        yStation: 600,
        xProvince: 450,
        yProvince: 580,
        station_code: 'E.6C',
        province: 'จ.ชัยภูมิ',
        brae_level: 5.5,
        measure_time: '2025-09-20T06:00:00.000Z',
        q_today: 28.23,
        q_yesterday: 23.2,
        q_diff: 5.03,
        wl_today: 4.81,
        wl_yesterday: 4.5,
        wl_diff: 0.31,
        wl_diff_brae_lv: -0.69,
        q_average_today: null,
        q_average_yesterday: null,
        q_average_diff: null,
      },
      {
        xCard: 550,
        yCard: 710,
        xStation: 510,
        yStation: 635,
        xProvince: 560,
        yProvince: 670,
        province: 'จ.ชัยภูมิ',
        station_code: 'E.21',
        brae_level: 11.5,
        measure_time: '2025-09-20T06:00:00.000Z',
        q_today: 247.14,
        q_yesterday: 232.29,
        q_diff: 14.85,
        wl_today: 9.9,
        wl_yesterday: 9.74,
        wl_diff: 0.16,
        wl_diff_brae_lv: -1.6,
        q_average_today: null,
        q_average_yesterday: null,
        q_average_diff: null,
      },
      {
        xCard: 665,
        yCard: 520,
        xStation: 720,
        yStation: 460,
        xProvince: 670,
        yProvince: 480,
        province: 'จ.ขอนแก่น',
        station_code: 'E.16A',
        brae_level: 9.6000003815,
        measure_time: '2025-09-20T06:00:00.000Z',
        q_today: 233.2,
        q_yesterday: 228.4,
        q_diff: 4.8,
        wl_today: 5.84,
        wl_yesterday: 5.78,
        wl_diff: 0.06,
        wl_diff_brae_lv: -3.7600003815,
        q_average_today: null,
        q_average_yesterday: null,
        q_average_diff: null,
      },
      {
        xCard: 780,
        yCard: 410,
        xStation: 735,
        yStation: 390,
        xProvince: 780,
        yProvince: 370,
        province: 'จ.ขอนแก่น',
        station_code: 'E.22B',
        brae_level: 5.1999998093,
        measure_time: '2025-09-20T06:00:00.000Z',
        q_today: 17.7,
        q_yesterday: 13.74,
        q_diff: 3.96,
        wl_today: 4.65,
        wl_yesterday: 3.99,
        wl_diff: 0.66,
        wl_diff_brae_lv: -0.5499998093,
        q_average_today: null,
        q_average_yesterday: null,
        q_average_diff: null,
      },
      {
        xCard: 530,
        yCard: 410,
        xStation: 490,
        yStation: 360,
        xProvince: 540,
        yProvince: 370,
        province: 'จ.ขอนแก่น',
        station_code: 'E.85',
        brae_level: 10.0,
        measure_time: '2025-09-20T06:00:00.000Z',
        q_today: 239.06,
        q_yesterday: 229.76,
        q_diff: 9.3,
        wl_today: 7.73,
        wl_yesterday: 7.58,
        wl_diff: 0.15,
        wl_diff_brae_lv: -2.27,
        q_average_today: null,
        q_average_yesterday: null,
        q_average_diff: null,
      },
      {
        xCard: 800,
        yCard: 560,
        xStation: 850,
        yStation: 510,
        xProvince: 800,
        yProvince: 520,
        province: 'จ.มหาสารคาม',
        station_code: 'E.91',
        brae_level: 11.6999998093,
        measure_time: '2025-09-20T06:00:00.000Z',
        q_today: 552.5,
        q_yesterday: 547.1,
        q_diff: 5.4,
        wl_today: 9.25,
        wl_yesterday: 9.19,
        wl_diff: 0.06,
        wl_diff_brae_lv: -2.4499998093,
        q_average_today: null,
        q_average_yesterday: null,
        q_average_diff: null,
      },
      {
        xCard: 910,
        yCard: 630,
        xStation: 940,
        yStation: 525,
        xProvince: 920,
        yProvince: 590,
        province: 'จ.ร้อยเอ็ด',
        station_code: 'E.66A',
        brae_level: 11.6000003815,
        measure_time: '2025-09-20T06:00:00.000Z',
        q_today: 647.0,
        q_yesterday: 652.4,
        q_diff: -5.4,
        wl_today: 11.07,
        wl_yesterday: 11.12,
        wl_diff: -0.05,
        wl_diff_brae_lv: -0.5300003815,
        q_average_today: null,
        q_average_yesterday: null,
        q_average_diff: null,
      },
      {
        xCard: 1080,
        yCard: 650,
        xStation: 1030,
        yStation: 620,
        xProvince: 1080,
        yProvince: 610,
        province: 'จ.ร้อยเอ็ด',
        station_code: 'E.95A',
        brae_level: 8.5,
        measure_time: '2025-09-20T06:00:00.000Z',
        q_today: 884.0,
        q_yesterday: 885.5,
        q_diff: -1.5,
        wl_today: 8.06,
        wl_yesterday: 8.07,
        wl_diff: -0.01,
        wl_diff_brae_lv: -0.44,
        q_average_today: null,
        q_average_yesterday: null,
        q_average_diff: null,
      },
      {
        xCard: 1090,
        yCard: 520,
        xStation: 1045,
        yStation: 520,
        xProvince: 1090,
        yProvince: 480,
        province: 'จ.ร้อยเอ็ด',
        station_code: 'E.92',
        brae_level: 8.8000001907,
        measure_time: '2025-09-20T06:00:00.000Z',
        q_today: 137.64,
        q_yesterday: 126.04,
        q_diff: 11.6,
        wl_today: 8.06,
        wl_yesterday: 7.72,
        wl_diff: 0.34,
        wl_diff_brae_lv: -0.7400001907,
        q_average_today: null,
        q_average_yesterday: null,
        q_average_diff: null,
      },
      {
        xCard: 1050,
        yCard: 800,
        xStation: 1120,
        yStation: 760,
        xProvince: 1060,
        yProvince: 760,
        province: 'จ.ยโสธร',
        station_code: 'E.20A',
        brae_level: 10.0,
        measure_time: '2025-09-20T06:00:00.000Z',
        q_today: 1250.0,
        q_yesterday: 1253.75,
        q_diff: -3.75,
        wl_today: 10.4,
        wl_yesterday: 10.41,
        wl_diff: -0.01,
        wl_diff_brae_lv: 0.4,
        q_average_today: null,
        q_average_yesterday: null,
        q_average_diff: null,
      },
      {
        xCard: 1220,
        yCard: 860,
        xStation: 1170,
        yStation: 830,
        xProvince: 1230,
        yProvince: 820,
        province: 'จ.อุบลราชธานี',
        station_code: 'E.98',
        brae_level: 11.8000001907,
        measure_time: '2025-09-20T06:00:00.000Z',
        q_today: 1085.0,
        q_yesterday: 1075.0,
        q_diff: 10.0,
        wl_today: 9.98,
        wl_yesterday: 9.94,
        wl_diff: 0.04,
        wl_diff_brae_lv: -1.8200001907,
        q_average_today: null,
        q_average_yesterday: null,
        q_average_diff: null,
      },
    ],
  },
]

export const DamStation: DamStationItem[] = [
  {
    basinId: BasinId.Chi,
    stations: [
      {
        xStaion: 580,
        yStation: 250,
        xValue: 580,
        yValue: 190,
        water_resource_name: 'เขื่อนอุบลรัตน์',
        measure_time: '2025-09-20T00:00:00.000Z',
        value: 73.28,
      },
      {
        xStaion: 950,
        yStation: 300,
        xValue: 960,
        yValue: 230,
        water_resource_name: 'เขื่อนลำปาว',
        measure_time: '2025-09-20T00:00:00.000Z',
        value: 76.8,
      },
      {
        xStaion: 230,
        yStation: 350,
        xValue: 230,
        yValue: 290,
        water_resource_name: 'เขื่อนจุฬาภรณ์',
        measure_time: '2025-09-20T00:00:00.000Z',
        value: 78.15,
      },
    ],
  },
]
