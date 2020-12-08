export const formatterTime = (time: string) => {
    const getzf = (num: number) => {
        let str: string = '';
        if (num < 10) {
            str = '0' + num;
        }
        return str || num;
    };

    const oDate: Date = new Date(time);
    const oYear: number = oDate.getFullYear();
    const oMonth: number = oDate.getMonth() + 1;
    const oDay: number = oDate.getDate();
    const oHour: number = oDate.getHours();
    const oMin: number = oDate.getMinutes();
    const oSec: number = oDate.getSeconds();
    return oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSec);
};
