# TempKit

TempKit is a React-based utility application designed for temperature management and team coordination. It features a multi-tab interface that allows users to toggle between a universal temperature converter and a live team directory showing real-time weather conditions for employees across different global locations.

---

## Core Features

### Temperature Converter

* **Multi-Unit Conversion**: Supports Celsius, Fahrenheit, and Kelvin.
* **Real-time Calculation**: Automatically updates all units as the user types.
* **Formatted Output**: Displays precise results in a dedicated summary view.

### Team Directory

* **Live Weather Integration**: Connects to the OpenWeatherMap API to fetch current conditions for each team member's location.
* **Search Functionality**: Allows filtering of team members by name, role, or specific location.
* **Unit Preferences**: Users can toggle the display units for member temperatures between Celsius, Fahrenheit, and Kelvin.

---

## Technical Stack

* **Framework**: React (TypeScript)
* **Styling**: Tailwind CSS and daisyUI
* **Icons**: Lucide-React
* **API**: OpenWeatherMap (Geocoding and Current Weather)

---

## Getting Started

### Prerequisites

* Node.js (Latest LTS recommended)
* npm or yarn
* An OpenWeatherMap API Key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/JosephM-dvt/Temperature_Converter.git
cd tempkit

```


2. Install dependencies:
```bash
npm install

```


3. Set up environment variables:
Create a .env file in the root directory and add your OpenWeatherMap API key:
```env
VITE_WEATHER_API_KEY=your_api_key_here

```



### Development and Production

To start the development server:

```bash
npm run dev

```

To build the application for production:

```bash
npm run build

```

---

## Project Structure

* **App.tsx**: The main entry point managing tab state and layout.
* **components/**: Contains the functional UI components including TemperatureConverter, TeamDirectory, and TemperatureInput.
* **utils/**: Includes business logic for temperature calculations and weather condition mapping.
* **data/**: Houses the team member JSON data used to populate the directory.

---
**Desktop View: Converter**
![alt text](<Screenshot 2026-03-02 at 17.33.28.png>) 
**Desktop View: TeamDirectory**
![alt text](<Screenshot 2026-03-02 at 17.33.37.png>) 
**MobileView: TeamDirectory**
![alt text](<Screenshot 2026-03-02 at 17.34.12.png>) 
**MobileView: Converter**
![alt text](<Screenshot 2026-03-02 at 17.34.25.png>)