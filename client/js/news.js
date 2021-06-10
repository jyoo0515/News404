const news_back = document.querySelector('.news-back');
const news_container = document.querySelector('.news-container');
const news_iframe = document.querySelector('#news-iframe');

const handleBack = (e) => {
    news_container.classList.remove('show');
}

const handlePopup = (e) => {
    e.preventDefault();
    news_iframe.setAttribute('src', e.target.getAttribute('href'));
    news_container.classList.add('show');
}

const handleIframe = (e) => {
}

const news_init = () => {
    news_back.addEventListener('click', handleBack);
    news_iframe.onload = handleIframe;
}

news_init();