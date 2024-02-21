# inshare

This is the frontend application for the inshare.online file-sharing platform. It provides a user interface for creating rooms, joining rooms, and interacting within rooms by sending text or files.

## Live Website

The website is live at [inshare.online](https://www.inshare.online/)

## Pages

### 1. Create Room Page

This page allows users to create a room with customizable options. Users can specify the name, password (optional), duration, and maximum number of participants for the room. Once the room is created, users receive a unique room code to share with others.

### 2. Join Room Page

On this page, users can join an existing room by entering the room code and their name. If the room is password-protected, users must provide the password to access the room. Once validated, users are directed to the room interface.

### 3. Room Page

In the room interface, users can send text messages or files within the room. They can interact with other participants by exchanging messages or sharing files. The interface provides a seamless experience for real-time communication and file sharing.

## Prerequisites

Before running the frontend app, ensure you have the following software installed:

- Node.js: Required to run the application.

## Installation

1. Clone this repository:

```bash
git clone https://github.com/aditya-nr/inshare.git
```

2. Navigate to the project directory:

```bash
cd inshare
```

3. Create .env

```bash
cp .env.local.sample .env.local
```

4. Change env variable

- `NEXT_PUBLIC_SERVER_URL` backend server url
- `NEXT_PUBLIC_KEY_ID` aws s3 bucket id
- `NEXT_PUBLIC_KEY` aws s3 bucket key

5. Install dependencies:

```bash
yarn install
```

6. Start the server:

```bash
yarn start
```

## Usage

Once the frontend app is running, you can navigate through the different pages using the navigation menu or links. Follow the instructions on each page to create or join a room and interact with other participants.

## Contributing

Contributions to the frontend app are welcome! If you find any issues or have suggestions for improvements, please submit a pull request or open an issue on the GitHub repository.

## Contact

For any inquiries or support related to the frontend app, you can reach out to the project maintainers:

- [Aditya N Rajan](https://aditya-nr.in)
- [Ankush Kumar](https://ankushkumar.in)
