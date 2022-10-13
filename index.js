let mainContainer = document.querySelector('.main-container')
let commentsContainer = document.querySelector('.comments-container')

var comments = JSON.parse(localStorage.getItem('comments')) || []
var commentUser = JSON.parse(localStorage.getItem('commentUser'))


mainContainer.addEventListener('click', (event)=>{
    
    const {commentId , actionType} = event.target.dataset
    if(actionType == 'increment'){
        comments.forEach((comment)=>{
            if(comment.id == commentId){
                comment.score += 1
            }
        })
    }
    else if(actionType == 'decrement'){
        comments.forEach((comment)=>{
            if(comment.id == commentId){
                comment.score -= 1
            }
        })
    }
    else if(actionType == 'add-new-comment'){
        let Inpcontent = document.querySelector('.add-new-cmt-inp').value
        let replyObjCmt = {
            "id" : Math.round((Math.random()) * 100) + 5,
            "content" : Inpcontent,
            "createdAt" : "2 days ago",
            "score" : Math.round((Math.random()) * 100),
            "replies": [],
            "user" :{
                "image": { 
                    "png": "./images/avatars/image-juliusomo.png",
                    "webp": "./images/avatars/image-juliusomo.webp"
                },
                "username" : commentUser.username ,
            }
        }
        if(Inpcontent.length > 0){
            comments.push(replyObjCmt)
            document.querySelector('.add-new-cmt-inp').value = ""
        }
        else{
            alert('Add some Comments')
        }
    }
    else if(actionType == "delete-button"){
    //    console.log("1",comments)
    //    console.log(commentId)
    //    return comments.forEach((comment) => comment.id != commentId)
       comments= comments.filter((comment) => comment.id != commentId)
    }




    clearComments()
    createComments(comments)

    console.log(event.target.dataset)
    console.log(comments);

})



fetch('http://localhost:5500/data.json').then((res)=>{
    return res.json()
}).then((data)=>{
    localStorage.setItem('comments', JSON.stringify(data.comments))    
    localStorage.setItem('commentUser', JSON.stringify(data.currentUser))    

    createComments(comments)
})
function createComments(comments){
    let elems = comments.map((comment) => createMessage(comment)).join("")
    commentsContainer.innerHTML = elems
}

function clearComments(){
    commentsContainer.innerHTML = ""
}
// console.log(comments);



function createMessage(singleCmtData) {
        return (`<div>
        <div class="comment-box">
        <div class="like-box">
            <div class='plus-btn' >  
                <img src="./images/icon-plus.svg" alt="icon-plus" width="40%" data-comment-id=${singleCmtData.id} data-action-type='increment' >
            </div>
            <div>
                <p class="like-count" id="like-count">${singleCmtData.score}</p>
            </div>
            <div class='minus-btn'  >
                <img src="./images/icon-minus.svg" alt="icon-minus" width="40%" data-comment-id=${singleCmtData.id} data-action-type='decrement'>
            </div>
        </div>
        <div class="user-cmt-box">
            <div class="user-detail-box">
                <div class="img-name-date-box">
                    <div class="img-box">
                        <img src=${singleCmtData.user.image.png} alt="${singleCmtData.username}" width="80%">
                    </div>
                    <div class="user-name-box">
                        <span class="user-name">${singleCmtData.user.username}</span><span class="month-ago">${singleCmtData.createdAt}</span>
                    </div>
                </div>
                <div class="">
                    <span class="edit-icon ${singleCmtData.id}">
                        <img src="./images/icon-edit.svg" alt="">
                    </span>
                    <span class="delete-icon ${singleCmtData.id}" >
                        <img src="./images/icon-delete.svg" alt="" data-comment-id=${singleCmtData.id} data-action-type='delete-button'>
                    </span>
                </div>
            </div>
            <div>
                <p class="user-cmt">${singleCmtData.content}</p>
            </div>
        </div>
        </div>
        <div class="none ${singleCmtData.id}" id='reply-box${singleCmtData.id}'>
                <div class="post-img-box">
                    <img src="./images/avatars/image-juliusomo.png" alt="image-juliusomo" width="80%">
                </div>
                <div class="post-input-box">
                    <input type="text" class="add-cmt-inp" id="add-cmt${singleCmtData.id}" placeholder="Add reply here">
                </div>
                <div class="post-button-box">
                    <button class="button-9 ${singleCmtData.id}" id="send-btn" >Send</button>
                </div>
        </div>
        <div id="list-replies_${singleCmtData.id}" class="list-replies"></div>
    
    </div>`)
}



// let replyObjCmt = {
//     "id" : Math.round((Math.random()) * 100) + 5,
//     "content" : document.querySelector('.add-new-cmt-inp').value,
//     "createdAt" : "2 days ago",
//     "score" : Math.round((Math.random()) * 100),
//     "replies": [],
//     "user" :{
//         "image": { 
//             "png": "./images/avatars/image-juliusomo.png",
//             "webp": "./images/avatars/image-juliusomo.webp"
//         },
//         "username" : data.currentUser.username ,
//     }
// }