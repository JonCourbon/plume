var fuse;
var searchVisible = false;
var maininput = document.getElementById("searchField");
var resultsAvailable = false;

function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open("GET", path);
    httpRequest.send();
}
function loadSearch(indexpath) {
    fetchJSONFile(indexpath, function (data) {
        var options = { shouldSort: true, location: 0, distance: 100, threshold: 0.7, minMatchCharLength: 2, keys: ["title", "tags", "categories"] };
        fuse = new Fuse(data, options);
        firstRun=false;
        var text = maininput.value;
        if(text.length > 2){
            executeSearch(this.value);
            document.getElementById("searchField").focus();
        }
        else{
          document.getElementById("searchResults").innerHTML = '';
        }
    });
}
function executeSearch(term) {
    let results = fuse.search(term);
    let searchitems = "";
    if (results.length === 0) {
        resultsAvailable = false;
        searchitems = "";
    } else {
        for (let item in results.slice(0, 5)) {
            searchitems =
                searchitems +
                '<li><a href="' +
                results[item].permalink +
                '" tabindex="0">' +
                '<span class="title">' +
                results[item].title +
                '</span></a></li>';
        }
        resultsAvailable = true;
    }
    document.getElementById("searchResults").innerHTML = searchitems;

}
