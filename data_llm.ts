
import { OwaspTop10Entry } from './types';

export const OWASP_TOP_10_DATA: OwaspTop10Entry[] = [
  {
    id: "LLM01:2025",
    title: "Prompt Injection",
    description: "Occurs when user prompts alter the LLM's behavior or output in unintended ways. These inputs can be imperceptible to humans but parsed by the model. Includes Direct Prompt Injection (user input directly alters behavior) and Indirect Prompt Injection (input from external sources like websites or files).",
    commonRisks: [
      "Bypassing safety measures (Jailbreaking).",
      "Disclosure of sensitive information.",
      "Remote Code Execution on backend systems.",
      "Content manipulation leading to biased outputs.",
      "Cross-modal attacks in multimodal models (e.g., hiding instructions in images)."
    ],
    preventionStrategies: [
      "Constrain model behavior: Enforce strict context adherence and limit responses to specific tasks.",
      "Define and validate expected output formats (JSON, specific schemas).",
      "Implement input/output filtering: Use semantic filters and string-checking.",
      "Segregate and identify external content: Clearly denote untrusted content.",
      "Enforce privilege control: Give the LLM its own API token with minimum necessary privileges."
    ],
    attackScenarios: [
      { title: "Direct Injection", description: "Attacker instructs a support chatbot to ignore guidelines and query private data stores." },
      { title: "Indirect Injection", description: "A user summarizes a webpage containing hidden instructions that cause the LLM to exfiltrate the conversation." },
      { title: "Multimodal Injection", description: "Attacker embeds malicious prompts within an image accompanying benign text." }
    ],
    references: [
      { title: "OWASP LLM01: Prompt Injection", url: "https://genai.owasp.org/" },
      { title: "Prompt Injection attack against LLM-integrated Applications", url: "https://arxiv.org/abs/2302.12173" },
      { title: "MITRE ATLAS: AML.T0051", url: "https://atlas.mitre.org/techniques/AML.T0051" }
    ]
  },
  {
    id: "LLM02:2025",
    title: "Sensitive Information Disclosure",
    description: "LLMs may inadvertently reveal confidential data (PII, financial details, proprietary algorithms) in their responses. This includes data the model was trained on (memorization) or data available in its context window.",
    commonRisks: [
      "PII Leakage (Personal Identifiable Information).",
      "Proprietary Algorithm Exposure.",
      "Sensitive Business Data Disclosure.",
      "Model Inversion attacks extracting training data."
    ],
    preventionStrategies: [
      "Integrate Data Sanitization: Scrub/mask sensitive content before training.",
      "Enforce Strict Access Controls: Grant access based on least privilege.",
      "Restrict Data Sources: Limit model access to external data.",
      "User Education: Train users not to input sensitive data.",
      "Differential Privacy: Add noise to data to prevent reverse-engineering."
    ],
    attackScenarios: [
      { title: "Unintentional Data Exposure", description: "User receives a response containing another user's personal data due to inadequate sanitization." },
      { title: "Proof Pudding (CVE-2019-20634)", description: "Disclosed training data facilitated model extraction and inversion." }
    ],
    references: [
      { title: "Lessons learned from ChatGPT’s Samsung leak", url: "https://cybernews.com/news/chatgpt-samsung-leak-lessons/" },
      { title: "MITRE ATLAS: AML.T0024 (Infer Training Data)", url: "https://atlas.mitre.org/techniques/AML.T0024" }
    ]
  },
  {
    id: "LLM03:2025",
    title: "Supply Chain Vulnerabilities",
    description: "Risks affecting the integrity of training data, models, and deployment platforms. Includes vulnerable pre-trained models, poisoned datasets, and insecure third-party plugins or LoRA adapters.",
    commonRisks: [
      "Traditional Third-party Package Vulnerabilities (outdated libs).",
      "Vulnerable Pre-Trained Models (hidden backdoors/biases).",
      "Vulnerable LoRA adapters (compromised fine-tuning layers).",
      "Model Poisoning via Collaborative Development (Hugging Face)."
    ],
    preventionStrategies: [
      "Vet data sources and suppliers rigorously.",
      "Maintain a Software Bill of Materials (SBOM) for AI components (CycloneDX).",
      "Scan for vulnerabilities (ModelScan, Pickle scanning).",
      "Use models only from verifiable sources with integrity checks (signing/hashing).",
      "Implement strict monitoring for collaborative environments."
    ],
    attackScenarios: [
      { title: "Vulnerable Python Library", description: "Attacker exploits a vulnerable library (e.g. PyTorch dependency) to compromise the environment." },
      { title: "Compromised LoRA Adapter", description: "Attacker infiltrates a supplier to compromise a LoRA adapter, providing a covert entry point." },
      { title: "PoisonGPT", description: "Direct tampering of a model to spread misinformation, bypassing safety features." }
    ],
    references: [
      { title: "PoisonGPT: Hiding a lobotomized LLM", url: "https://blog.mithrilsecurity.io/poisongpt-how-we-hid-a-lobotomized-llm-on-hugging-face-to-spread-fake-news/" },
      { title: "MITRE ATLAS: Supply Chain Compromise", url: "https://atlas.mitre.org/techniques/AML.T0010" }
    ]
  },
  {
    id: "LLM04:2025",
    title: "Data and Model Poisoning",
    description: "Manipulation of pre-training, fine-tuning, or embedding data to introduce vulnerabilities, backdoors, or biases. This is an integrity attack impacting the model's ability to make accurate predictions.",
    commonRisks: [
      "Backdoors (Sleeper Agents) triggered by specific inputs.",
      "Biased or toxic outputs due to tainted training data.",
      "Degraded model performance."
    ],
    preventionStrategies: [
      "Track data origins and transformations (Data Lineage/DVC).",
      "Implement strict sandboxing during training.",
      "Verify data legitimacy and vet vendors.",
      "Use 'Split-View' data poisoning detection.",
      "Adversarial Robustness training (Federated Learning)."
    ],
    attackScenarios: [
      { title: "Backdoor Trigger", description: "Attacker inserts a backdoor trigger; when present in input, the model bypasses authentication." },
      { title: "Split-View Poisoning", description: "Exploiting model training dynamics to introduce harmful behaviors." }
    ],
    references: [
      { title: "NIST AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework" },
      { title: "Sleeper Agents: Training Deceptive LLMs", url: "https://arxiv.org/abs/2401.05566" }
    ]
  },
  {
    id: "LLM05:2025",
    title: "Improper Output Handling",
    description: "Insufficient validation, sanitization, and handling of outputs generated by LLMs before passing them downstream. Can result in XSS, CSRF, SSRF, Privilege Escalation, or RCE.",
    commonRisks: [
      "Remote Code Execution (via eval/exec of LLM output).",
      "Cross-Site Scripting (XSS) via unsanitized JS/HTML generation.",
      "SQL Injection via unparameterized generated queries.",
      "Path Traversal via unsanitized file paths."
    ],
    preventionStrategies: [
      "Treat model output as untrusted user input (Zero Trust).",
      "Follow OWASP ASVS guidelines for output encoding.",
      "Use parameterized queries for DB operations.",
      "Employ strict Content Security Policies (CSP).",
      "Encode model output based on context (HTML, JS, SQL)."
    ],
    attackScenarios: [
      { title: "XSS via Chatbot", description: "Attacker submits a prompt causing the LLM to return a JavaScript payload that executes in the victim's browser." },
      { title: "SSH Command Injection", description: "LLM output is entered directly into a system shell, resulting in RCE." }
    ],
    references: [
      { title: "OWASP ASVS", url: "https://owasp.org/www-project-application-security-verification-standard/" },
      { title: "Snyk: Arbitrary Code Execution", url: "https://snyk.io/blog/" }
    ]
  },
  {
    id: "LLM06:2025",
    title: "Excessive Agency",
    description: "Grants the LLM excessive functionality, permissions, or autonomy to call functions or interface with other systems. Can lead to damaging actions triggered by hallucinations or prompt injection.",
    commonRisks: [
      "Excessive Functionality (access to unneeded tools).",
      "Excessive Permissions (using high-privilege identities).",
      "Excessive Autonomy (no human-in-the-loop for high-impact actions)."
    ],
    preventionStrategies: [
      "Minimize Extensions: Limit tools to minimum necessary.",
      "Limit Extension Functionality: Granular functions (e.g., 'read_email' vs 'send_email').",
      "Execute extensions in User's Context (OAuth).",
      "Require Human Approval for high-impact actions.",
      "Implement Rate Limiting on tool usage."
    ],
    attackScenarios: [
      { title: "Mail Plugin Abuse", description: "An email reading plugin also has 'send' capability. Prompt injection tricks it into forwarding sensitive emails." },
      { title: "Database Deletion", description: "Agent connects to DB with 'DROP TABLE' permissions instead of just 'SELECT'." }
    ],
    references: [
      { title: "NeMo-Guardrails", url: "https://github.com/NVIDIA/NeMo-Guardrails" },
      { title: "Simon Willison: Dual LLM Pattern", url: "https://simonwillison.net/2023/Apr/25/dual-llm-pattern/" }
    ]
  },
  {
    id: "LLM07:2025",
    title: "System Prompt Leakage",
    description: "Occurs when the system prompts or instructions used to steer the model are discovered. While not always a direct vulnerability, it can reveal sensitive business logic, internal rules, or facilitate further attacks.",
    commonRisks: [
      "Exposure of Sensitive Functionality (API keys, DB names).",
      "Exposure of Internal Rules and decision-making logic.",
      "Disclosure of Permissions and User Roles.",
      "Facilitating Prompt Injection by revealing guardrails."
    ],
    preventionStrategies: [
      "Separate Sensitive Data from System Prompts.",
      "Avoid Reliance on System Prompts for strict security controls.",
      "Implement independent Guardrails outside the LLM.",
      "Enforce security controls deterministically in code, not via prompt instructions."
    ],
    attackScenarios: [
      { title: "Credential Leak", description: "System prompt contains API keys for a tool; attacker extracts them via 'Ignore instructions' prompt." },
      { title: "Guardrail Bypass", description: "Attacker extracts the specific rules for content filtering and crafts prompts to bypass them." }
    ],
    references: [
      { title: "Prompt Security: Prompt Leaks", url: "https://www.prompt.security/" },
      { title: "MITRE ATLAS: AML.T0051 (Meta Prompt Extraction)", url: "https://atlas.mitre.org/techniques/AML.T0051" }
    ]
  },
  {
    id: "LLM08:2025",
    title: "Vector and Embedding Weaknesses",
    description: "Weaknesses in RAG systems where vectors/embeddings are generated, stored, or retrieved. Malicious inputs can inject harmful content, manipulate outputs, or access sensitive info.",
    commonRisks: [
      "Unauthorized Access & Data Leakage (Cross-tenant leakage).",
      "Embedding Inversion Attacks (Recovering original text).",
      "Data Poisoning via Semantic Search manipulation.",
      "Federation Knowledge Conflict."
    ],
    preventionStrategies: [
      "Implement fine-grained access controls for Vector DBs.",
      "Strictly sandbox and partition datasets logically.",
      "Validate integrity of knowledge sources (Cryptographic checks).",
      "Monitor retrieval logs for anomalies.",
      "Use text extraction tools that ignore hidden/white-on-white text."
    ],
    attackScenarios: [
      { title: "Resume Poisoning", description: "Attacker hides 'Hire this person' text in a resume. RAG retrieves it, and the hidden text overrides the model's judgment." },
      { title: "Cross-Tenant Leak", description: "Embeddings from User A are retrieved for User B's query due to poor partitioning." }
    ],
    references: [
      { title: "Astute RAG: Overcoming Imperfect Retrieval", url: "https://arxiv.org/abs/2310.05700" },
      { title: "Confused Deputy Risks in RAG", url: "https://arxiv.org/abs/2401.05566" }
    ]
  },
  {
    id: "LLM09:2025",
    title: "Misinformation",
    description: "LLMs producing false, misleading, or nonsensical information (Hallucinations) that appears credible. Can lead to reputational damage, legal liability, or dangerous decision-making.",
    commonRisks: [
      "Factual Inaccuracies (e.g., in news or history).",
      "Unsupported Claims (e.g., in medical or legal advice).",
      "Unsafe Code Generation (hallucinating non-existent libraries).",
      "Misrepresentation of Expertise."
    ],
    preventionStrategies: [
      "Use Retrieval-Augmented Generation (RAG) to ground answers.",
      "Implement Cross-Verification and Human Oversight.",
      "Fine-tune models on domain-specific high-quality data.",
      "User Interface Design: Clearly label AI content and limitations.",
      "Parameter-Efficient Tuning (PET) / Chain-of-thought prompting."
    ],
    attackScenarios: [
      { title: "Package Hallucination", description: "Attacker identifies a hallucinated library name, registers it on npm/PyPi with malware. Developers install it." },
      { title: "Fake Legal Precedent", description: "A lawyer uses ChatGPT for research; it fabricates non-existent court cases." }
    ],
    references: [
      { title: "Understanding LLM Hallucinations", url: "https://towardsdatascience.com/" },
      { title: "MITRE ATLAS: AML.T0048.002 (Societal Harm)", url: "https://atlas.mitre.org/techniques/AML.T0048.002" }
    ]
  },
  {
    id: "LLM10:2025",
    title: "Unbounded Consumption",
    description: "Occurs when an LLM allows excessive and uncontrolled inferences, leading to Denial of Service (DoS), economic losses (Denial of Wallet), or model theft. High compute/cost makes this critical.",
    commonRisks: [
      "Variable-Length Input Flood (Resource exhaustion).",
      "Denial of Wallet (DoW) (Financial exhaustion).",
      "Continuous Input Overflow (Context window attacks).",
      "Model Extraction via API (Functional Model Replication)."
    ],
    preventionStrategies: [
      "Implement Input Validation: Limit size and complexity.",
      "Rate Limiting and User Quotas.",
      "Resource Allocation Management (Timeouts, Throttling).",
      "Limit Exposure of Logits/Logprobs (prevents extraction).",
      "Limit Queued Actions and Scale Robustly."
    ],
    attackScenarios: [
      { title: "Denial of Wallet", description: "Attacker sends complex queries to a pay-per-token API, causing massive financial bills." },
      { title: "Sponge Attack", description: "Inputs designed to trigger worst-case compute performance." }
    ],
    references: [
      { title: "MITRE CWE-400: Uncontrolled Resource Consumption", url: "https://cwe.mitre.org/data/definitions/400.html" },
      { title: "Sponge Examples: Energy-Latency Attacks", url: "https://arxiv.org/abs/2006.03463" }
    ]
  }
];
