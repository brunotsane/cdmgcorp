
document.getElementById('btn-click').addEventListener('click', function(event) {
   
    console.log("OK");
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let subject = document.getElementById('subject');
    let phone = document.getElementById('phone_number');
    let message = document.getElementById('message');
    
    // You can add logic here to send this data to the server or process it further
    sendEmailToServer(name.value.trim(),email.value.trim(),phone.value.trim(),subject.value.trim(), message.value.trim());
});

function sendEmailToServer(name,email,phone,subject, message) {

    const data = {
        name: name,
        email:email,
        phone:phone,
        message: message,
        subject:subject,
    }
    fetch('/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Error:', error);
        // Optionally display an error message in the chatbox
        //displayMessage('Error getting response', false);
        //hideTypingIndicator();
    });
    fetch('/recieve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Error:', error);
        // Optionally display an error message in the chatbox
        //displayMessage('Error getting response', false);
        //hideTypingIndicator();
    });
}