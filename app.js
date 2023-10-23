var ilosc = 0
var iloscteraz = 0


async function getData(){
    document.getElementById("lewo").innerHTML = ""


    const data = await fetch("http://localhost/wordpresstest/wp-json/wc/v3/products",{
        headers: {
            Authorization: `Basic ${(btoa("FajnyKuba784:Paruwkatoja150"))}`

        }
    })
    const json = await data.json()

    console.log(json)

    for(let i in json){

        const body = document.getElementById("lewo")
        const div = document.createElement("div")
        div.classList.add("divy")
        const nazwa = document.createElement("h1")
        const cena = document.createElement("h2")
        const ilosc = document.createElement("h2")
        const iilosc = document.createElement("input")
        iilosc.setAttribute("id","iloscdiv"+json[i].id)
        const zatwierdz = document.createElement("button")
        nazwa.innerHTML = json[i].name
        cena.innerHTML = json[i].regular_price
        ilosc.innerHTML = json[i].stock_quantity
        iilosc.setAttribute("placeholder","Ilosc: ")
        ilosc.setAttribute("id",json[i].id)
        zatwierdz.innerHTML = "Zatwierdz"
        zatwierdz.addEventListener('click',()=>{

            zmien(json[i].id , json[i].stock_quantity)

        })
        div.appendChild(nazwa)
        div.appendChild(cena)
        div.appendChild(ilosc)
        div.appendChild(iilosc)
        div.appendChild(zatwierdz)
        body.appendChild(div)

    }

}

async function dodaj(){

    const nazwal = document.getElementById("nazwa").value
    const cenal = document.getElementById("cena").value

    ilosc = parseInt(document.getElementById("ilosc").value)

    const bodyl = {"stock_quantity":ilosc+0,
    "name":nazwal,
"regular_price":cenal,
"menage_stock":true}
    
    console.log(bodyl)
    

    const data = await fetch(`http://localhost/wordpresstest/wp-json/wc/v3/products/`,{
        method: "POST",
        body: JSON.stringify(bodyl),
        headers: {
            Authorization: `Basic ${(btoa("FajnyKuba784:Paruwkatoja150"))}`,
            "Content-Type": "application/json"
        }
    })

    const json = await data.json()


    getData()

}

async function zmien(id,iloscp){

    ilosc = parseInt(document.getElementById(id).innerHTML)
    iloscteraz = parseInt(document.getElementById("iloscdiv"+id).value)

    const body = {"stock_quantity":ilosc+iloscteraz}

    console.log(body)
    

    const data = await fetch(`http://localhost/wordpresstest/wp-json/wc/v3/products/${id}`,{
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            Authorization: `Basic ${(btoa("FajnyKuba784:Paruwkatoja150"))}`,
            "Content-Type": "application/json"
        }
    })

    const json = await data.json()
    


}