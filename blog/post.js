const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

var tagColors = {
  books: { background: "#FDBA74", text: "#7C2D12" },
  code: { background: "#6EE7B7", text: "#064E3B" },
  film: { background: "#D8B4FE", text: "#581C87" }
}

const url = `https://cdn.contentful.com/spaces/4e6is2t85dqg/environments/master/entries/${id}?access_token=eFNXLEj8rIO2lfh134OUeaCIZtTRazZD3Jxro3YD1CQ`;

fetch(url)
    .then(function (response) {
        return response.json();
    }).then(function (json) {
      console.log(json);
      
      let imgURL = `https://cdn.contentful.com/spaces/4e6is2t85dqg/environments/master/assets/${json.fields.mainImage.sys.id}?access_token=eFNXLEj8rIO2lfh134OUeaCIZtTRazZD3Jxro3YD1CQ`
      fetch(imgURL)
        .then(function (response) {
            return response.json();
        }).then(function (json) { 
          document.getElementById("main-img").src = json.fields.file.url;
        })
      
      var tags = "";
      for (let i = 0; i < json.metadata.tags.length; i++) {
        tagName = json.metadata.tags[i].sys.id;
        tags += `<p class="category-badge" style="color:${tagColors[tagName].text}; background-color:${tagColors[tagName].background} ;">${tagName[0].toUpperCase() + tagName.substring(1)}</p>`
      }
      document.getElementById("categories").innerHTML = tags;

      document.getElementById("title").textContent = json.fields.title;
      document.querySelector('title').textContent = `${json.fields.title} - Adam Bonny` ;
      document.getElementById("date").textContent = moment(json.fields.datePublished).format('llll');
      
      var content = json.fields.content.content;
      var output = ""
      for (let i = 0; i < content.length; i++) { 
        if (content[i].nodeType === "paragraph") {
          output += `<p>${content[i].content[0].value}</p>`;
        } else if (content[i].nodeType === "heading-2") {
          output += `<h2>${content[i].content[0].value}</h2>`;
        } else if (content[i].nodeType === "blockquote") {
          output += `<blockquote><p>${content[i].content[0].content[0].value}</p></blockquote>`;
        }
      }
      document.getElementById("content").innerHTML = output;
    });