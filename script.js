
function addComment() {
  const input = document.getElementById("commentInput");
  const comment = input.value.trim();
  if (comment) {
    const list = document.getElementById("comments-list");
    const li = document.createElement("li");
    li.textContent = comment;
    list.appendChild(li);
    input.value = "";
  }
}
