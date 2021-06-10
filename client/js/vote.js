const vote_page = document.querySelector('#local');
let vote_list;

const getHotNews = () => {
    fetch('/getHotNews').then(response => response.json()).then(data => console.log(data))
}
const renderLocalPage = (local_list) => {
    const news_list = document.createElement('ul');
    news_list.classList.add("news-list");
    local_list.forEach((element) => {
        const news_item = document.createElement('li');
        news_item.classList.add('news-item');
        news_list.appendChild(news_item);
        
        const title_link = document.createElement('a');
        title_link.innerHTML = element.title;
        title_link.setAttribute('href', element.link);
        news_item.appendChild(title_link);
        
        title_link.addEventListener('click', handlePopup);
    });
    local_page.appendChild(news_list);
    local_page.style.height = "100%";
}

const local_init = () => {
    window.addEventListener('load', getLocalNews);
}

local_init();