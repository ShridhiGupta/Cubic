# Cubic

Cubic is an interactive web application designed to help users learn, practice, and solve a Rubik's Cube. Users can input the colors of their cube, visualize its current state, and receive step-by-step instructions to solve it efficiently.

Built with modern web technologies, Cubic combines an intuitive user interface with solving algorithms to provide both educational and practical value for beginners and enthusiasts alike.

---

## Features

* Interactive Rubik's Cube visualization
* Custom cube color input
* Step-by-step cube solving guidance
* Practice mode for learning solving techniques
* Real-time cube state representation
* Beginner-friendly learning experience
* Responsive and modern user interface

---

## Tech Stack

### Frontend

* Next.js
* TypeScript
* React.js
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB

---

## How It Works

1. Enter the colors of your Rubik's Cube using the interactive cube interface.
2. The application validates the cube state.
3. The solving algorithm analyzes the cube configuration.
4. Step-by-step instructions are generated.
5. Follow the guided solution to complete the cube.
6. Use Practice Mode to improve your solving skills and understanding of cube-solving concepts.

---

## Project Structure

```text
Cubic
├── public/
├── src/
├── .env.example
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/ShridhiGupta/Cubic.git
cd Cubic
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file and add the required environment variables.

```env
MONGODB_URI=your_mongodb_connection_string
```

### Start the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

---

## Future Enhancements

* 3D Rubik's Cube visualization
* Multiple solving methods
* User authentication
* Progress tracking
* Cube-solving tutorials
* Competitive solving timer
* Leaderboards and achievements

---

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License.

---

## Authors

Developed by Shridhi Gupta.

---

Built to make learning and solving the Rubik's Cube more interactive, accessible, and enjoyable.
