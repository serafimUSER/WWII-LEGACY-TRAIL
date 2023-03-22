let status = 0;

function Render(data) {
    let htmlData = ``;
    

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const item = data[key];
          htmlData += `
          <div class="crad__info">
              <div class="image" style="background: url('${item.src}'); background-size: cover;">
              </div>
              <div class="descript">
                  <h3>${item.title}</h3>
                  <p>${item.text}</p>
              </div>
          </div>
          `
          L.marker(item.loc, {icon: Icon}).addTo(map);
        }
      }
    document.getElementById('render').innerHTML = htmlData;
}

function ButtonActive(id){
    if (status != 0 && status != id) {
        ButtonUnActive(status);
    }

    status = id;
    let renderData;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'js/json/data.json', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            if (id == 1) {
                renderData = data.mon;
            } else if (id == 2){
                renderData = data.mus;
            } else {
                renderData = data.oth;
            }
            Render(renderData)
            
        }
    };

    xhr.send();


    let srcs = ["../img/black/black_monuments.svg", "../img/black/black_musiem.svg", "../img/black/black_others.svg"]

    setTimeout(function() {
        document.getElementById('ButtonActive' + id).style.backgroundColor = "#e2e2e2";
        document.getElementById('Img' + id).src = srcs[id-1];
    }, 50); 
}

function ButtonUnActive(id){
    let srcs = ["../img/active/monuments.svg", "../img/active/musiem.svg", "../img/active/others.svg"]

    document.getElementById('ButtonActive' + id).style.backgroundColor = "#222222";
    document.getElementById('Img' + id).src = srcs[id-1];
}


