const Controller = {
  search: (ev) => {
    ev.preventDefault();
    currentPage = 0;
    // Resetting the pagination state
    loadMoreButton.removeAttribute("disabled");
    const form = document.getElementById("form");

    const data = Object.fromEntries(new FormData(form));
    const response = fetch(`/search?q=${data.query}`).then((response) => {
      response.json().then((results) => {
        if (results.length < 20) {
          // We can disable pagination if we know there is no future page
          loadMoreButton.setAttribute("disabled", "disabled");
        }
        Controller.updateTable(results);
      });
    });
  },

  paginate: (ev) => {
    ev.preventDefault();
    currentPage += 1;
    const form = document.getElementById("form");
    const data = Object.fromEntries(new FormData(form));
    const response = fetch(`/search?q=${data.query}&page=${currentPage}`).then((response) => {
      response.json().then((results) => {
        if (results.length < 20) {
           // We can disable pagination if we know there is no future page
          loadMoreButton.setAttribute("disabled", "disabled");
        }
        Controller.appendToTable(results);
      });
    });
  },

  updateTable: (results) => {
    const table = document.getElementById("table-body");
    const rows = [];
    for (let result of results) {
      rows.push(`<tr><td>${result}</td></tr>`);
    }
    table.innerHTML = rows;
  },

  appendToTable: (results) => {
    const table = document.getElementById("table-body");
    const rows = [];
    for (let result of results) {
      rows.push(`<tr><td>${result}</td></tr>`);
    }
    table.innerHTML += rows;
  },
};

let currentPage = 0;
const form = document.getElementById("form");
form.addEventListener("submit", Controller.search);

const loadMoreButton = document.getElementById("load-more");
loadMoreButton.addEventListener("click", Controller.paginate);
