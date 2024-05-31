const validID = "auth1";
const validPW = "password123";

function login() {
  const id = document.getElementById("id").value;
  const pw = document.getElementById("pw").value;
  const message = document.getElementById("message");

  if (id === validID && pw === validPW) {
    message.textContent = "로그인 되었습니다.";
    message.className = "message success";
  } else {
    message.textContent = "ID 혹은 PW가 잘못되었습니다.";
    message.className = "message error";
  }

  message.style.display = "block";
}
