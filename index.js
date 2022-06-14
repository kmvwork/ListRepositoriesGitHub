const processChange = debounce((e) => showResults(e));
let input = document.getElementById('q')
input.addEventListener('keyup', (e) => {
    processChange(e.target.value)
})

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

function showResults(val) {
    let input = document.getElementById('q')
    let res = document.getElementById('result')
    let listRepositories = document.getElementById('list_repositories')

    let list = ''
    let listResult = []
    res.innerHTML = ''

    if (val == '') {
        return
    }
    fetch(`https://api.github.com/search/repositories?q=${val}`)
        .then(response => {
            return response.json()
        }).then(data => {
        for (let i = 0; i <= 4; i++) {
            listResult.push(data['items'][i])
            list += '<li class="result-item">' + data['items'][i]['name'] + '</li>'
        }
        res.innerHTML = '<ul class="list--search">' + list + '</ul>'

        let resItem = document.querySelectorAll('.result-item')

        resItem.forEach((listItem, index) => {
            listItem.addEventListener('click', (e) => {
                res.innerHTML = ''
                input.value = ''
                showItemList(index)
            })
        })
    })

    function showItemList(index) {
        let div = document.createElement('div')
        div.classList.add('list_repositories-container')
        let name = listResult[index]['name']
        let owner = listResult[index]['owner']['login']
        let stars = listResult[index]['stargazers_count']
        div.innerHTML = `<div class="list_repositories--item">
                        <span class="block mt">Name: ${name}</span> 
                        <span class="block mt">Owner: ${owner}</span> 
                        <span class="block mt">Stars: ${stars}</span> 
                    </div>
                    <div class="cl-btn-6">
                        <div class="cl-btn-6-in">
                            <div class="cl-btn-6-txt">Закрыть</div>
                        </div>
                    </div>
                  </div>`
        listRepositories.appendChild(div)
        let listRepositoriesClose = document.querySelectorAll('.list_repositories-container')

        listRepositoriesClose.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                if (e.target.className !== 'cl-btn-6') {
                    deleteItemList(item)
                }
            })
        })
    }

    function deleteItemList(index) {
        index.remove()
    }
}

