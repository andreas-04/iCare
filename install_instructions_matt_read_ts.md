Clone the Repo
    git clone https://github.com/andreas-04/iCare

start a virtual enviorment
    python3 -m venv venv

install dependencies  
    pip install django
    pip install djangorestframework
    pip install django-cors-headers

start the backend
    cd backend
    python3 manage.py runserver

go to  `http://127.0.0.1:8000/admin` in browser
login with 
    user: admin
    pass: password123