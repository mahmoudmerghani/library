class Book {
    #title;
    #author;
    #pages;
    #read;

    constructor(title, author, pages, read) {
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        this.#read = read;
    }

    getTitle() {
        return this.#title;
    }

    getAuthor() {
        return this.#author;
    }

    getPages() {
        return this.#pages;
    }

    isRead() {
        return this.#read;
    }

    toggleRead() {
        this.#read = !this.#read;
    }
}

class Library {
    static #books = [];

    static addBook(book) {
        this.#books.push(book);
    }

    static getBooks() {
        return this.#books;
    }
}

class LibraryUI {
    static #modal = document.querySelector("dialog");
    static #addBtn = document.querySelector("#add-button");
    static #closeBtn = document.querySelector("#close");
    static #bookContainer = document.querySelector(".grid");
    static #addBtnContainer = document.querySelector(".add-book");

    static #form = document.querySelector("form");

    static #titleInput = document.querySelector("#title");
    static #authorInput = document.querySelector("#author");
    static #pagesInput = document.querySelector("#page-number");
    static #readInput = document.querySelector("#read");
    
    static #createBookElement(bookObj, index) {
        const bookElement = document.createElement("div");
        bookElement.className = "book";
        bookElement.setAttribute("data-index", `${index}`);

        const titleElement = document.createElement("h2");
        titleElement.textContent = `"${bookObj.getTitle()}"`;

        const authorElement = document.createElement("h3");
        authorElement.textContent = bookObj.getAuthor();

        const pagesElement = document.createElement("h4");
        pagesElement.textContent = bookObj.getPages() + " pages";

        const deleteElement = document.createElement("div");
        deleteElement.className = "delete-book";
        deleteElement.textContent = "X";

        const readBtn = document.createElement("button");
        if (bookObj.isRead()) {
            readBtn.textContent = "Read";
            readBtn.className = "read";
        }
        else {
            readBtn.textContent = "Not Read";
            readBtn.className = "not-read";
        }

        bookElement.appendChild(titleElement);
        bookElement.appendChild(authorElement);
        bookElement.appendChild(pagesElement);
        bookElement.appendChild(readBtn);
        bookElement.appendChild(deleteElement);
        
        this.#bookContainer.insertBefore(bookElement, this.#addBtnContainer);
    }

    static #render() {
        const children = Array.from(this.#bookContainer.children);
        
        // Loop through and remove only the book elements
        // don't remove the add button
        children.forEach(child => {
            if (!child.classList.contains("add-book")) {
                this.#bookContainer.removeChild(child);
            }
        });
    
        const books = Library.getBooks();
        books.forEach((book, index) => this.#createBookElement(book, index));
    }

    // event listeners
    static {
        this.#addBtn.addEventListener("click", e => {
            this.#modal.showModal();
        });
        
        this.#form.addEventListener("submit", e => {
            const book = new Book(this.#titleInput.value, this.#authorInput.value,
                                  this.#pagesInput.value, this.#readInput.checked);
            Library.getBooks().push(book);
            this.#render();
            this.#form.reset();
        });
        
        this.#closeBtn.addEventListener("click", e => {
            e.preventDefault();
            this.#modal.close();
        });
        
        this.#bookContainer.addEventListener("click", e => {
            const index = e.target.parentElement.dataset.index;

            if (e.target.className === "read" || e.target.className === "not-read") {
                Library.getBooks()[index].toggleRead();
                this.#render();
            }
            else if (e.target.className === "delete-book") {
                Library.getBooks().splice(index, 1);
                this.#render();
            }
        });
    }
}