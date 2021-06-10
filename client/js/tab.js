const tab_items = document.querySelectorAll('.tab-item');
const page_items = document.querySelectorAll('.news-page');

const handleClick = (e) => {
    const value = e.target.getAttribute('value');

    page_items.forEach(page => {
        if (page.id === value) {
            page.classList.add('show');
        } else {
            page.classList.remove('show');
        }
    })

    tab_items.forEach(tab => {
        tab.classList.remove('checked');
    });
    
    e.target.classList.add('checked');
}

function openTab(evt, tabName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(tabName).style.display = "block";
      evt.currentTarget.className += " active";
}

const tabs_init = () => {
    tab_items.forEach(tab => {
        tab.addEventListener('click', handleClick);
        console.log(tab.getAttribute('value'));
    });
}

tabs_init();