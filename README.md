# OWASP AI Security Bible

An interactive, graphical exploration of the **OWASP AI Testing Guide v1.0**. This tool allows security professionals, developers, and auditors to visualize threats, explore detailed test cases, and deepen their understanding of AI security across Application, Model, Infrastructure, and Data layers.

## ⚠️ Important Architecture Note

This application is a **static educational reference tool**. 

- It does **NOT** use the Gemini API.
- It does **NOT** use the OpenAI API.
- It does **NOT** connect to any external AI services.

All data, test cases, and threat models are derived directly from the static text of the OWASP AI Testing Guide and are embedded locally within the application code. It is designed to help you *perform* tests manually or with your own tools, acting as a knowledge base.

## Features

- **Interactive Architecture Dashboard**: Visualize the AI system pipeline (Application, Model, Infrastructure, Data).
- **Detailed Test Cases**: Access comprehensive guides for 20+ specific AI security tests (e.g., Prompt Injection, Model Poisoning, Membership Inference).
- **Threat Modelling**: Interactive STRIDE and Lifecycle threat modeling specifically tailored for AI systems.
- **Mitigation Strategies**: Actionable remediation advice for each identified threat.

## Getting Started (Local Development)

Since this project uses Vite and React, you must install the dependencies before running the development server.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1.  **Download the source code** to your local machine.
2.  **Install dependencies**:
    Open your terminal in the project folder and run:
    ```bash
    npm install
    ```
    *(This installs React, Vite, and other necessary packages defined in `package.json`)*.

3.  **Run the App**:
    Start the local development server:
    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    The terminal will show a local URL (usually `http://localhost:5173`). Open this link in your web browser.

## Troubleshooting

- **"vite: command not found"**: This means you skipped step 2. Run `npm install` to ensure Vite is installed in your `node_modules` folder.
- **Blank screen**: Check the browser console (F12) for errors. Ensure you are running `npm run dev` and not just opening `index.html` directly from the file explorer.

## Structure

- **Dashboard**: The landing page providing a high-level view of the Secure AI Framework (SAIF) layers.
- **Threat Modelling**: A dedicated section to explore threats using STRIDE or Lifecycle methodologies.
- **Test Pillars**: Detailed breakdown of tests categorized by:
    -   **Application Testing**: Prompt injection, excessive agency, etc.
    -   **Model Testing**: Evasion, poisoning, inversion, etc.
    -   **Infrastructure Testing**: Supply chain, resource exhaustion, etc.
    -   **Data Testing**: Privacy, bias, poisoning, etc.

## License

Based on the OWASP AI Testing Guide v1.0. Content provided for educational and testing purposes.