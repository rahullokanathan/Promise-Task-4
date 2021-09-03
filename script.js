async function displayHolidays() {
    location.reload;
    let input = document.querySelector(".country").value;
    let con = input.charAt(0).toUpperCase() + input.slice(1);
    let error = document.querySelector(".error");
    let year = document.querySelector(".year").value;
  
    document.querySelector(".country").value = "";
    document.querySelector(".year").value = "";
    let api_key = "97fa3d71604e3cc50b282a22e5b183c29bac3630";
  
    if (input !== "" && year !== "") {
      if (year < 2005 || year > 2049) {
        error.innerHTML = "*enter year between 2005-2049";
        error.style.color = "red";
      } else {
        error.innerHTML = "";
        const response = await fetch("https://restcountries.eu/rest/v2/all");
        const countries = await response.json();
        const res = countries.filter((country) => {
          return country.name === con;
        });
  
        let conCode = res[0].alpha2Code;
        let url = `https://calendarific.com/api/v2/holidays?api_key=${api_key}&country=${conCode}&year=${year}`;
        showData(url);
      }
    }
  }
  
  async function showData(url) {
    let table = document.querySelector(".table");
    let tbody = document.querySelector(".tbody");
    let scrolldown = document.querySelector(".scrolldown");
    const resp = await fetch(url);
    const data = await resp.json();
    const holidays = data.response.holidays;
  
    let new_tbody = document.createElement("tbody");
    new_tbody.setAttribute("class", "tbody");
    table.classList.remove("d-none");
  
    let i = 1;
    holidays.map((record) => {
      let tr = document.createElement("tr");
      let th = document.createElement("th");
      th.class = "row";
      th.innerHTML = i;
      i++;
      let date = document.createElement("td");
      date.innerHTML = `${record.date.datetime.day}/${record.date.datetime.month}/${record.date.datetime.year}`;
      let name = document.createElement("td");
      name.innerHTML = record.name;
      let desc = document.createElement("td");
      desc.innerHTML = record.description;
      tr.append(th, date, name, desc);
      new_tbody.append(tr);
    });
    table.replaceChild(new_tbody, tbody);
    scrolldown.style.overflow = "scroll";
    scrolldown.style.height = "500px";
  }
  