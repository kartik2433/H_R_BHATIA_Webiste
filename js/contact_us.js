var form = document.getElementById("my-form");

const checkNum = (num) => {
  if (num.length > 10 || num.length < 10) {
    return false;
  }
  return true;
};

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  
  if (!checkNum(event.target.number.value)) {
    alert("Please Enter Valid Phone Number");
  }
  else{
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            status.innerHTML =
              "We will Shortly contact you regarding this Query.";
            status.style.color = "green"
            form.reset();
          } else {
            response.json().then((data) => {
              if (Object.hasOwn(data, "errors")) {
                status.innerHTML = data["errors"]
                  .map((error) => error["message"])
                  .join(", ");
              } else {
                status.innerHTML =
                  "Oops! There was a problem submitting your Query";
                status.style.color = "red";
              }
            });
          }
        })
        .catch((error) => {
          status.innerHTML = "Oops! There was a problem submitting your Query";
          status.style.color = "red";
        });
  }
}

form.addEventListener("submit", handleSubmit);
