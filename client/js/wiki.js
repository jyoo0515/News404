const wiki_toggle = document.querySelector('.wiki-toggle')
const wiki_container = document.querySelector('.wiki-container');
const wiki_list = document.querySelector('.wiki-list');
const wiki_input = document.querySelector('.wiki-input');
const wiki_search = document.querySelector('.wiki-search');
const wiki_icon = document.querySelector('.wiki-search i');

const getMean = (question) => {
    return fetch('/getWiki', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'question': question
        })
    })
        .then(response => response.json())
        .catch(err => {
            console.log(err);
        });
}

const toggleHandler = (e) => {
    wiki_container.classList.toggle('show');
}

const inputHandler = (e) => {
    if (e.keyCode === 13) {
        getMean(wiki_input.value)
            .then(data => {
                renderWikiList(wiki_input.value, data[0].mean)
            }).then(() => {
                wiki_input.value = "";
            }).catch(err => {
                console.log(err);
                renderWikiList(wiki_input.value, "정의를 찾지 못했습니다.");
                wiki_input.value = "";
            });
        
        wiki_icon.classList.add('pop');
        setTimeout(() => {
            wiki_icon.classList.remove('pop');
        }, 200);
        wiki_search.classList.add('pop');
        setTimeout(() => {
            wiki_search.classList.remove('pop');
        }, 200);
    }
}

const deleteHandler = (e) => {
    const removed = e.target.parentElement;
    removed.classList.add('swipe');

    setTimeout(() => {
        removed.remove();
    }, 1000)
}

const renderWikiList = (que, ans) => {
    const wiki_item = document.createElement('li');
    wiki_item.classList.add('wiki-item');
    const item_b = document.createElement('b');
    item_b.innerHTML = que;
    const item_i = document.createElement('i');
    item_i.classList.add('fas');
    item_i.classList.add('fa-times');
    item_i.addEventListener('click', deleteHandler);
    const item_p = document.createElement('p');
    item_p.innerHTML = ans;

    wiki_item.appendChild(item_b);
    wiki_item.appendChild(item_i);
    wiki_item.appendChild(item_p);
    wiki_list.prepend(wiki_item);
}

const wiki_init = () => {
    wiki_toggle.addEventListener('click', toggleHandler);
    wiki_input.addEventListener('keyup', inputHandler);
}

wiki_init();