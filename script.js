const modal = document.querySelector("dialog");
const addBtn = document.querySelector("#add-button");
const closeBtn = document.querySelector("#close");
const bookContainer = document.querySelector(".grid");
const addBtnContainer = document.querySelector(".add-book");

const form = document.querySelector("form");

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#page-number");
const readInput = document.querySelector("#read");

const libraryBooks = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

addBtn.addEventListener("click", e => {
    modal.showModal();
});

form.addEventListener("submit", e => {
    const book = new Book(titleInput.value, authorInput.value,
                          pagesInput.value, readInput.checked);
    libraryBooks.push(book);
    addBook(book, libraryBooks.length - 1);
    form.reset();
});

closeBtn.addEventListener("click", e => {
    e.preventDefault();
    modal.close();
});

function addBook(bookObj, index) {
    const book = document.createElement("div");
    book.className = "book";
    book.setAttribute("data-index", `${index}`);

    const titleElement = document.createElement("h2");
    titleElement.textContent = `"${bookObj.title}"`;

    const authorElement = document.createElement("h3");
    authorElement.textContent = bookObj.author;

    const pagesElement = document.createElement("h4");
    pagesElement.textContent = bookObj.pages + " pages";

    const deleteElement = document.createElement("div");
    deleteElement.className = "delete-book";
    deleteElement.textContent = "X";

    const readBtn = document.createElement("button");
    if (bookObj.read) {
        readBtn.textContent = "Read";
        readBtn.className = "read";
    }
    else {
        readBtn.textContent = "Not Read";
        readBtn.className = "not-read";
    }

    book.appendChild(titleElement);
    book.appendChild(authorElement);
    book.appendChild(pagesElement);
    book.appendChild(readBtn);
    book.appendChild(deleteElement);
    
    bookContainer.insertBefore(book, addBtnContainer);
}


bookContainer.addEventListener("click", e => {
    if (e.target.className === "read") {
        e.target.className = "not-read";
        e.target.textContent = "Not Read";
        libraryBooks[e.target.parentElement.dataset.index].read = false;
    }
    else if (e.target.className === "not-read") {
        e.target.className = "read";
        e.target.textContent = "Read";
        libraryBooks[e.target.parentElement.dataset.index].read = true;
    }
    else if (e.target.className === "delete-book") {
        const index = e.target.parentElement.dataset.index;
        if (e.target.parentElement.nextSibling.className === "book") {
            e.target.parentElement.nextSibling.dataset.index -= 1;
        }
        libraryBooks.splice(index, 1);
        e.target.parentElement.remove();
    }
});