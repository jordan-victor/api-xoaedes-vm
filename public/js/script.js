function data(){
    let dia = new Date().getDate()
    let mes = new Date().getMonth()
    let ano = new Date().getFullYear()

    let mesAgora = ""
    let diaAgora = ""
    if(Number(dia) < 10){
        diaAgora = "0" + dia
    }
    else{
        diaAgora = dia
    }

    if(Number(mesAgora) < 10){
        mesAgora = "0" + mes
    }
    else{
        mesAgora = mes
    }


    document.getElementById("data").innerHTML = `${diaAgora}/${mesAgora}/${ano}`
}

data()