const vote_page = document.querySelector('#vote');
let vote_list;

const getVoteNews = () => {
    fetch('/getHotNews')
        .then((response) => response.json())
        .then((data) => {
            local_list = data;
            console.log(data);
            renderVotePage(data);
        }).catch((err) => {
            console.log(err);
        });
}

const renderVotePage = (vote_list) => {
    const news_list = document.createElement('ul');
    news_list.classList.add("news-list");
    vote_list.forEach((element) => {
        const news_item = document.createElement('li');
        news_item.classList.add('news-item');
        news_list.appendChild(news_item);
        
        const title_link = document.createElement('a');
        title_link.innerHTML = element.title;
        title_link.setAttribute('href', element.link);
        news_item.appendChild(title_link);
        
        title_link.addEventListener('click', handlePopup);
    });
    vote_page.appendChild(news_list);
    vote_page.style.height = "100%";
}

const vote_init = () => {
    window.addEventListener('load', getVoteNews);
}

vote_init();