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
    Yom = '/images/Yom.jpg',
    Nan = '/images/Nan.jpg',
    KhongNortheast = '/images/KhongNortheast.png',
    Chi = '/images/Chi2.png',
    Mun = '/images/Mun.png',
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

export const BasinImgMap: Record<BasinId, string> = {
    [BasinId.Salawin]: ImgBasinImg.Salawin,
    [BasinId.KhongNorth]: ImgBasinImg.KhongNorth,
    [BasinId.Ping]: ImgBasinImg.Ping,
    [BasinId.Wang]: ImgBasinImg.Wang,
    [BasinId.Yom]: ImgBasinImg.Yom,
    [BasinId.Nan]: ImgBasinImg.Nan,
    [BasinId.KhongNortheast]: ImgBasinImg.KhongNortheast,
    [BasinId.Chi]: ImgBasinImg.Chi,
    [BasinId.Mun]: ImgBasinImg.Mun,
    [BasinId.ChaoPhraya]: ImgBasinImg.ChaoPhraya,
    [BasinId.SakaeKrang]: ImgBasinImg.SakaeKrang,
    [BasinId.PaSak]: ImgBasinImg.PaSak,
    [BasinId.MaeKlong]: ImgBasinImg.MaeKlong,
    [BasinId.BangPakong]: ImgBasinImg.BangPakong,
    [BasinId.EastCoast]: ImgBasinImg.EastCoast,
    [BasinId.PhetchaburiPrachuap]: ImgBasinImg.PhetchaburiPrachuap,
    [BasinId.UpperSouth]: ImgBasinImg.UpperSouth,
    [BasinId.LowerSouth]: ImgBasinImg.LowerSouth,
}

// เปลี่ยน BasinStation เป็น array
export interface BasinStationItem {
    basinId: BasinId;
    stations: Array<{
        station_code: string;
        river: string;
        x: number;
        y: number;
    }>;
}

export const BasinStation: BasinStationItem[] = [
    {
        basinId: BasinId.Salawin,
        stations: [
            {
                station_code: 'สถานีวัดน้ำแม่ลาว',
                river: 'แม่น้ำแม่ลาว',
                x: 1,
                y: 2,
            },
            {
                station_code: 'สถานีวัดน้ำเชียงคาน',
                river: 'แม่น้ำโขง',
                x: 2,
                y: 3,
            },
        ],
    },
    {
        basinId: BasinId.KhongNorth,
        stations: [
            {
                station_code: 'สถานีวัดน้ำเชียงคาน',
                river: 'แม่น้ำโขง',
                x: 2,
                y: 3,
            },
        ],
    },
    {
        basinId: BasinId.Ping,
        stations: [
            {
                station_code: 'สถานีวัดน้ำแม่ต้าน',
                river: 'แม่น้ำปิง',
                x: 3,
                y: 4,
            },
        ],
    },
    {
        basinId: BasinId.Wang,
        stations: [
            {
                station_code: 'สถานีวัดน้ำแม่งัด',
                river: 'แม่น้ำวัง',
                x: 4,
                y: 5,
            },
        ],
    },
    {
        basinId: BasinId.Yom,
        stations: [
            {
                station_code: 'สถานีวัดน้ำบ้านตึก',
                river: 'แม่น้ำยม',
                x: 5,
                y: 6,
            },
        ],
    },
    {
        basinId: BasinId.Nan,
        stations: [
            {
                station_code: 'สถานีวัดน้ำทุ่งช้าง',
                river: 'แม่น้ำน่าน',
                x: 6,
                y: 7,
            },
        ],
    },
    {
        basinId: BasinId.KhongNortheast,
        stations: [
            {
                station_code: 'สถานีวัดน้ำปากเซ',
                river: 'แม่น้ำโขง',
                x: 7,
                y: 8,
            },
        ],
    },
    {
        basinId: BasinId.Chi,
        stations: [
            {
                station_code: 'สถานีวัดน้ำท่าช้าง',
                river: 'แม่น้ำชี',
                x: 8,
                y: 9,
            },
        ],
    },
    {
        basinId: BasinId.Mun,
        stations: [
            {
                station_code: 'สถานีวัดน้ำพิมาย',
                river: 'แม่น้ำมูล',
                x: 9,
                y: 10,
            },
        ],
    },
    {
        basinId: BasinId.ChaoPhraya,
        stations: [
            {
                station_code: 'สถานีวัดน้ำเจ้าพระยา',
                river: 'แม่น้ำเจ้าพระยา',
                x: 10,
                y: 11,
            },
        ],
    },
    {
        basinId: BasinId.SakaeKrang,
        stations: [
            {
                station_code: 'สถานีวัดน้ำตะเพินคี่',
                river: 'แม่น้ำสะแกกรัง',
                x: 11,
                y: 12,
            },
        ],
    },
    {
        basinId: BasinId.PaSak,
        stations: [
            {
                station_code: 'สถานีวัดน้ำลำนารายณ์',
                river: 'แม่น้ำป่าสัก',
                x: 12,
                y: 13,
            },
        ],
    },
    {
        basinId: BasinId.MaeKlong,
        stations: [
            {
                station_code: 'สถานีวัดน้ำบ้านโป่ง',
                river: 'แม่น้ำแม่กลอง',
                x: 13,
                y: 14,
            },
        ],
    },
    {
        basinId: BasinId.BangPakong,
        stations: [
            {
                station_code: 'สถานีวัดน้ำบางปะกง',
                river: 'แม่น้ำบางปะกง',
                x: 14,
                y: 15,
            },
        ],
    },
    {
        basinId: BasinId.EastCoast,
        stations: [
            {
                station_code: 'สถานีวัดน้ำประแสร์',
                river: 'แม่น้ำประแสร์',
                x: 15,
                y: 16,
            },
        ],
    },
    {
        basinId: BasinId.PhetchaburiPrachuap,
        stations: [
            {
                station_code: 'สถานีวัดน้ำบ้านแหลม',
                river: 'แม่น้ำเพชรบุรี',
                x: 16,
                y: 17,
            },
        ],
    },
    {
        basinId: BasinId.UpperSouth,
        stations: [
            {
                station_code: 'สถานีวัดน้ำตาปี',
                river: 'แม่น้ำตาปี',
                x: 17,
                y: 18,
            },
        ],
    },
    {
        basinId: BasinId.LowerSouth,
        stations: [
            {
                station_code: 'สถานีวัดน้ำบางนรา',
                river: 'แม่น้ำบางนรา',
                x: 18,
                y: 19,
            },
        ],
    },
];
