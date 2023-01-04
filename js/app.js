const marca = document.querySelector('#marca')
const year = document.querySelector('#year')
const minimo = document.querySelector('#minimo')
const maximo = document.querySelector('#maximo')
const puertas = document.querySelector('#puertas')
const transmision = document.querySelector('#transmision')
const color = document.querySelector('#color')
const resultado = document.querySelector('#resultado')

const datosBusqueda = {
  marca: '',
  year: '',
  minimo: '',
  maximo: '',
  puertas: '',
  transmision: '',
  color: '',
}


const yearMax = new Date().getFullYear()
const yearMin = yearMax - 10

document.addEventListener('DOMContentLoaded', () => {
  mostrarAutos(autos)
  llenarSelect()
})

marca.addEventListener('change', e => {
  datosBusqueda.marca = e.target.value
  filtrarAuto()
})

year.addEventListener('change', e => {
  datosBusqueda.year = e.target.value
  filtrarAuto()
})

minimo.addEventListener('change', e => {
  datosBusqueda.minimo = e.target.value
  filtrarAuto()
})

maximo.addEventListener('change', e => {
  datosBusqueda.maximo = e.target.value
  filtrarAuto()
})

puertas.addEventListener('change', e => {
  datosBusqueda.puertas = Number(e.target.value)
  filtrarAuto()
})

transmision.addEventListener('change', e => {
  datosBusqueda.transmision = e.target.value
  filtrarAuto()
})

color.addEventListener('change', e => {
  datosBusqueda.color = e.target.value
  filtrarAuto()
})

function mostrarAutos(autos) {
  limpiarHTML()
  autos?.forEach(auto => {
    
    const autoHTML = document.createElement('P')
    autoHTML.textContent = `
      ${auto.marca} ${auto.modelo} - ${auto.year} - ${auto.puertas} puertas - Transmisión: ${auto.transmision} - Precio: ${auto.precio} - Color: ${auto.color}
    `
    resultado.appendChild(autoHTML)
  });
}

function llenarSelect() {
  for(let i = yearMax; i >=yearMin; i--) {
    const opcion = document.createElement('OPTION')
    opcion.value = i
    opcion.textContent = i
    year.appendChild(opcion)
  }
}

function filtrarAuto() {
  const resultado = autos.filter(filtrandoMarca).filter(filtrandoYear).filter(filtrandoMinimo).filter(filtrandoMaximo).filter(filtrandoPuertas).filter(filtrandoTransmision).filter(filtrandoColor)

  if(resultado.length !== 0) {
    mostrarAutos(resultado)
  } else {
    sinResultados()
  }
  return resultado
}

function sinResultados() {
  limpiarHTML()
  const sinResultados = document.createElement('DIV')
  sinResultados.classList.add('bg-red-500', 'text-white', 'text-sm', 'w-full', 'py-1', 'px-3', 'rounded-md')
  sinResultados.textContent = 'Sin resultados'
  resultado.appendChild(sinResultados)
}

function filtrandoMarca(auto) {
  if(datosBusqueda.marca) {
    return auto.marca === datosBusqueda.marca
  }

  return auto
}

function filtrandoYear(auto) {
  if(datosBusqueda.year) {
    return auto.year === parseInt(datosBusqueda.year)
  }

  return auto
}

function filtrandoMinimo(auto) {
  if(datosBusqueda.minimo) {
    
    return auto.precio >= datosBusqueda.minimo
  }

  return auto
}

function filtrandoMaximo(auto) {
  if(datosBusqueda.maximo) {
    return auto.precio <= datosBusqueda.maximo
  }

  return auto
}

function filtrandoPuertas(auto) {
  if(datosBusqueda.puertas) {
   return auto.puertas === datosBusqueda.puertas 
  }
  return auto
}

function filtrandoTransmision(auto) {
  if(datosBusqueda.transmision) {
    return auto.transmision === datosBusqueda.transmision
  }

  return auto
}

function filtrandoColor(auto) {
  if(datosBusqueda.color) {
    return auto.color === datosBusqueda.color
  }

  return auto
}

function limpiarHTML() {
  while(resultado.firstChild) {
    resultado.removeChild(resultado.firstChild)
  }
}