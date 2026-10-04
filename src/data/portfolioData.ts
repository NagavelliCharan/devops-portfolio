import type { Project, SkillCategory, Certification, ExperienceItem, ArchitectureNode } from '../types';

export const PERSONAL_INFO = {
  name: "Alex Rivera",
  title: "Fresher DevOps Engineer & Cloud Enthusiast",
  subTitle: "Bridging Code & Infrastructure with Automation, Containers & IaC",
  location: "Open to Remote & Onsite (Global / India / US)",
  email: "alex.rivera.devops@example.com",
  github: "https://github.com/alexrivera-devops",
  linkedin: "https://linkedin.com/in/alexrivera-devops",
  status: "Available for Hire (Junior / Entry-Level DevOps Roles)",
  summary: "Driven Computer Science graduate with hands-on expertise in Docker, Kubernetes, Terraform, AWS, and GitOps CI/CD pipelines. Passionate about zero-downtime deployments, infrastructure automation, and real-time observability.",
  stats: [
    { label: "Container Builds", value: "250+" },
    { label: "Pipeline Success Rate", value: "99.4%" },
    { label: "IaC Modules Written", value: "18+" },
    { label: "Simulated Uptime", value: "99.9%" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "gitops-argocd-eks",
    title: "GitOps Automated Microservices CI/CD Pipeline",
    tagline: "End-to-End Automated Deployment to AWS EKS using Helm & ArgoCD",
    category: "cicd",
    description: "Designed and implemented a GitOps continuous deployment pipeline for a multi-service web application. Any code push to main triggers GitHub Actions for testing & Trivy security scanning, builds a multi-stage Docker image, pushes it to Amazon ECR, and syncs deployment state to AWS EKS using ArgoCD.",
    keyFeatures: [
      "Zero-downtime rolling deployments with Helm Charts",
      "Automated container image security scanning using Trivy & SonarQube",
      "ArgoCD GitOps synchronization with auto-rollback on failed health checks",
      "Slack notifications triggered via Webhooks on build success/failure"
    ],
    techStack: ["GitHub Actions", "Docker", "Kubernetes", "AWS EKS", "ArgoCD", "Helm", "Trivy"],
    architectureSummary: "GitHub Push -> GitHub Actions (Lint, Test, Docker Build, Trivy Scan) -> AWS ECR -> ArgoCD GitOps Sync -> AWS EKS Cluster (Rolling Release)",
    githubUrl: "https://github.com/alexrivera-devops/gitops-eks-pipeline",
    demoUrl: "https://demo-pipeline.example.com",
    metrics: "Reduced deployment time from 25 min to 3.5 min",
    codeSnippet: {
      filename: "argocd-application.yaml",
      language: "yaml",
      code: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: microservice-prod
  namespace: argocd
spec:
  project: default
  source:
    repoURL: 'https://github.com/alexrivera-devops/k8s-manifests.git'
    targetRevision: HEAD
    path: helm-charts/api-service
  destination:
    server: 'https://kubernetes.default.svc'
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true`
    }
  },
  {
    id: "terraform-aws-vpc-eks",
    title: "AWS Multi-Tier Infrastructure as Code (IaC)",
    tagline: "Production-Ready Automated AWS Cloud Infrastructure with Terraform",
    category: "iac",
    description: "Built modular Terraform code to automate creation of a secure AWS VPC spanning 3 Availability Zones, public/private subnets, NAT Gateways, Security Groups, IAM roles with Least Privilege Access, and a managed AWS EKS Kubernetes Cluster with S3 state locking.",
    keyFeatures: [
      "S3 Remote State Storage with DynamoDB lock table to prevent race conditions",
      "Reusable custom Terraform modules for VPC, EKS, and RDS MySQL",
      "Cost-optimized auto-scaling worker nodes using AWS EC2 Spot instances",
      "Strict Security Group rules restricting DB access only to private subnets"
    ],
    techStack: ["Terraform", "AWS (VPC, EKS, EC2, IAM, S3, DynamoDB)", "HCL", "Terragrunt"],
    architectureSummary: "Terraform Cloud/CLI -> S3 State Lock -> AWS VPC (3 AZs) -> Public/Private Subnets -> NAT Gateways -> EKS Cluster & RDS Instance",
    githubUrl: "https://github.com/alexrivera-devops/terraform-aws-eks-infrastructure",
    metrics: "100% Infra reproducibility in under 12 minutes",
    codeSnippet: {
      filename: "main.tf",
      language: "hcl",
      code: `module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.1.0"

  name = "devops-portfolio-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b", "us-east-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway   = true
  single_nat_gateway   = true
  enable_dns_hostnames = true

  tags = {
    Environment = "Production"
    ManagedBy   = "Terraform"
    Owner       = "Alex Rivera"
  }
}`
    }
  },
  {
    id: "prometheus-grafana-monitoring",
    title: "Kubernetes Cluster Observability & Alerting Stack",
    tagline: "Full-Stack Monitoring with Prometheus, Grafana & Alertmanager",
    category: "monitoring",
    description: "Deployed and configured Prometheus Operator, Node Exporter, Kube-State-Metrics, and Grafana on Kubernetes via Helm. Custom dashboards were built to monitor cluster CPU throttling, pod memory spikes, and ingress latency, integrated with Alertmanager for Discord & Email alerts.",
    keyFeatures: [
      "Custom Grafana Dashboards tracking Pod CPU utilization & HTTP response codes",
      "Alertmanager rules for Pod CrashLoopBackOff & High Memory Usage (>85%)",
      "Log aggregation setup using Grafana Loki & Promtail",
      "Automated persistent volume retention policies for metric history"
    ],
    techStack: ["Prometheus", "Grafana", "Alertmanager", "Loki", "Kubernetes", "Helm", "PromQL"],
    architectureSummary: "K8s Pods / Nodes -> Prometheus Scrape -> Alertmanager -> Grafana Dashboard & Discord Webhook Alerts",
    githubUrl: "https://github.com/alexrivera-devops/k8s-monitoring-stack",
    metrics: "Sub-second real-time alert latency for critical cluster events",
    codeSnippet: {
      filename: "prometheus-alert-rules.yaml",
      language: "yaml",
      code: `apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: pod-high-memory-alert
  namespace: monitoring
spec:
  groups:
  - name: kubernetes-apps
    rules:
    - alert: HighMemoryUsage
      expr: sum(container_memory_working_set_bytes) by (pod) / sum(kube_pod_container_resource_limits{resource="memory"}) * 100 > 85
      for: 2m
      labels:
        severity: critical
      annotations:
        summary: "Pod {{ $labels.pod }} high memory usage (> 85%)"`
    }
  },
  {
    id: "ansible-server-automation",
    title: "Ansible Automated Server Configuration & Security Hardening",
    tagline: "Automated Linux Node Provisioning & CIS Security Benchmark Hardening",
    category: "ansible",
    description: "Wrote Ansible Playbooks and Roles to automatically provision bare-metal and EC2 Linux servers. Configured automated UFW firewall setup, SSH key enforcement, Docker engine setup, Nginx reverse proxy configuration, and SSL certificate installation with Let's Encrypt.",
    keyFeatures: [
      "Idempotent playbooks for Ubuntu 22.04 & RHEL systems",
      "Automated SSH hardening (disabling root login, password auth)",
      "Automated Nginx setup with reverse proxying and rate limiting",
      "Vault encrypted credentials for DB passwords & private API keys"
    ],
    techStack: ["Ansible", "Linux (Ubuntu/Debian)", "Bash", "Nginx", "Certbot", "UFW"],
    architectureSummary: "Ansible Control Node -> SSH Key Authentication -> Target Linux Nodes -> Role Execution (Hardening, Nginx, Docker)",
    githubUrl: "https://github.com/alexrivera-devops/ansible-server-hardening",
    metrics: "Configured 10 server nodes simultaneously in 45 seconds",
    codeSnippet: {
      filename: "site.yml",
      language: "yaml",
      code: `- name: Configure and Harden Web Servers
  hosts: webservers
  become: yes
  vars_files:
    - vars/vault.yml

  roles:
    - role: common_setup
    - role: ssh_hardening
    - role: ufw_firewall
    - role: docker_engine
    - role: nginx_reverse_proxy`
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "cloud-iac",
    name: "Cloud & IaC",
    icon: "Cloud",
    skills: [
      { name: "AWS (EC2, S3, VPC, EKS, IAM, RDS)", level: 88, isPrimary: true, labEvidence: "Built multi-AZ VPC & EKS cluster with Terraform" },
      { name: "Terraform", level: 90, isPrimary: true, labEvidence: "15+ custom modular HCL scripts with S3 remote backend" },
      { name: "Ansible", level: 82, isPrimary: true, labEvidence: "Automated node provisioning & SSH hardening playbooks" },
      { name: "CloudFormation", level: 70, isPrimary: false, labEvidence: "Basic stack creation for S3 & EC2 instances" }
    ]
  },
  {
    id: "containers-k8s",
    name: "Containers & Orchestration",
    icon: "Boxes",
    skills: [
      { name: "Docker & Docker Compose", level: 95, isPrimary: true, labEvidence: "Multi-stage builds optimizing image sizes by 65%" },
      { name: "Kubernetes (K8s)", level: 85, isPrimary: true, labEvidence: "Deployments, Services, Ingress, ConfigMaps & Secrets" },
      { name: "Helm Charts", level: 82, isPrimary: true, labEvidence: "Custom package creation for microservices stack" },
      { name: "ArgoCD (GitOps)", level: 80, isPrimary: true, labEvidence: "Automated K8s cluster synchronization & self-healing" }
    ]
  },
  {
    id: "cicd-automation",
    name: "CI/CD & Automation",
    icon: "GitBranch",
    skills: [
      { name: "GitHub Actions", level: 92, isPrimary: true, labEvidence: "Multi-job workflows with caching & Trivy security matrix" },
      { name: "Jenkins", level: 78, isPrimary: false, labEvidence: "Declarative Pipeline syntax with Docker agent nodes" },
      { name: "GitLab CI", level: 75, isPrimary: false, labEvidence: ".gitlab-ci.yml pipeline configuration with runners" },
      { name: "Git & GitHub", level: 94, isPrimary: true, labEvidence: "Branching strategies, PR reviews & conventional commits" }
    ]
  },
  {
    id: "monitoring-sec",
    name: "Monitoring & Security",
    icon: "ShieldCheck",
    skills: [
      { name: "Prometheus", level: 85, isPrimary: true, labEvidence: "Scrape targets, PromQL metrics & Alertmanager setup" },
      { name: "Grafana", level: 88, isPrimary: true, labEvidence: "Custom live operational dashboards & alerts" },
      { name: "Trivy & SonarQube", level: 80, isPrimary: true, labEvidence: "Container vulnerability scanning in build pipelines" },
      { name: "Linux Security Hardening", level: 82, isPrimary: true, labEvidence: "UFW rules, SSH key auth & fail2ban setups" }
    ]
  },
  {
    id: "scripting-linux",
    name: "Scripting & OS",
    icon: "Terminal",
    skills: [
      { name: "Bash / Shell Scripting", level: 90, isPrimary: true, labEvidence: "Automated backup scripts, metric parsers & cron jobs" },
      { name: "Linux System Administration", level: 88, isPrimary: true, labEvidence: "Process management, systemd services, networking & permissions" },
      { name: "Python Automation", level: 80, isPrimary: true, labEvidence: "Boto3 AWS scripts for automated EBS snapshot backups" },
      { name: "Nginx & Reverse Proxies", level: 84, isPrimary: true, labEvidence: "SSL termination, load balancing & proxy headers" }
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "aws-cpa",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issueDate: "2024",
    icon: "Cloud",
    skillsVerified: ["AWS Core Services", "Cloud Security", "VPC Networking", "IAM Policies", "Billing & Cost Optimization"],
    credentialId: "AWS-CCP-987214"
  },
  {
    id: "hashicorp-terraform",
    title: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    issueDate: "2024",
    icon: "Cpu",
    skillsVerified: ["IaC Architecture", "HCL Syntax", "Terraform State Management", "Modules & Provider Setup"],
    credentialId: "HC-TF-45192"
  },
  {
    id: "docker-foundational",
    title: "Docker Certified Associate / Essentials",
    issuer: "Docker Inc.",
    issueDate: "2023",
    icon: "Container",
    skillsVerified: ["Containerization", "Multi-stage Dockerfiles", "Bridge & Overlay Networks", "Docker Volumes"],
    credentialId: "DOCKER-DCA-30912"
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "education",
    type: "education",
    title: "B.Tech in Computer Science & Engineering",
    organization: "State University of Technology",
    period: "2020 - 2024",
    description: [
      "Graduated with 3.8/4.0 GPA with specialization in Cloud Computing & Distributed Systems.",
      "Led the university Open Source & Cloud Computing student club, conducting hands-on Docker workshops for 120+ students.",
      "Final Year Project: 'Automated K8s Microservice Deployment with GitOps and Distributed Observability'."
    ],
    technologies: ["Computer Networks", "Operating Systems", "Distributed Systems", "Cloud Architecture"]
  },
  {
    id: "internship",
    type: "internship",
    title: "DevOps Engineer Intern",
    organization: "CloudScale Technologies Inc.",
    period: "Jan 2024 - May 2024",
    description: [
      "Migrated 12+ legacy microservice deployment scripts to standardized GitHub Actions workflows, reducing manual build errors by 40%.",
      "Configured Prometheus Node Exporter across 25 EC2 instances and set up Grafana alert notifications.",
      "Optimized Docker container images using alpine bases and multi-stage builds, shrinking image sizes from 850MB to 180MB."
    ],
    technologies: ["Docker", "GitHub Actions", "AWS EC2", "Prometheus", "Grafana", "Bash"]
  },
  {
    id: "hackathon",
    type: "hackathon",
    title: "1st Place Winner - Cloud & Infrastructure Hackathon",
    organization: "National Tech Summit 2023",
    period: "Nov 2023",
    description: [
      "Built 'AutoChaos-K8s': an automated chaos engineering tool that injects latency and pod kills into Kubernetes namespaces while testing circuit breaking resilience.",
      "Awarded Best Cloud Project for real-time observability visualizer and automated rollback trigger."
    ],
    technologies: ["Kubernetes", "Go", "Python", "Chaos Mesh", "Prometheus"]
  }
];

export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: "internet-gateway",
    title: "Route 53 & AWS CloudFront ALB",
    category: "cloud",
    description: "Ingress point for user traffic. HTTPS requests pass through AWS Application Load Balancer with SSL termination managed via ACM certificates.",
    tech: "AWS ALB, Route53, ACM SSL",
    codeSnippet: `resource "aws_lb" "main" {
  name               = "k8s-alb-ingress"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = module.vpc.public_subnets
}`,
    snippetLanguage: "hcl",
    connections: ["ingress-controller"]
  },
  {
    id: "ingress-controller",
    title: "NGINX Ingress Controller",
    category: "compute",
    description: "Decodes path-based routing (/api, /auth, /app) within the Kubernetes cluster and enforces HTTP rate-limiting rules.",
    tech: "Kubernetes NGINX Ingress, Helm",
    codeSnippet: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-ingress
  annotations:
    nginx.ingress.kubernetes.io/rate-limit: "100"
spec:
  rules:
  - host: app.devops.internal
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend-service
            port:
              number: 8080`,
    snippetLanguage: "yaml",
    connections: ["web-pods", "auth-pods"]
  },
  {
    id: "web-pods",
    title: "EKS Microservices Pods",
    category: "compute",
    description: "Stateless containerized Node.js and Python microservices managed by K8s Deployment with Horizontal Pod Autoscaler (HPA) configured from 3 to 15 pods.",
    tech: "Kubernetes, Docker, Node.js",
    codeSnippet: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web-app
        image: 123456789.dkr.ecr.us-east-1.amazonaws.com/web-app:v1.4.2
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "200m"
            memory: "256Mi"`,
    snippetLanguage: "yaml",
    connections: ["rds-database", "prometheus-monitoring"]
  },
  {
    id: "rds-database",
    title: "AWS RDS PostgreSQL (Multi-AZ)",
    category: "database",
    description: "High-availability relational database deployed across private subnets with automated snapshots and read-replicas.",
    tech: "AWS RDS, PostgreSQL 15, Terraform",
    codeSnippet: `resource "aws_db_instance" "postgres" {
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "15.3"
  instance_class       = "db.t4g.micro"
  db_name              = "devops_db"
  username             = "db_admin"
  multi_az             = true
  db_subnet_group_name = aws_db_subnet_group.private.name
  skip_final_snapshot  = true
}`,
    snippetLanguage: "hcl",
    connections: []
  },
  {
    id: "prometheus-monitoring",
    title: "Prometheus & Grafana Stack",
    category: "monitoring",
    description: "Scrapes metric endpoints every 15 seconds. Visualizes live node CPU, memory pressure, and HTTP error rates with automated Alertmanager triggers.",
    tech: "Prometheus, Grafana, Alertmanager",
    codeSnippet: `scrape_configs:
  - job_name: 'k8s-pod-metrics'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true`,
    snippetLanguage: "yaml",
    connections: []
  },
  {
    id: "argocd-gitops",
    title: "ArgoCD GitOps Sync Engine",
    category: "ci-cd",
    description: "Monitors git repository changes in k8s-manifests repo and automatically syncs state to the live EKS cluster.",
    tech: "ArgoCD, GitOps, Kubernetes",
    codeSnippet: `# ArgoCD syncs cluster state with GitHub repo automatically every 3 minutes
argocd app sync microservice-prod`,
    snippetLanguage: "bash",
    connections: ["web-pods"]
  }
];
