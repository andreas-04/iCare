# iCare

## Overview

iCare is a web application designed to help homeowners manage various aspects of their homes, including services, budgeting, and property details. This project aims to provide not only a platform for homeowners to efficiently manage their homes and related services but as a place where homeowners can algorithmically find the best matches on services fit for them.

## Features

- **Property Management**: Create property profiles tailored to your specific needs as a homeowner.
- **Service Management**: Search for matches algorithmically selected to match your needs as a homeowner and get notified when a better match is found.
- **Budgeting Tools**: Tools for budgeting and financial planning related to home management.


## Technologies

### Backend

- **Language**: Python
- **Frameworks**: Django, Django Rest, CORS
- **Database**: SQLite

### Frontend

- **Language**: JavaScript (React)
- **Libraries**: Axios, MUI Joy
- **Build Tool**: Vite

## Install Instructions 
  1. Clone the repository 
  2. create a virtual enviorment 
     `python3 -m venv venv`
  3. start the venv
     `source venv/bin/activate`
  4. Install python dependencies 
      `pip install django`
      `pip install django-cors-headers`
      `pip install djangorestframework`
  5. Install JS dependencies
      `npm install react-router-dom`
      `npm install js-cookie`
      `npm install react-cookie`
      `npm install axios`
      `npm install @mui/joy @emotion/react @emotion/styled`
      `npm install @mui/icons-material @mui/material`
  6. Start the backend 
      `python manage.py runserver`
  7. Start the frontend
      `npm run dev`
      navigate to [localhost:5173/](http://localhost:5173/)