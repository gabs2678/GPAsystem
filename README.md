# Untitled

Certainly! Below is a `README.md` for two projects: a Python backend using Django and a React frontend for "GCP Accounting" by Gabriel Del Rio.

---

# GCP Accounting Projects by Gabriel Del Rio

This repository contains two main projects for GCP Accounting:

1. A Python backend developed using Django.
2. A frontend developed using React.

## Table of Contents

- [Getting Started](notion://www.notion.so/BRLLAMA-GPT-1-4e53e796e15c4de696d40e526c1778f6?p=3022f3447d27415b8b9644814d62754d&showMoveTo=true#getting-started)
- [Prerequisites](notion://www.notion.so/BRLLAMA-GPT-1-4e53e796e15c4de696d40e526c1778f6?p=3022f3447d27415b8b9644814d62754d&showMoveTo=true#prerequisites)
- [Installation](notion://www.notion.so/BRLLAMA-GPT-1-4e53e796e15c4de696d40e526c1778f6?p=3022f3447d27415b8b9644814d62754d&showMoveTo=true#installation)
- [Usage](notion://www.notion.so/BRLLAMA-GPT-1-4e53e796e15c4de696d40e526c1778f6?p=3022f3447d27415b8b9644814d62754d&showMoveTo=true#usage)
- [Contributing](notion://www.notion.so/BRLLAMA-GPT-1-4e53e796e15c4de696d40e526c1778f6?p=3022f3447d27415b8b9644814d62754d&showMoveTo=true#contributing)
- [License](notion://www.notion.so/BRLLAMA-GPT-1-4e53e796e15c4de696d40e526c1778f6?p=3022f3447d27415b8b9644814d62754d&showMoveTo=true#license)
- [Contact](notion://www.notion.so/BRLLAMA-GPT-1-4e53e796e15c4de696d40e526c1778f6?p=3022f3447d27415b8b9644814d62754d&showMoveTo=true#contact)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Python 3.x
- Node.js and npm
- Django
- React
- Postgresql

### Installation

1. Clone the repo:
    
    ```
    git clone <https://github.com/GabrielDelRio/GCP-Accounting.git>
    
    ```
    
2. Install Python packages:
    
    ```
    pip install -r requirements.txt
    pipenv shell (used to run the virtual environment )
    ```
    
3. Navigate to the frontend directory and install npm packages:
    
    ```
    cd frontend
    npm install //the react app must be hosted with the ip address
    
    ```
    

## Usage

### Backend

1. Navigate to the backend directory:
    
    ```
    cd backend
    
    ```
    
2. Run the Django server:
    
    ```
    python manage.py runserver
    
    ```
    

### Frontend

1. Navigate to the frontend directory:
    
    ```
    cd frontend
    
    ```
    
2. Start the React app:
    
    ```
    npm start
    
    ```
    

The React app will connect to the Django backend, and you can start using the GCP Accounting application.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Gabriel Del Rio - [gabrieldelrio@email.com](mailto:gabrieldelrio@email.com)

Project Link: [https://github.com/GabrielDelRio/GCP-Accounting](https://github.com/GabrielDelRio/GCP-Accounting)

---

This `README.md` provides a basic structure for the two projects. You can expand on it by adding more details, screenshots, or any other relevant information.

## Known Bugs
- the post request fails from the react frontend  