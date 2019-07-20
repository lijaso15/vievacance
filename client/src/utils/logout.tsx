import axios from "axios";

function logout(done) {
  if (done) {
    window.location.reload();
    return;
  } else {
    axios
      .get("/users/logout", { withCredentials: true })
      .then(res => {
        logout(res.data);
      })
      .catch(err => alert(err));
  }
}

export default logout;
