function checkPhishing() {
    var url = document.getElementById('urlInput').value.trim();

    // Validate if input is a valid URL
    if (!isValidUrl(url)) {
        displayResult("Invalid URL. Please enter a valid web address.", "red");
        return;
    }

    var score = 100; // Start with 100% score for a safe website

    // Suspicious keywords
    var suspiciousKeywords = ["login", "free", "verify", "account", "update"];

    // Check if the input URL matches any in the phishing list
    if (phishingList.some(phishingUrl => url.includes(phishingUrl))) {
        score -= 50; // High penalty for known phishing domains
    }

    // Check if URL uses 'http://' instead of 'https://'
    if (url.startsWith("http://")) {
        score -= 20; // Medium penalty for not using HTTPS
    }

    // Check for suspicious keywords
    suspiciousKeywords.forEach(keyword => {
        if (url.includes(keyword)) {
            score -= 5; // Low penalty per suspicious keyword
        }
    });

    // Check if URL uses IP address instead of domain
    var ipPattern = /^http:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
    if (ipPattern.test(url)) {
        score -= 20; // Medium penalty for IP addresses
    }

    // Ensure score is within 0-100 range
    if (score < 0) score = 0;

    // Determine result message and color
    let resultMessage;
    if (score <= 50) {
        resultMessage = `<span style='color: red;'>Warning: This link is very likely to be dangerous! (Score: ${score}%)</span>`;
    } else if (score <= 80) {
        resultMessage = `<span style='color: orange;'>Caution: This link may be suspicious. (Score: ${score}%)</span>`;
    } else {
        resultMessage = `<span style='color: green;'>This link appears safe. (Score: ${score}%)</span>`;
    }

    displayResult(resultMessage);
}

// Function to check if the input is a valid URL
function isValidUrl(url) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // Protocol
        '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // Domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
        '(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*' + // Port and path
        '(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?' + // Query string
        '(\\#[-a-zA-Z\\d_]*)?$', 'i'); // Fragment locator
    return !!pattern.test(url);
}

// Function to display the result in a modal
function displayResult(message, color) {
    var modalResult = document.getElementById('modalResult');
    modalResult.innerHTML = message;
    modalResult.style.color = color || ''; // Default to specified color or inherit

    openModal(); // Open the modal
}

// Function to open the modal
function openModal() {
    var modal = document.getElementById('resultModal');
    modal.style.display = 'block'; // Show modal
}

// Function to close the modal
function closeModal() {
    var modal = document.getElementById('resultModal');
    modal.style.display = 'none'; // Hide modal
}
