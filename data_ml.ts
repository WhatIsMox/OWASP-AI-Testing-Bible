
import { OwaspTop10Entry } from './types';

export const OWASP_ML_TOP_10_DATA: OwaspTop10Entry[] = [
    {
      id: "ML01:2023",
      title: "Input Manipulation Attack",
      description: "Input Manipulation Attacks are an umbrella term which include Adversarial Attacks, a type of attack in which an attacker deliberately alters input data to mislead the model.",
      commonRisks: [
        "Misclassification of images or data leading to security bypass.",
        "Evasion of intrusion detection systems via traffic manipulation.",
        "Integrity compromise of model predictions."
      ],
      preventionStrategies: [
        "Adversarial Training: Train the model on adversarial examples to improve robustness.",
        "Robust Models: Use architectures designed to resist manipulative attacks.",
        "Input Validation: Detect anomalies in input data (unexpected values, patterns) and reject malicious inputs."
      ],
      attackScenarios: [
        { title: "Image Classification Evasion", description: "Attacker adds imperceptible perturbations to an image of a cat, causing the model to misclassify it as a dog." },
        { title: "IDS Evasion", description: "Attacker crafts network packets to hide source IPs or payload signatures, evading an ML-based intrusion detection system." }
      ],
      references: []
    },
    {
      id: "ML02:2023",
      title: "Data Poisoning Attack",
      description: "Data poisoning attacks occur when an attacker manipulates the training data to cause the model to behave in an undesirable way.",
      commonRisks: [
        "Incorrect predictions based on poisoned data.",
        "False decisions leading to serious consequences.",
        "Model integrity compromise."
      ],
      preventionStrategies: [
        "Data Validation: Verify training data sources and labeling accuracy (use multiple labelers).",
        "Secure Storage: Encrypt training data and use access controls.",
        "Data Separation: Isolate training data from production environments.",
        "Model Ensembles: Use multiple models trained on subsets of data.",
        "Anomaly Detection: Detect abnormal behavior or distribution shifts in training data."
      ],
      attackScenarios: [
        { title: "Spam Classifier Poisoning", description: "Attacker injects maliciously labeled spam emails into the training set, causing the model to classify spam as legitimate." },
        { title: "Network Traffic Poisoning", description: "Attacker introduces incorrectly labeled network traffic data, causing the model to misclassify malicious traffic." }
      ],
      references: []
    },
    {
      id: "ML03:2023",
      title: "Model Inversion Attack",
      description: "Model inversion attacks occur when an attacker reverse-engineers the model to extract sensitive information from it.",
      commonRisks: [
        "Confidentiality breach of input data.",
        "Reconstruction of sensitive training examples (e.g., faces, medical records).",
        "Inference of sensitive attributes."
      ],
      preventionStrategies: [
        "Access Control: Limit access to model predictions and use authentication.",
        "Input Validation: Check inputs for consistency and range.",
        "Model Transparency: Log inputs/outputs to detect probing.",
        "Regular Monitoring: Track prediction distribution for anomalies.",
        "Model Retraining: Update models to prevent leaked information from remaining valid."
      ],
      attackScenarios: [
        { title: "Face Recognition Reversal", description: "Attacker recovers personal images (faces) from a model's predictions." },
        { title: "Bot Detection Bypass", description: "Advertiser inverts a bot detection model to make bots appear human." }
      ],
      references: []
    },
    {
      id: "ML04:2023",
      title: "Membership Inference Attack",
      description: "Membership inference attacks occur when an attacker manipulates the model's training data or queries the model to determine whether a specific record was included in the training set.",
      commonRisks: [
        "Loss of privacy for individuals in the training set.",
        "Regulatory compliance violations (GDPR, HIPAA).",
        "Reputational damage."
      ],
      preventionStrategies: [
        "Randomized Training Data: Train on shuffled/randomized subsets.",
        "Model Obfuscation: Add noise to predictions (Differential Privacy).",
        "Regularization: Use L1/L2 regularization to prevent overfitting (which aids inference).",
        "Reduce Training Data: Remove redundant features.",
        "Monitoring: Detect patterns indicative of membership probing."
      ],
      attackScenarios: [
        { title: "Financial Data Inference", description: "Attacker determines if a specific individual's financial record was used to train a credit scoring model, inferring sensitive financial history." }
      ],
      references: []
    },
    {
      id: "ML05:2023",
      title: "Model Theft",
      description: "Model theft attacks occur when an attacker gains unauthorized access to the model's parameters or functionality, often creating a functional copy.",
      commonRisks: [
        "Intellectual Property (IP) loss.",
        "Financial loss and competitive disadvantage.",
        "Reputation damage."
      ],
      preventionStrategies: [
        "Encryption: Encrypt model code and weights.",
        "Access Control: Strict authentication for model access.",
        "Watermarking: Embed watermarks in the model to trace theft.",
        "Legal Protection: Patents and trade secrets.",
        "Model Obfuscation: Make code difficult to reverse engineer."
      ],
      attackScenarios: [
        { title: "Competitor Theft", description: "Attacker reverse-engineers a competitor's valuable ML model via API probing or binary disassembly to use for their own profit." }
      ],
      references: []
    },
    {
      id: "ML06:2023",
      title: "AI Supply Chain Attacks",
      description: "AI Supply Chain Attacks occur when an attacker modifies or replaces a machine learning library, model, or data source used by a system.",
      commonRisks: [
        "Compromise of the ML project.",
        "Execution of malicious code via dependencies.",
        "Data exfiltration or model corruption."
      ],
      preventionStrategies: [
        "Verify Signatures: Check digital signatures of packages.",
        "Secure Repositories: Use vetted package sources (e.g., Anaconda).",
        "Virtual Environments: Isolate project dependencies.",
        "Code Reviews: Audit packages and libraries.",
        "SBOM: Maintain a Software Bill of Materials."
      ],
      attackScenarios: [
        { title: "Package Compromise", description: "Attacker modifies a popular ML library (e.g., NumPy, Scikit-learn) in a public repo. When the victim installs it, malicious code steals sensitive info." }
      ],
      references: []
    },
    {
      id: "ML07:2023",
      title: "Transfer Learning Attack",
      description: "Transfer learning attacks occur when an attacker trains a model on one task (e.g., with a poisoned dataset) and then fine-tunes it on another task to cause it to behave undesirably in the target environment.",
      commonRisks: [
        "Misleading results in the target model.",
        "Backdoors transferred from pre-trained models.",
        "Confidentiality breaches."
      ],
      preventionStrategies: [
        "Monitor Training Datasets: Regular checks on data integrity.",
        "Secure/Trusted Datasets: Only use verified sources.",
        "Model Isolation: Separate training and deployment environments.",
        "Differential Privacy: Protect individual records.",
        "Security Audits: Identify vulnerabilities in pre-trained models."
      ],
      attackScenarios: [
        { title: "Face Recognition Backdoor", description: "Attacker trains a model on a malicious dataset with manipulated faces, then transfers it to a security firm. The attacker can then bypass the system using the manipulated face." }
      ],
      references: []
    },
    {
      id: "ML08:2023",
      title: "Model Skewing",
      description: "Model skewing attacks occur when an attacker manipulates the distribution of the training data (often via feedback loops) to cause the model to behave in an undesirable way.",
      commonRisks: [
        "Incorrect decisions (financial loss, reputational damage).",
        "Bias introduction.",
        "Inability to reflect underlying data distribution."
      ],
      preventionStrategies: [
        "Robust Access Controls: Limit access to MLOps feedback loops.",
        "Verify Feedback Data: Use digital signatures for feedback authenticity.",
        "Data Validation/Cleaning: Clean feedback data before updating training sets.",
        "Anomaly Detection: Detect statistical skew in feedback.",
        "Continuous Monitoring: Compare predictions with actual outcomes."
      ],
      attackScenarios: [
        { title: "Financial Gain via Skewing", description: "Attacker provides fake feedback to a loan approval model indicating high-risk applicants are safe, skewing predictions to approve their own high-risk loans." }
      ],
      references: []
    },
    {
      id: "ML09:2023",
      title: "Output Integrity Attack",
      description: "In an Output Integrity Attack scenario, an attacker aims to modify or manipulate the output of a machine learning model (after generation) to change its behavior or cause harm.",
      commonRisks: [
        "Loss of confidence in predictions.",
        "Financial/Security risks if output is used for critical decisions.",
        "Reputational damage."
      ],
      preventionStrategies: [
        "Cryptographic Methods: Digital signatures/hashes for results.",
        "Secure Communication: SSL/TLS for model-interface comms.",
        "Input/Output Validation: Check for manipulated values.",
        "Tamper-Evident Logs: Log all interactions.",
        "Regular Updates: Patch software vulnerabilities."
      ],
      attackScenarios: [
        { title: "Medical Record Modification", description: "Attacker intercepts and modifies the diagnosis output of a medical ML model, leading to incorrect patient treatment." }
      ],
      references: []
    },
    {
      id: "ML10:2023",
      title: "Model Poisoning",
      description: "Model poisoning attacks occur when an attacker manipulates the model's parameters (weights/biases) directly to cause it to behave in an undesirable way. (Distinct from Data Poisoning which targets the dataset).",
      commonRisks: [
        "Manipulated predictions to achieve attacker goals.",
        "Extraction of confidential info.",
        "Negative impact on credibility."
      ],
      preventionStrategies: [
        "Regularisation: Use L1/L2 regularization to prevent overfitting.",
        "Robust Model Design: Architectures resistant to parameter manipulation.",
        "Cryptographic Techniques: Secure parameters/weights to prevent unauthorized access."
      ],
      attackScenarios: [
        { title: "Cheque Processing Manipulation", description: "Attacker directly modifies parameters of a bank's character recognition model so that a '5' is read as a '2', enabling financial fraud." }
      ],
      references: []
    }
];
