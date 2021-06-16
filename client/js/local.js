const local_page = document.querySelector('#local');
let local_list;

const getLocalNews = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            fetch('/getLocalNews', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'latitude': position.coords.latitude,
                    'longitude': position.coords.longitude
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    local_list = data;
                    console.log(data);
                    renderLocalPage(data);
                }).catch((err) => {
                    console.log(err);
                });
        });
    } else {
        console.log("Geolocation not supported by this browser.");
    }
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
        title_link.setAttribute('href', element.originallink);
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