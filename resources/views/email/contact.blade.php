
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      padding: 20px;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    p {
      margin-bottom: 10px;
    }

    .highlight {
      font-weight: bold;
      color: #555555;
    }
  </style>

  <div class="container">
    <p><span class="highlight">Name: </span>{{ $contact->name }}</p>
    <p><span class="highlight">Email: </span>{{ $contact->email }}</p>
    <p><span class="highlight">Message: </span>{{ $contact->body }}</p>
  </div>


