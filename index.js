const postIdInput = document.getElementById("postIdInput");
const postContainer = document.getElementById("postContainer");
const postContent = document.getElementById("postContent");
const getCommentsButton = document.getElementById("getCommentsButton");
const commentsContainer = document.getElementById("commentsContainer");
const commentsList = document.getElementById("commentsList");
const postSearchForm = document.getElementById("postSearchForm");

function fetchPostById(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error("Пост не знайдено");
      }
      return response.json();
    }
  );
}

function displayPost(post) {
  postContent.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            `;
  postContainer.style.display = "block";
}

function fetchCommentsByPostId(postId) {
  return fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Коментарі не знайдено");
    }
    return response.json();
  });
}

function displayComments(comments) {
  commentsList.innerHTML = "";
  comments.forEach((comment) => {
    const li = document.createElement("li");
    li.textContent = comment.body;
    commentsList.appendChild(li);
  });
  commentsContainer.style.display = "block";
}

postSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const postId = postIdInput.value;
  if (!postId || postId < 1 || postId > 100) {
    alert("Введіть коректне значення ID поста (1-100).");
    return;
  }

  commentsList.innerHTML = "";

  commentsContainer.style.display = "none";

  fetchPostById(postId)
    .then((post) => {
      displayPost(post);
      return postId;
    })
    .catch((error) => {
      console.error(error.message);
      alert("Пост не знайдено");
    });
});

getCommentsButton.addEventListener("click", () => {
  const postId = postIdInput.value;
  if (!postId) return;

  fetchCommentsByPostId(postId)
    .then((comments) => {
      displayComments(comments);
    })
    .catch((error) => {
      console.error(error.message);
      alert("Коментарі не знайдено");
    });
});
