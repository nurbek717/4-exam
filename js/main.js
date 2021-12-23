var elUsersWrapper = document.querySelector("#main-users-list");
var elPostesWrapper = document.querySelector("#main-postes-list");
var elCommentWrapper = document.querySelector("#main-comments-list");
console.log(elCommentWrapper);

var elTitle = document.querySelector("#title")
var elTitleTwo = document.querySelector("#title-two")
var elTitleThre = document.querySelector("#title-thre")


var elUsersTemplate = document.querySelector("#render-users-template").content;
var elPostsTemplate = document.querySelector("#render-posts-template").content;
var elCommentTemplate = document.querySelector("#render-comment-template").content;



//users

function renderUser(userArry,userWrapper) {
	var usersWrapper = document.createDocumentFragment()
	
		userArry.forEach((item)=> {
			var renderUserTemplate = elUsersTemplate.cloneNode(true);
			
			renderUserTemplate.querySelector("#user-link").textContent = item.name
			renderUserTemplate.querySelector("#user-email").textContent = item.email
			renderUserTemplate.querySelector("#user-country").textContent = item.username
			renderUserTemplate.querySelector("#user-company").textContent = item.company.name
			renderUserTemplate.querySelector("#user-website").textContent =  item.website
			renderUserTemplate.querySelector("#main-users-item").dataset.userId = item.id;
			
			
			usersWrapper.appendChild(renderUserTemplate)
			
		})
		
		userWrapper.innerHTML = null
		userWrapper.appendChild(usersWrapper)
	
	elTitle.textContent = `Cound of users: ${userArry.length}`
}

async function fetchData() {
	var response = await fetch("https://jsonplaceholder.typicode.com/users")
	var data = await response.json()
	
	renderUser(data, elUsersWrapper);


}

fetchData()

//posts

function renderPost(postArry, postWrapper) {
	var postsWrapper = document.createDocumentFragment()
	
		postArry.forEach((posts) => {
			var renderPostTemplate = elPostsTemplate.cloneNode(true);
			
			renderPostTemplate.querySelector("#posts-titl").textContent = posts.title
			renderPostTemplate.querySelector("#posts-body").textContent = posts.body
			renderPostTemplate.querySelector("#main-posts-item").dataset.postId = posts.id;
			renderPostTemplate.querySelector("#main-posts-item").dataset.userId = posts.userId;
			
			postsWrapper.appendChild(renderPostTemplate)
			
		})
		
		postWrapper.innerHTML = null
		postWrapper.appendChild(postsWrapper)
	
	elTitleTwo.textContent = `Cound of users: ${postArry.length}`
}


async function fetchPost() {
	let response = await fetch("https://jsonplaceholder.typicode.com/posts")
	let data = await response.json()
	
	renderPost(data, elPostesWrapper);
	
	post = data
}

fetchPost()

//comment

function renderComment(commentArry, postWrapper) {
	var postsWrapper = document.createDocumentFragment()
	

		commentArry.forEach((comment) => {
			var renderCommentTemplate = elCommentTemplate.cloneNode(true);
			
			renderCommentTemplate.querySelector("#comment-name").textContent = comment.name
			renderCommentTemplate.querySelector("#comment-link").textContent = comment.email
			renderCommentTemplate.querySelector("#comment-text").textContent = comment.body
			renderCommentTemplate.querySelector("#main-comments-item").dataset = comment.id
			renderCommentTemplate.querySelector("#main-comments-item").dataset = comment.postId
			
			postsWrapper.appendChild(renderCommentTemplate)
			
		})
		
		postWrapper.innerHTML = null
		postWrapper.appendChild(postsWrapper)
	
	elTitleThre.textContent = `Cound of users: ${commentArry.length}`
}


async function fetchComment() {
	var response = await fetch("https://jsonplaceholder.typicode.com/comments")
	var data = await response.json()
	
	renderComment(data, elCommentWrapper);

	comment  = data
}

fetchComment()

elUsersWrapper.addEventListener('click', function (evt){
	var selectedUserId = evt.target.dataset.userId

	var foundPost = post.filter((post) => post.userId == selectedUserId);

	elCommentWrapper.innerHTML= null
	elPostesWrapper.innerHTML= null
	renderPost(foundPost, elPostesWrapper);
	
	
})


elPostesWrapper.addEventListener('click', function (evt){
	
	var selectedPostId = evt.target.dataset.postId

	var foundComment = comment.filter((comment) => comment.postId == selectedPostId);
	console.log(foundComment);
	
	
	
	
	renderComment(foundComment, elCommentWrapper);
	
	
})