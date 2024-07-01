export const verificarRuc = (txt_ruc: string, sw_cedula: number) => {
    const cedula = txt_ruc.trim();

    if (cedula === "9999999999999") {
        return 0;
    }
    if (cedula === "9999999999999") {
        return 3;
    }
    const txt_ex1 = cedula

    if (txt_ex1.length != 13 && sw_cedula == 0) {
        return 1;
    }
    if (txt_ex1.length == 13 && sw_cedula == 0) {
        let ultimo_codigo: any = txt_ruc.substring(11, 14);
        if (ultimo_codigo === "001" && ultimo_codigo === "002" && ultimo_codigo === "003") {
            return 1;
        }
    }

    if (txt_ex1.length != 10 && sw_cedula == 1) {
        return 2;
    }


    let sum_pa: any = 0;
    let sum_im: any = 0;

    let i: any = 0;
    for (i = 1; i < 9; i += 2) {
        sum_pa = parseInt(cedula.substring(i, i + 1)) + sum_pa;
    }

    for (i = 0; i < 9; i += 2) {
        let j = 0;
        j = parseInt(cedula.substring(i, i + 1)) * 2;
        if (j > 9) {
            j -= 9;
        }
        sum_im = j + sum_im;
    }
    let tot = sum_pa + sum_im;

    while (tot > 10) {
        tot -= 10;
    }
    tot = 10 - tot;
    let string1 = parseInt(cedula.substring(9, 10));

    if (tot == string1) {
        console.log('return??')
        return 0;
    }

    if (cedula.substring(2, 3) === ("6") && txt_ex1.length == 13 && sw_cedula == 0) {
        console.log('return2')

        return 0;
    }
    if (cedula.substring(2, 3) === ("9") && txt_ex1.length == 13 && sw_cedula == 0) {
        console.log('return2')

        return 0;
    }
}