// Toggle the dark mode
// Ativar o modo escuro

const html = document.querySelector("html")
const checkbox = document.querySelector("input[name=theme]")

const getStyle = (element, style) => 
    window
        .getComputedStyle(element)
        .getPropertyValue(style)

const initialColors = 
{
    navBg: getStyle(html, "--nav-bg"),
    portugal: getStyle(html, "--portugal"),
    aumento: getStyle(html, "--aumento"),
    diminuir: getStyle(html, "--diminuir"),
    color1: getStyle(html, "--color-1"),
    color2: getStyle(html, "--color-2"),
    color3: getStyle(html, "--color-3"),
    color5: getStyle(html, "--color-5"),
    color6: getStyle(html, "--color-6"),
    colorHeadings: getStyle(html, "--color-headings"),
}

const darkMode = 
{
    navBg:   "#000000",
    portugal: "url(\"./imagens/mapa-de-portugal-escuro.svg\")",
    aumento: "url(\"./imagens/aumento-de-letra-escuro.svg\")",
    diminuir: "url(\"./imagens/diminuicao-de-letra-escuro.svg\")",
    color1:  "#FF4500",
    color2:  "#FF4500",
    color3:  "#FF4500",
    color5:  "#000000",
    color6:  "#FFFFFF",
    colorHeadings: "#FFFFFF",
}

const transformKey = key => 
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

const changeColors = (colors) => 
{
    Object.keys(colors).map(key => 
        html.style.setProperty(transformKey(key), colors[key]) 
    )
}

checkbox.addEventListener("change", ({target}) => 
{
    target.checked ? changeColors(darkMode) : changeColors(initialColors)
})

const isExistLocalStorage = (key) => 
  localStorage.getItem(key) != null

const createOrEditLocalStorage = (key, value) => 
  localStorage.setItem(key, JSON.stringify(value))

const getValeuLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key))

checkbox.addEventListener("change", ({target}) => 
{
  if (target.checked) 
  {
    changeColors(darkMode) 
    createOrEditLocalStorage('modo','darkMode')
  } 
  
  else 
  {
    changeColors(initialColors)
    createOrEditLocalStorage('modo','initialColors')
  }
})

if(!isExistLocalStorage('modo'))
  createOrEditLocalStorage('modo', 'initialColors')


if (getValeuLocalStorage('modo') === "initialColors") 
{
  checkbox.removeAttribute('checked')
  changeColors(initialColors);
} 

else 
{
  checkbox.setAttribute('checked', "")
  changeColors(darkMode);
}
