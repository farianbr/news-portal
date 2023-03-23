// API Link: https://github.com/ProgrammingHero1/news-portal

const mainContainer = document.querySelector('.main-container')
let articleCount
let catagoryName
let activeCategory = false

const fetchAllNews = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => showAllNewsTitles(data.data.news_category))
}
fetchAllNews()

const showAllNewsTitles = data => {
    const allNewsCategory = document.querySelector('.all-news-category')
    data.forEach(element => {
        const name = document.createElement('div')
        name.innerText = element.category_name
        allNewsCategory.appendChild(name)
        name.classList.add('news-category')
        name.addEventListener('click', (e) => {
            fetchAllNewsArticles(e,element.category_id);
            catagoryName = element.category_name
        })
    });
} 

const fetchAllNewsArticles = (e,id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => showAllNewsArticles(e,data.data))
}

const showAllNewsArticles = (e,data) => {
    mainContainer.innerHTML = ""
    articleCount = data.length
    showArticleCount(articleCount,catagoryName)
    data.forEach(element =>{
        const articleImage = element.thumbnail_url
        console.log(articleImage);
        const articleTitle = element.title
        console.log(articleTitle)
        const articleBody = element.details.slice(0,600)
        console.log(articleBody);
        const authorName = element.author.name
        console.log(authorName);
        const publishDate = element.author.published_date
        if(publishDate === null){
            
        }
        else{
            publishDate.slice(0,10)
        }
        console.log(publishDate);
        const authorImage = element.author.img
        console.log(authorImage);

        const section = document.createElement("section")
        section.classList.add('article-container')
        section.innerHTML = `
        <div class="image-container">
                <img src="${articleImage}" alt="" srcset="">
            </div>
            <div class="details-container">
                <h2 class="article-title">${articleTitle}</h2>
                <span class="article-body">${articleBody}....</span>
                <div class="article-bottom">
                    <div class="article-author-container">
                        <div class="author-image-container">
                            <img class="author-image" src="${authorImage}" alt="" srcset="">
                        </div>
                        <div class="author-detail-container">
                            <span class="author-name">${authorName}</span>
                            <span class="publish-date">${publishDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        `
        mainContainer.appendChild(section)
        
    })
    clickEffect(e)
}

const showArticleCount = (count,category) => {
    const articleCount = document.querySelector('.item-count')
    articleCount.innerText = `${count} items found for category ${category}`
}

const clickEffect = e => {
    const catagories = document.querySelectorAll('.news-item-clicked');
    catagories.forEach(div =>{
        console.log(div);
        div.classList.remove('news-item-clicked')
        div.classList.add('news-category')
    })
    console.log(e.target);
    e.target.classList.remove('news-category')
    e.target.classList.add('news-item-clicked')
}
