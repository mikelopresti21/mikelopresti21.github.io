(function() {
    emailjs.init({
      publicKey: "7quWyFPwYqIAfqf9I",
    });
})();

window.onload = function() {
    document.querySelector(".contact__form").addEventListener('submit', function(event) {
        event.preventDefault();
        emailjs.sendForm('contact_service', 'contact_form', this)
            .then(() => {
                console.log('SUCCESS!');
            }, (error) => {
                console.log('FAILED...', error);
            });
    });
}