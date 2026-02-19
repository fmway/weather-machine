import '../css/About.css';

export default function About() {
  return (
    <div className="about-container">
      <h2>About Weather App</h2>
      <div className="about-content">
        <p>This weather application was developed by Kenarson.</p>
        <h3>Technologies Used:</h3>
        <ul>
          <li>React with TypeScript</li>
          <li>CSS for styling</li>
          <li>Weather API integration</li>
        </ul>
      </div>
    </div>
  );
}
