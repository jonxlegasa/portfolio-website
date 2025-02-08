// @ts-nocheck

// utils/email_service.js

import emailjs from "@emailjs/browser";

export async function sendEmail(publicEmailJSKey, serviceID, templateID, formData) {
  emailjs.init(publicEmailJSKey);

  const templateParams = {
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
    message: formData.message
  };

  return emailjs.send(serviceID, templateID, templateParams)
    .then(response => {
      console.log('SUCCESS!', response.status, response.text);
    })
    .catch(error => {
      console.error('FAILED...', error);
    });
}
