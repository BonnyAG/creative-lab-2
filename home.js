// postOut

const url = "https://cdn.contentful.com/spaces/4e6is2t85dqg/environments/master/entries?access_token=eFNXLEj8rIO2lfh134OUeaCIZtTRazZD3Jxro3YD1CQ";;

fetch(url)
    .then(function (response) {
        return response.json();
    }).then(function (json) {
        console.log(json);
        
        var list = ""
        var maxLength = json.items.length > 3 ? 3 : json.items.length;

        for (let i = 0; i < maxLength; i++) {
            list += `<li class="blog-card">`;
            list += `<span class="date">${moment(json.items[i].fields.datePublished).format('LL')}</span>`
            list += `<h3>${json.items[i].fields.title}</h3>`
            list += `<p>${json.items[i].fields.excerpt}</p>` // Add an excerpt field to entries
            list += `<a href="blog/blog-post.html?id=${json.items[i].sys.id}">Read more ></a>`
            list += `</li>`
        }

        document.getElementById("postOut").innerHTML = list;
    });