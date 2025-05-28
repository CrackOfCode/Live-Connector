async function changeUsername() {
  const username = document.getElementById('username').value;
  const status = document.getElementById('status');

  if (!username) {
    status.textContent = 'Please enter a username.';
    return;
  }

  try {
    const res = await fetch('/api/set-username', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    });
    const data = await res.json();
    status.textContent = data.message || data.error;
    loadUsernames();
  } catch (err) {
    status.textContent = 'Error updating username.';
  }
}

async function loadUsernames() {
  const list = document.getElementById('usernames');
  list.innerHTML = '';
  try {
    const res = await fetch('/api/usernames');
    const data = await res.json();
    data.usernames.forEach(u => {
      const li = document.createElement('li');
      li.textContent = u;
      list.appendChild(li);
    });
  } catch (err) {
    list.innerHTML = '<li>Failed to load usernames.</li>';
  }
}

async function loadChat() {
  const chatbox = document.getElementById('chatbox');
  try {
    const res = await fetch('/api/chat');
    const data = await res.json();
    chatbox.innerHTML = '';
    data.chat.forEach(msg => {
      const p = document.createElement('p');
      p.textContent = msg;
      chatbox.appendChild(p);
    });
    chatbox.scrollTop = chatbox.scrollHeight;
  } catch {
    chatbox.innerHTML = '<p>Unable to load chat feed.</p>';
  }
}

setInterval(loadChat, 3000);
loadUsernames();
