# iCare 

Home Owner profile
* Mortgages
* insurance
* lawn, size and other details collected with external tool 
* interior, floor plan and rooms recorded
* internet, calculated using external tools using floor plan to determine needs
* phones
* current plans and services
  * cost
  * expiration

Business profile
* services and costs
  
Features
* business and homeowner dashboard to enter above data
* Homeowners can request services
* generate notifications 

## Entities

    Homeowners:
        HomeownerID (Primary Key)
        Name
        Contact Information
        Address
        ...

    Mortgages and Insurances:
        MortgageID (Primary Key)
        HomeownerID (Foreign Key referencing Homeowners)
        Mortgage Details
        Homeowner's Insurance Details
        ...

    Lawn:
        LawnID (Primary Key)
        HomeownerID (Foreign Key referencing Homeowners)
        Lawn Size
        Flower Bed Sizes
        Number of Trees
        Satellite Picture (Link to stored image)
        ...

    Interior:
        InteriorID (Primary Key)
        HomeownerID (Foreign Key referencing Homeowners)
        Floor Plan (Link to stored floor plan)
        Number of Rooms
        Floor Space
        ...

    Internet:
        InternetID (Primary Key)
        HomeownerID (Foreign Key referencing Homeowners)
        Internet Speed Needs
        Source/Link to the calculation
        ...

    Phones:
        PhoneID (Primary Key)
        HomeownerID (Foreign Key referencing Homeowners)
        Number of Cell Phones
        ...

    Service Plans:
        PlanID (Primary Key)
        HomeownerID (Foreign Key referencing Homeowners)
        Type of Service (Mortgage, Home Insurance, Lawn Care, Internet, Phones, etc.)
        Current Plans, Costs, and Services
        Contract Expiry Date
        ...

## Relationships:

    One-to-One relationship between Homeowners and Mortgages/Insurances, Lawn, Interior, Internet, Phones.
    One-to-Many relationship between Homeowners and Service Plans.

## Functionalities:

    Allow homeowners to create and manage their profiles.
    Enable uploading and storing of satellite pictures for lawns and floor plans for interiors.
    Provide functionality to record and update information about mortgages, insurances, lawn details, interior details, internet needs, and phone usage.
    Store current service plans, costs, and contract expiration dates.
    Implement search and comparison functionalities to help homeowners find better services in terms of price and quality.