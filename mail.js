const form = document.querySelector("form");
const status = document.querySelector("form textarea");

emailjs.init({
  publicKey: "oC5bWpr3B_i5vT1PS"
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();


  try {
    await emailjs.sendForm(
      "service_5ppu8ud",
      "template_jcx6sha",
      form
    );

    form.reset();
  } catch (error) {
    console.error("Erreur EmailJS :", error);
    form.reset();
  }
});