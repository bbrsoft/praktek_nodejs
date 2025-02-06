# API Documentation

This is the documentation for the API endpoints.

## 1. Membership

### POST `/registration`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "your_password",
    "name": "Your Name"
  }

    Response:
        201 Created: Successful registration.
        400 Bad Request: Invalid input.

POST /login

    Description: Login a user.
    Request Body:

    {
      "email": "user@example.com",
      "password": "your_password"
    }

    Response:
        200 OK: Successful login, returns token.
        401 Unauthorized: Invalid credentials.

GET /profile

    Description: Get user profile details.
    Headers: Authorization: Bearer <JWT>
    Response:
        200 OK: Returns user profile data.
        401 Unauthorized: No valid token provided.

PUT /profile/update

    Description: Update user profile details.
    Headers: Authorization: Bearer <JWT>
    Request Body:

    {
      "name": "New Name",
      "email": "newemail@example.com"
    }

    Response:
        200 OK: Successfully updated profile.
        400 Bad Request: Invalid input.

PUT /profile/image

    Description: Update user profile image.
    Headers: Authorization: Bearer <JWT>
    Request Body: Multipart/form-data (image file)
    Response:
        200 OK: Successfully updated profile image.
        400 Bad Request: Invalid file format.

3. Information
GET /banner

    Description: Get banner details.
    Response:
        200 OK: Returns banner details.
        404 Not Found: Banner not found.

GET /services

    Description: Get available services.
    Response:
        200 OK: Returns a list of available services.

5. Transaction
GET /balance

    Description: Get user balance.
    Headers: Authorization: Bearer <JWT>
    Response:
        200 OK: Returns user balance.
        401 Unauthorized: No valid token provided.

POST /topup

    Description: Top up user balance.
    Headers: Authorization: Bearer <JWT>
    Request Body:

    {
      "amount": 100
    }

    Response:
        200 OK: Successfully topped up balance.
        400 Bad Request: Invalid amount.

POST /transaction

    Description: Process a transaction for available services.
    Headers: Authorization: Bearer <JWT>
    Request Body:

    {
      "service_id": 1,
      "amount": 50
    }

    Response:
        200 OK: Transaction processed successfully.
        400 Bad Request: Invalid data.

GET /transaction/history

    Description: Get user transaction history.
    Headers: Authorization: Bearer <JWT>
    Response:
        200 OK: Returns transaction history.
        401 Unauthorized: No valid token provided.

This is a basic API documentation structure that you can enhance further based on your application's functionality and needs. Each endpoint provides a clear description, request/response formats, and status codes.


### Penjelasan Perbaikan:

1. **Format Markdown**: Sudah diatur dengan menggunakan sintaks Markdown yang jelas dan rapi.
2. **Endpoint Descriptions**: Setiap endpoint dilengkapi dengan deskripsi yang lebih informatif, seperti jenis request, parameter yang diperlukan, dan status kode yang mungkin muncul dalam respons.
3. **Response**: Setiap endpoint menyediakan kemungkinan respons, baik itu sukses atau gagal.
4. **JSON Contoh**: Jika ada permintaan atau respons dalam format JSON, contoh sudah disertak

Database

![Alt text](https://github.com/bbrsoft/praktek_nodejs/blob/main/database%20test_praktek_node_js.png)


![Alt text](https://github.com/bbrsoft/praktek_nodejs/blob/main/tabel%20balance.png)


![Alt text](https://github.com/bbrsoft/praktek_nodejs/blob/main/table%20banners.png)


![Alt text](https://github.com/bbrsoft/praktek_nodejs/blob/main/table%20jwt_token.png)


![Alt text](https://github.com/bbrsoft/praktek_nodejs/blob/main/table%20profiles.png)


![Alt text](https://github.com/bbrsoft/praktek_nodejs/blob/main/table%20services.png)


![Alt text](https://github.com/bbrsoft/praktek_nodejs/blob/main/table%20transaction%20history.png)


![Alt text](https://github.com/bbrsoft/praktek_nodejs/blob/main/table%20transaction.png)


![Alt text](https://github.com/bbrsoft/praktek_nodejs/blob/main/table%20users.png)
