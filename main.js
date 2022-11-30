let section = document.querySelector('[data-conturey]');
let contaner = document.querySelector('.contaner')
let linko = document.querySelector('a')
let cunD = document.querySelector('[cun-detals]')



let data = [];

fetch("https://restcountries.com/v3.1/all")
  .then(req => req.json())
  .then(data => data)
  .then(nai =>
    data = nai.map(cun => { 
      let card = section.content.cloneNode(true).children[0]
      let img = card.querySelector('.img img')
      let conName = card.querySelector('.cun-name')
      let population = card.querySelector('[population]')
      let region = card.querySelector('[region]')
      let Capital = card.querySelector('[capital]')
      let link = card.querySelector('a')


      conName.textContent = cun.name.common
      img.setAttribute('src', `${cun.flags.png}`)
      population.textContent = cun.population
      region.textContent = cun.region
      Capital.textContent = cun.capital
      // link.setAttribute("href", `/${cun.cca3}`)
      
      let cunInfo = cunD.content.cloneNode(true).children[0]
      let DcunName = cunInfo.querySelector(".flag-info h1")
      let Dimg = cunInfo.querySelector('.flag-a-img img')
      let DNname = cunInfo.querySelector(".info-d .Nname span")
      let DPop = cunInfo.querySelector(".info-d .Pop span")
      let DReg = cunInfo.querySelector(".info-d .Reg span")
      let DSRegion = cunInfo.querySelector(".info-d .SRegion span")
      let DCap = cunInfo.querySelector(".info-d .Cap span")
      let DTDom = cunInfo.querySelector(".info-d .TDom span")
      let DCurr = cunInfo.querySelector(".info-d .Curr span")
      let DLang = cunInfo.querySelector(".info-d .Lang span")
      let DothCunLinksButtns = cunInfo.querySelector(".oth-cuns .con-cuns")

      let DBack = cunInfo.querySelector('.Back')

      if (cun.borders && DothCunLinksButtns.innerHTML.trim() == "") {
        for (let i = 0; i < cun.borders.length; i++) {
          let button = document.createElement('button')
          button.innerText = cun.borders[i]
          DothCunLinksButtns.append(button)
        }
      } else {
          DothCunLinksButtns.innerHTML = 'no Cuntres found'
      };

      img.onclick = (e) => {
        document.querySelector('main').style.display = 'none'
        DcunName.textContent = cun.name.official
        Dimg.setAttribute('src', `${cun.flags.svg}`)
        let wow = Object.values(cun.name.nativeName)
        DNname.textContent = Object.values(wow[0])[0]
        DPop.textContent = cun.population
        DReg.textContent = cun.region
        DSRegion.textContent = cun.subregion
        DCap.textContent = cun.capital
        DTDom.textContent = cun.tld[0]
        let haha = Object.values(cun.currencies)
        DCurr.textContent = Object.values(haha[0])[0]
        DLang.textContent = Object.values(cun.languages)[0]





        cunInfo.style.display = 'block'
        body.append(cunInfo)
      }
      
      DBack.onclick = () => {
        cunInfo.style.display = 'none'
        document.querySelector('main').style.display = 'block'
      }

      if (!cun.capital) {
        Capital.textContent = "No Capital"
      }
        contaner.append(card)
      return {countryN: cun.name.common, element: card, region: cun.region, }
}))

// Dark and light theme

let theme = document.querySelector('header button')
let body = document.querySelector('body')
let i = document.createElement('i')

if (window.localStorage.getItem("Mode") == "Dark") {
    body.setAttribute("class", "Dark")
    theme.innerHTML = "Light Mode"
    theme.prepend(i)
    i.setAttribute("class", "fa-regular fa-sun")
    window.localStorage.setItem('Mode' , "Dark")
} else {
    body.setAttribute("class", "")
    theme.innerHTML = 'Dark Mode'
    theme.prepend(i)
    i.setAttribute("class", "fa-regular fa-moon")
    window.localStorage.setItem("Mode" , "Light")
}

theme.onclick = () => {
  if (body.classList[0] == 'Dark') {
    body.setAttribute("class", "")
    theme.innerHTML = 'Dark Mode'
    theme.prepend(i)
    i.setAttribute("class", "fa-regular fa-moon")
    window.localStorage.setItem("Mode" , "Light")
  } else {
    body.setAttribute("class", "Dark")
    theme.innerHTML = "Light Mode"
    theme.prepend(i)
    i.setAttribute("class", "fa-regular fa-sun")
    window.localStorage.setItem('Mode' , "Dark")
  }
}


// search bar and filter

let search = document.querySelector('.search')
let filtter = document.querySelector('.ragion-filter')



search.oninput = (e) => {
  let value = e.target.value.toLowerCase()
  data.forEach(con => {
    let inVisable = con.countryN.toLowerCase().includes(value)
    con.element.classList.toggle("hidden", !inVisable)
  })
}

filtter.onchange = (g) => {
  let revalue = g.target.value.toLowerCase()
  data.forEach(re => {
    let inVisablere = re.region.toLowerCase() == revalue;
    re.element.classList.toggle("hidden", !inVisablere)
    if (revalue == "all") {
      re.element.classList = ""
    }
  })
}

