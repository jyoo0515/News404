const wiki_toggle = document.querySelector('.wiki-toggle')
const wiki_container = document.querySelector('.wiki-container');

const wikiHandler = (e) => {
    wiki_container.classList.toggle('show');
}

const wiki_init = () => {
    wiki_toggle.addEventListener('click', wikiHandler);
}

wiki_init();