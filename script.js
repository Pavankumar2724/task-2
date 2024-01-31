var posts = [];
var currentIndex = 0;

function fetchPosts() {
    $.get("https://jsonplaceholder.typicode.com/posts", function(data) {
        posts = data;
        showPosts();
    });
}

function showPosts() {
    var tableBody = $("#api-table tbody");
    tableBody.empty();

    var searchQuery = $("#search-bar").val().toLowerCase();

    for (var i = currentIndex; i < currentIndex + 10; i++) {
        if (posts[i] && (searchQuery === '' || posts[i].title.toLowerCase().includes(searchQuery) || posts[i].id.toString().includes(searchQuery))) {
            var row = $("<tr>");
            row.append("<td>" + posts[i].id + "</td>");
            row.append("<td>" + posts[i].title + "</td>");
            row.append("<td>" + posts[i].body + "</td>");
            row.append("<td><button class='delete-btn' data-index='" + i + "'>Delete</button></td>");
            tableBody.append(row);
        }
    }

    $("#show-more").show();
    $("#show-less").show();

    if (currentIndex === 0) {
        $("#show-less").hide();
    }

    if (currentIndex + 10 >= posts.length) {
        $("#show-more").hide();
    }
}

$(document).ready(function() {
    fetchPosts();

    $("#show-more").click(function() {
        currentIndex += 10;
        showPosts();
    });

    $("#show-less").click(function() {
        currentIndex -= 10;
        showPosts();
    });

    $("#api-table").on("click", ".delete-btn", function() {
        var index = $(this).data("index");
        posts.splice(index, 1);
        showPosts();
    });

    $("#search-bar").on("input", function() {
        currentIndex = 0; // Reset index when searching
        showPosts();
    });
});
