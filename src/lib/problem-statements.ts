export const THEME_DETAILS = {
  "ai-automation": {
    title: "AI, Automation, Robotics & Drone Technology",
    problems: [
      {
        id: "PS-1.1",
        title: "City-Scale AI-Driven Urban Risk Intelligence System",
        statement: "Modern urban environments face compound and cascading risks such as flooding, heatwaves, and air pollution due to climate change, rapid urbanization, and aging infrastructure. Participants are required to design an AI-driven early warning and decision-support system that integrates real-time IoT data, satellite imagery, historical climate data, and urban infrastructure information.",
        objectives: ["Predict and monitor urban flooding, heatwaves, and air pollution events", "Fuse heterogeneous real-time and historical data sources", "Provide explainable insights for policymakers", "Support scenario-based policy simulations"],
        deliverables: ["AI/ML models for risk prediction", "Interactive decision-support dashboard", "Explainability and uncertainty visualization", "System architecture and technical documentation"]
      },
      {
        id: "PS-1.2",
        title: "Explainable Multi-Modal AI Framework for Medical Diagnosis",
        statement: "Healthcare AI solutions often fail in resource-constrained hospitals due to data silos, lack of interpretability, and fairness concerns. There is a need for a clinically reliable and explainable AI system that can integrate diverse medical data while adhering to ethical and regulatory requirements.",
        objectives: ["Enable accurate multi-modal medical diagnosis", "Ensure model explainability and trust", "Detect and mitigate demographic bias", "Enable deployment in low-resource settings"],
        deliverables: ["Multi-modal AI diagnostic model", "Explainability module (visual/textual)", "Bias and fairness evaluation report", "Deployment feasibility analysis", "Demonstration prototype"]
      },
      {
        id: "PS-1.3",
        title: "Multi-Agent Reinforcement Learning for Traffic Intelligence",
        statement: "Urban traffic systems are dynamic, adversarial, and multi-agent. Traditional traffic signal control systems fail to adapt to real-time changes, leading to congestion and delayed emergency response. Participants must develop a multi-agent reinforcement learning (MARL) system to optimize traffic signals, predict accidents, and prioritize emergency vehicles.",
        objectives: ["Optimize traffic signal timings dynamically", "Predict accident-prone scenarios", "Enable emergency vehicle prioritization", "Balance local and global traffic objectives"],
        deliverables: ["MARL-based traffic control model", "Simulation results and performance metrics", "Emergency handling logic", "Visualization dashboard", "Technical documentation"]
      },
      {
        id: "PS-1.4",
        title: "Cross-Platform Misinformation Intelligence System",
        statement: "Misinformation spreads rapidly across platforms using text, images, videos, and coordinated networks. Manual moderation is insufficient to detect such campaigns. Participants must develop a cross-platform misinformation detection system capable of identifying fake news, deepfakes, and coordinated disinformation campaigns.",
        objectives: ["Detect fake news and manipulated media", "Identify coordinated disinformation networks", "Track content provenance", "Support explainable moderation decisions"],
        deliverables: ["NLP and vision-language detection models", "Network analysis and visualization", "Provenance tracking module", "Explainability report", "Functional demo"]
      },
      {
        id: "PS-1.5",
        title: "Autonomous Infrastructure Monitoring via Drones",
        statement: "Manual inspection of infrastructure is costly, slow, and unsafe. Cities require autonomous drone-based inspection systems for early detection of structural anomalies. Participants must design an autonomous drone system for real-time infrastructure monitoring, anomaly detection, and reporting.",
        objectives: ["Perform automated visual inspection", "Detect cracks, corrosion, and deformation", "Predict maintenance needs", "Reduce inspection time and risk"],
        deliverables: ["Drone-based vision model", "Structural anomaly detection pipeline", "Predictive maintenance analytics", "Inspection report generation system"]
      }
    ]
  },
  "cybersecurity-blockchain": {
    title: "Cyber Security & Blockchain",
    problems: [
      {
        id: "PS-2.1",
        title: "Advanced AI-Based Phishing and Social Engineering Detection",
        statement: "Phishing and social engineering attacks have evolved beyond simple spam emails to highly targeted, context-aware attacks exploiting human psychology. Design and develop an AI-powered, multi-modal phishing detection platform capable of analyzing email content, sender metadata, and user behavior patterns.",
        objectives: ["NLP-based intent detection (urgency, fear, authority cues)", "URL lexical analysis and reputation scoring", "Sender behavior profiling", "Explainable AI to justify detection decisions", "Integration as a browser plugin"],
        deliverables: ["Functional prototype (plugin + backend)", "Detection accuracy evaluation", "Explainability reports", "Technical documentation and demo video"]
      },
      {
        id: "PS-2.2",
        title: "Zero-Trust IoT Security Framework",
        statement: "IoT ecosystems are highly vulnerable due to weak authentication and insecure communication. Design a Zero-Trust IoT security framework ensuring authenticated, encrypted, and continuously verified communication among devices and backend systems.",
        objectives: ["Mutual authentication", "Device identity lifecycle management", "Lightweight cryptographic protocols (ECC, DTLS)", "Secure firmware updates", "Attack simulation and detection"],
        deliverables: ["Secure IoT prototype", "Attack simulation results", "Documentation and demo"]
      },
      {
        id: "PS-2.3",
        title: "Blockchain-Based Self-Sovereign Digital Identity System",
        statement: "Centralized identity systems expose users to privacy risks and identity theft. Build a blockchain-backed SSI platform that enables users to create, manage, and verify digital identities using decentralized identifiers and verifiable credentials.",
        objectives: ["Decentralized Identifiers (DIDs)", "Zero-Knowledge Proof concepts", "Selective disclosure mechanisms", "Identity revocation and recovery", "Smart contract-based verification"],
        deliverables: ["SSI wallet and verifier portal", "Smart contract verification logic", "Secure, passwordless authentication"]
      },
      {
        id: "PS-2.4",
        title: "Real-Time Credit Card Fraud Detection with Explainable AI",
        statement: "Financial fraud detection systems must balance accuracy, latency, and transparency. Develop a real-time fraud detection system capable of processing streaming transaction data while providing explainable decisions.",
        objectives: ["Streaming data processing", "Ensemble ML models", "Concept drift detection", "User behavior profiling", "Explainable AI integration"],
        deliverables: ["Fraud detection prototype", "Evaluation report", "Demo and documentation"]
      },
      {
        id: "PS-2.5",
        title: "AI-Driven Automated Incident Response and SOAR Platform",
        statement: "Manual incident response is slow and error-prone. Develop an AI-assisted Security Orchestration, Automation, and Response (SOAR) system that automatically generates, executes, and improves incident response workflows.",
        objectives: ["NLP-based incident classification", "Dynamic playbook generation", "Integration with security tools", "Continuous post-incident learning", "Compliance-aligned reporting"],
        deliverables: ["SOAR platform prototype", "Incident simulation results", "Documentation and demo"]
      }
    ]
  },
  "iot-embedded": {
    title: "IoT, VLSI & Embedded Systems",
    problems: [
      {
        id: "PS-3.1",
        title: "Edge-AI Wearable Health Monitoring Ecosystem",
        statement: "Continuous physiological monitoring generates sensitive data. Design an Edge-AI enabled wearable health ecosystem capable of real-time anomaly detection with privacy-preserving federated learning.",
        objectives: ["Perform real-time health anomaly detection", "Enable privacy-preserving learning", "Minimize false alarms", "Support automated emergency alerts"],
        deliverables: ["Edge-AI anomaly detection model", "Federated learning framework", "Emergency alert workflow", "System architecture documentation", "Demo prototype"]
      },
      {
        id: "PS-3.2",
        title: "AI-Assisted Rural Telemedicine Platform",
        statement: "Rural healthcare faces doctor shortages and connectivity issues. Develop an AI-assisted telemedicine platform combining voice-based decision support, low-bandwidth imaging, and vernacular language processing.",
        objectives: ["Enable AI-assisted clinical decision support", "Support local languages and voice interaction", "Operate in low-connectivity environments", "Improve healthcare accessibility"],
        deliverables: ["Voice-based clinical AI module", "Vernacular NLP system", "Offline-first system design", "Usability evaluation", "Prototype demo"]
      },
      {
        id: "PS-3.3",
        title: "AI-Calibrated Biosensor for Lifestyle Diseases",
        statement: "Early detection of lifestyle diseases requires low-cost, accurate sensors. Design a biosensor system calibrated using AI and signal processing, integrated with mobile health platforms.",
        objectives: ["Improve accuracy of low-cost biosensors", "Detect early disease indicators", "Enable mobile health integration", "Ensure affordability and usability"],
        deliverables: ["Signal processing and AI calibration model", "Mobile health integration", "Accuracy and drift analysis", "Prototype or simulation", "Technical documentation"]
      },
      {
        id: "PS-3.4",
        title: "AI-Optimized Electric Vehicle Charging Infrastructure",
        statement: "EV adoption strains power grids. Develop an AI-optimized EV charging infrastructure that enables smart charging scheduling, dynamic pricing, grid-aware load balancing, and V2G integration.",
        objectives: ["Grid load and transformer capacity constraints", "Uncertain and heterogeneous user charging behavior", "Coordination between EVs and grid operators", "Real-time pricing and demand-response mechanisms"],
        deliverables: ["EV charging optimization prototype", "Simulation results", "Grid and user dashboards", "Technical and deployment documentation"]
      },
      {
        id: "PS-3.5",
        title: "AI-Driven IoT-Based Smart Energy Management System",
        statement: "Develop an AI-optimized smart energy system to monitor real-time building energy consumption, predict peak usage, and automate energy-saving actions.",
        objectives: ["Monitor real-time building energy consumption", "Predict peak energy usage using AI/ML", "Automate energy-saving actions", "Reduce energy costs and wastage"],
        deliverables: ["AI-based energy prediction models", "IoT-enabled monitoring system", "Automated energy optimization strategies", "Interactive dashboard and documentation"]
      }
    ]
  },
  "sustainability": {
    title: "Sustainability & Environment",
    problems: [
      {
        id: "PS-4.1",
        title: "Intelligent AI-Powered Rural Microgrid System",
        statement: "Design and develop an AI-powered rural microgrid management system that intelligently optimizes hybrid energy sources, predicts rural energy demand, and ensures reliable, affordable, and sustainable electricity access.",
        objectives: ["Optimize utilization of multiple renewable sources", "Forecast rural energy demand", "Improve reliability and reduce outages", "Ensure affordability and energy equity", "Support scalable deployment"],
        deliverables: ["AI-based energy demand forecasting module", "Hybrid microgrid optimization logic", "Simulation or prototype", "Reliability impact analysis", "Technical documentation"]
      },
      {
        id: "PS-4.2",
        title: "Enterprise-Scale Carbon Footprint Intelligence Platform",
        statement: "Design a scalable carbon footprint intelligence platform that enables real-time emissions tracking, lifecycle assessment, ESG analytics, and regulatory compliance reporting across enterprise operations.",
        objectives: ["Enable real-time carbon emission monitoring", "Perform lifecycle-based emission assessments", "Support ESG reporting and compliance", "Provide actionable sustainability insights", "Scale across supply chains"],
        deliverables: ["Carbon analytics engine", "ESG dashboards", "Lifecycle assessment module", "Decision-support insights", "Platform prototype"]
      },
      {
        id: "PS-4.3",
        title: "Autonomous AI-Robotic Waste Management System",
        statement: "Design an autonomous AI-robotic waste management system capable of real-time waste classification, automated sorting, and optimization of recycling and disposal decisions while quantifying environmental impact.",
        objectives: ["Develop AI models for waste classification", "Automate segregation using robotics", "Optimize recycling vs landfill decisions", "Quantify carbon footprint reduction", "Improve urban waste handling efficiency"],
        deliverables: ["AI-based waste classification model", "Robotic sorting simulation", "Recycling optimization logic", "Carbon impact analytics dashboard", "System architecture"]
      },
      {
        id: "PS-4.4",
        title: "AI-Based Renewable Energy Forecasting and Grid Optimization",
        statement: "Design an AI-driven renewable energy forecasting system that integrates weather data, renewable generation data, and energy storage info to improve grid stability and minimize carbon emissions.",
        objectives: ["Handle stochastic weather patterns", "Manage grid stability constraints", "Optimize energy storage", "Carbon-aware decision-making", "Scalability across grid levels"],
        deliverables: ["Forecasting and optimization prototype", "Simulation results", "Carbon reduction analysis", "Technical documentation"]
      },
      {
        id: "PS-4.5",
        title: "AI-Driven Waste-to-Energy Optimization System",
        statement: "Design an AI-driven waste-to-energy system that characterizes biomass feedstock, optimizes conversion processes, and maximizes energy output while minimizing environmental impact.",
        objectives: ["Manage variability in waste composition", "Reduce process inefficiencies", "Accurate prediction of energy yield", "Integration with circular economy objectives"],
        deliverables: ["Functional prototype or simulation", "Biomass classification results", "Energy efficiency report", "Documentation and demo video"]
      }
    ]
  },
  "open-innovation": {
    title: "Open Innovation",
    problems: [
      {
        id: "OPEN-1",
        title: "Open Innovation Challenge",
        statement: "Teams must clearly define a real-world problem they aim to solve. The problem can belong to any industry or sector which hasn't been mentioned already.",
        objectives: ["Define a clear problem statement", "Demonstrate relevance and urgency", "Show potential future impact"],
        deliverables: ["Problem Definition", "Proposed Solution Prototype", "Impact Analysis"]
      }
    ]
  }
};
