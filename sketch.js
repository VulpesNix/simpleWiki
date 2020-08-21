let userinput;
let Select;
let Search;
let tex;
let title
let searchUrl = 'https://tr.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
let contentUrl = 'https://tr.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=';
let dataurl = "https://tr.wikipedia.org/w/api.php?action=parse&prop=text&format=json&pageid="
function setup(){
    noCanvas();
    userinput = select('#userinput');
    userinput.changed(start);
    Select = createSelect("hi");
    Search = createButton("Search");
    Search.mouseClicked(wiki);
}

function wiki(){
    title = Select.value();
    title = title.replace(/\s+/g,"_");
    console.log(contentUrl+title);
    try{
    loadJSON(contentUrl+title,printcontent,"jsonp");
    }
    catch{
        alert("NotFound");
    }
}
function printcontent(data){
    let page = data.query.pages;
    let id = Object.keys(page)[0];
    console.log(id);
    let url = dataurl+id;
    loadJSON(url,content,"jsonp");
}
function content(data){
    let text = data.parse.text["*"];
    tex = createP(text);
}

function start(){
    console.log(userinput.value());
    let url = searchUrl+userinput.value();
    console.log(url);
    loadJSON(url,gotSearch,"jsonp");
    Select.remove()
    Select = createSelect("hi");
}

function gotSearch(data){
    data = data[1];
    console.log(data);
    for(let i = 0;i < data.length;i++){
        Select.option(data[i]);
    }
    Select.selected(data[0]);
}