
let departamentos= [

 { departmentId: 0,
  displayName: "Loading"},
  { departmentId: 1,
    displayName: "Loading"},
    { departmentId: 2,
      displayName: "Loading"},
      { departmentId: 3,
        displayName: "Loading"},
        { departmentId: 4,
          displayName: "Loading"},
          { departmentId:5,
            displayName: "Loading"},
  ];

let pagina = 1;
let pagination = [ ]

function next(page_number) {
  if (pagina < departamentos.length / 3) {
    pagina += page_number;
    //console.log(pagina);
    let depts = departamentos.slice((pagina - 1) * 6, pagina * 6);
    document.getElementById("departamentos").innerHTML = "";
    imprimirProducts(depts);
  }
}

function prev(page_number) {
  if (pagina > 1) {
    pagina -= page_number;
    //console.log(pagina);
    let depts = departamentos.slice((pagina - 1) * 6, pagina * 6);
    document.getElementById("departamentos").innerHTML = "";
    imprimirProducts(depts);
  }
}

console.log("comenzando llamado de la api categorias");



const llamandoAPI = async () => {
  try {
    const respuesta = await fetch(
      "https://collectionapi.metmuseum.org/public/collection/v1/departments"
    );
    const { departments: data } = await respuesta.json();
  
    //console.log(data);

    if (data !== null) {
      departamentos = data;
      imprimirProducts(departamentos.slice((pagina - 1) * 6, pagina * 6))
    } else {
      console.log("no hay proximo");
    }
  } catch (error) {
    console.log(error);
  }
};

llamandoAPI();
//console.log(productos)

const imprimirTarjeta = (id)=>{
  console.log(`Quiero ver los objetos del departamento: ${id}`)
  localStorage.setItem("departamentSelected",`${id}` );

}


const imprimirProducts = (data) => {

    document.getElementById("departamentos").innerHTML = "";

    if(!data){
        console.log("no hay datos")
    }else{
        for (let i = 0; i < data.length; i++) {
          
            let div = document.createElement("div");
            div.className += "card";
            div.setAttribute("id", `${data[i].departmentId}`);
            div.innerHTML = `
            <h4>${data[i].departmentId}</h4>
            <h2>${data[i].displayName}</h2>
            <a class="btnVer" href="https://juanjpl.github.io/museum-talento-tech/pages/products/products.html" onClick={imprimirTarjeta(${data[i].departmentId})} >Ver</a>
            `;

//https://juanjpl.github.io/museum-talento-tech/pages/products/products.html
            //console.log(div);
            document.getElementById("departamentos").appendChild(div);
          }
    }

};

imprimirProducts(departamentos.slice((pagina - 1) * 6, pagina * 6))