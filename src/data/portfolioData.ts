export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  category: string;
  period: string;
  description: string;
  technicalDetails: string[];
  deliverables: string[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  metrics: { label: string; value: string }[];
}

export interface ExperienceItem {
  role: string;
  organization: string;
  location: string;
  period: string;
  type: string;
  highlights: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade: string;
  details?: string;
}

export const PERSONAL_DATA = {
  name: "Sarthak",
  handle: "justsarx",
  role: "AOSP Developer & Systems Engineer",
  location: "Patna, Bihar, India",
  coordinates: "25.5941° N, 85.1376° E",
  email: "sinhasarthak56@gmail.com",
  github: "https://github.com/justsarx",
  linkedin: "https://linkedin.com/in/justsarx/",
  website: "https://justsarx.me",
  status: "Available for Systems Engineering & Core Software Roles",
  statement: "I engineer low-level Android operating system trees, Linux kernel 5.10 device drivers, client-side WebGPU acceleration, and scalable full-stack backend systems.",
  about: "Systems engineer specializing in AOSP (Android Open Source Project) device trees, Linux Kernel 5.10 LTS driver porting for the Motorola Edge 40 Neo (manaus / MediaTek Dimensity 7030), and on-device WebGPU inference pipelines. Background spans C++, Python, Django REST, and modern reactive interfaces."
};

export const HIGHLIGHT_METRICS = [
  {
    num: "01",
    label: "AOSP Milestone",
    title: "1st Android QPR Release",
    detail: "First developer worldwide to release functional Android Quarterly Platform Release (QPR) builds for Motorola Edge 40 Neo (manaus)."
  },
  {
    num: "02",
    label: "Academic Merit",
    title: "8.55 CGPA in MCA",
    detail: "Master of Computer Applications at Lovely Professional University with focus on advanced OS architecture."
  },
  {
    num: "03",
    label: "Edge AI Architecture",
    title: "0ms Cloud Dependence",
    detail: "Built local WebGPU transformer inference pipeline executing quantized models directly inside browser runtimes."
  },
  {
    num: "04",
    label: "Production Delivery",
    title: "100% On-Time Milestones",
    detail: "Delivered all three backend and AI evaluation milestones ahead of schedule during intensive Python internship."
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "aosp-manaus",
    index: "01",
    title: "AOSP Device Tree & Hardware Enablement",
    category: "Operating Systems / Kernel",
    period: "Jan 2026 – Feb 2026",
    description: "Ported and maintained custom Android Open Source Project (AOSP) ROM builds from source for the Motorola Edge 40 Neo (manaus / MediaTek Dimensity 7030 / Linux Kernel 5.10 LTS).",
    technicalDetails: [
      "Engineered hardware abstraction layer (HAL) integration for optical in-display fingerprint (FOD) sensor.",
      "Implemented Linux 5.10 kernel sysfs hooks for Double-Tap-To-Wake (DT2W) power management.",
      "Configured 5G NR carrier aggregation profiles across sub-6 GHz telecom frequency bands.",
      "Authored SELinux policies in full ENFORCING mode ensuring zero audit denials and complete CTS pass."
    ],
    deliverables: [
      "World-first Android QPR release for Motorola Edge 40 Neo",
      "Custom Linux 5.10 LTS kernel driver integration",
      "Vendor proprietary blob separation & BoardConfig architecture"
    ],
    tags: ["AOSP", "Linux Kernel 5.10", "C++", "Device Tree", "SELinux", "Git", "Make/Soong"],
    githubUrl: "https://github.com/justsarx/device_axion_manaus",
    liveUrl: "https://justsarx.me",
    metrics: [
      { label: "SoC Base", value: "Dimensity 7030" },
      { label: "Kernel", value: "5.10 LTS" },
      { label: "SELinux", value: "Enforcing" },
      { label: "Profile", value: "CTS Passed" }
    ]
  },
  {
    id: "variance",
    index: "02",
    title: "Variance — Client-Side WebGPU AI Paraphraser",
    category: "Edge Machine Learning",
    period: "Dec 2025 – June 2026",
    description: "Designed a privacy-preserving text transformation and rewriting engine running entirely in-browser via WebGPU hardware acceleration.",
    technicalDetails: [
      "Leveraged quantized Transformers.js ONNX models executing directly on client GPU shaders via WebGPU.",
      "Engineered tiered execution pipeline combining algorithmic heuristic shifts with local LLM semantic evaluation.",
      "Eliminated backend server costs and API latency while guaranteeing 100% data confidentiality for sensitive user text.",
      "Implemented intelligent text reconstruction keeping syntactic coherence and original tone intact."
    ],
    deliverables: [
      "Zero-latency client-side text transformation pipeline",
      "Local model execution with zero telemetry or cloud logging",
      "High-throughput WebGPU buffer allocation & memory management"
    ],
    tags: ["React", "TypeScript", "WebGPU", "Transformers.js", "ONNX", "Tailwind CSS"],
    githubUrl: "https://github.com/justsarx/Variance",
    metrics: [
      { label: "Execution", value: "100% Client-Side" },
      { label: "Privacy", value: "Zero Cloud Logs" },
      { label: "Runtime", value: "WebGPU / ONNX" },
      { label: "Latency", value: "< 120ms" }
    ]
  },
  {
    id: "resumify",
    index: "03",
    title: "Resumify — AI Resume Evaluation & ATS Platform",
    category: "Full-Stack & LLM Systems",
    period: "Jan 2025 – Feb 2025",
    description: "Full-stack resume evaluation and ATS compatibility scoring system powered by Django REST framework and Google Gemini API.",
    technicalDetails: [
      "Built resilient Django REST backend with PDF parsing pipelines extracting resume tokens and candidate skill vectors.",
      "Integrated Google Gemini LLM with structured schema outputs for automated keyword alignment and gap analysis.",
      "Developed responsive React frontend displaying visual ATS score breakdown, role readiness radar, and actionable feedback.",
      "Implemented secure JWT authentication and standardized scoring rubrics for recruiter evaluation."
    ],
    deliverables: [
      "Automated candidate ATS alignment scoring engine",
      "Real-time feedback generation with actionable improvement vectors",
      "Exportable structured scoring reports"
    ],
    tags: ["Django", "Python", "React.js", "Google Gemini API", "REST APIs", "SQL"],
    githubUrl: "https://github.com/justsarx/Resumify",
    metrics: [
      { label: "Backend", value: "Django REST" },
      { label: "LLM Model", value: "Gemini Pro" },
      { label: "Parse Speed", value: "< 1.5s" },
      { label: "Architecture", value: "Decoupled" }
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    role: "AOSP Device Tree Maintainer & Contributor",
    organization: "Open-Source Android Ecosystem",
    location: "Remote / India",
    period: "Dec 2025 – Present",
    type: "Open Source",
    highlights: [
      "Ported and maintained custom Android builds for Motorola Edge 40 Neo (manaus).",
      "Released the first functional Android QPR update for the device with in-display fingerprint (FOD) support.",
      "Authored custom SELinux policies and Linux 5.10 kernel driver patches for 5G carrier aggregation and power HALs.",
      "Managed version control across multi-repository Android manifests with clean upstream rebase workflows."
    ],
    technologies: ["AOSP", "Linux Kernel 5.10", "C++", "SELinux", "Git", "Bash"]
  },
  {
    role: "Python Programming Intern",
    organization: "YBI Foundation",
    location: "Remote, India",
    period: "Jan 2025 – Mar 2025",
    type: "Internship",
    highlights: [
      "Completed an intensive internship focused on Python backend programming, RESTful APIs, and system integration.",
      "Delivered all three designated project milestones ahead of schedule with complete unit testing.",
      "Architected a full-stack AI resume screening system integrating Django REST endpoints with LLM processing workflows.",
      "Collaborated on API design, database schema optimization, and clean modular code standards."
    ],
    technologies: ["Python", "Django REST", "Google Gemini API", "React.js", "SQL", "Git"]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Lovely Professional University",
    location: "Jalandhar, Punjab, India",
    period: "2025 – Present",
    grade: "CGPA: 8.55",
    details: "Advanced study in operating system architecture, cloud systems, and distributed algorithms."
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "L. N. Mishra Institute of Economic Development and Social Change",
    location: "Patna, Bihar, India",
    period: "2022 – 2025",
    grade: "CGPA: 7.75",
    details: "Core fundamentals in Data Structures, Algorithms, C++, Java, Database Management (MySQL/Oracle), and Systems."
  },
  {
    degree: "Senior Secondary (12th Science — CBSE)",
    institution: "Shivam School",
    location: "Patna, Bihar, India",
    period: "2021 – 2022",
    grade: "Score: 63.8%",
    details: "Physics, Chemistry, Mathematics, Computer Science"
  },
  {
    degree: "Secondary School (10th — CBSE)",
    institution: "Dr. G.L. Dutta D.A.V. Public School",
    location: "Patna, Bihar, India",
    period: "2019 – 2020",
    grade: "Score: 61.17%",
    details: "Science, Mathematics, Social Sciences"
  }
];

export const SKILL_GROUPS = [
  {
    group: "Systems & Low-Level",
    skills: ["AOSP Architecture", "Linux Kernel 5.10", "C / C++", "Device Trees", "HAL Integration", "SELinux", "Make / Soong", "Bash Scripting"]
  },
  {
    group: "Edge AI & Machine Learning",
    skills: ["WebGPU Compute", "Transformers.js", "ONNX Runtime", "Google Gemini API", "Local LLM Inference", "Prompt Engineering"]
  },
  {
    group: "Backend & Web Architecture",
    skills: ["Python", "Django & Django REST", "React.js", "TypeScript", "Node.js", "Tailwind CSS", "RESTful APIs"]
  },
  {
    group: "Databases & DevOps",
    skills: ["MySQL", "Oracle Database", "Docker", "Git / GitHub Manifests", "Data Structures & Algorithms", "OOP Design"]
  }
];

export const AOSP_SYSTEM_SPECS = [
  {
    filename: "BoardConfig.mk",
    category: "Architecture & Target",
    description: "Defines arm64-v8a target architecture, Clang compilation parameters, and Android 14/15 QPR flags.",
    snippet: `# Motorola Edge 40 Neo (manaus) BoardConfig
TARGET_ARCH := arm64
TARGET_ARCH_VARIANT := armv8-2a-dotprod
TARGET_CPU_ABI := arm64-v8a
TARGET_CPU_VARIANT := cortex-a78

# Kernel 5.10 LTS & Toolchain Flags
TARGET_KERNEL_VERSION := 5.10
TARGET_KERNEL_SOURCE := kernel/motorola/manaus
BOARD_KERNEL_CMDLINE := bootopt=64S3,32N2,64N2 androidboot.selinux=enforcing
TARGET_KERNEL_CLANG_COMPILE := true

# Display & Refresh Rate
TARGET_SCREEN_DENSITY := 440
TARGET_REFRESH_RATE := 144Hz`
  },
  {
    filename: "biometrics/BiometricsFingerprint.cpp",
    category: "FOD Under-Display Sensor HAL",
    description: "Custom biometric HAL implementation handling optical screen illumination and touch coordinates.",
    snippet: `// Optical In-Display Fingerprint (FOD) HAL Driver
#include "BiometricsFingerprint.h"
#include <android-base/logging.h>
#include <fstream>

namespace android::hardware::biometrics::fingerprint::V2_3::implementation {

Return<RequestStatus> BiometricsFingerprint::onShowFodDimLayer() {
    std::ofstream fodDimNode("/sys/devices/virtual/touch/tp_fod/dim_layer");
    if (fodDimNode.is_open()) {
        fodDimNode << "1"; // Activate optical green emitter backlight
        LOG(INFO) << "FOD: Dim layer enabled for XT2307 optical sensor";
        return RequestStatus::SYS_OK;
    }
    return RequestStatus::SYS_EFAULT;
}

}`
  },
  {
    filename: "power/dt2w_power_hal.c",
    category: "Double-Tap-To-Wake (DT2W)",
    description: "Low-overhead sysfs driver bridge routing screen-off touch gesture interrupts in Linux 5.10.",
    snippet: `/* DT2W Power HAL Hook for Moto Edge 40 Neo (Kernel 5.10) */
#include <fcntl.h>
#include <unistd.h>
#include <cutils/log.h>

#define TP_GESTURE_PATH "/proc/touchpanel/gesture_enable"

int set_interactive_ext(int on) {
    if (!on) {
        int fd = open(TP_GESTURE_PATH, O_WRONLY);
        if (fd >= 0) {
            write(fd, "1", 1); // Arm low-power touch listener
            close(fd);
            ALOGI("DT2W gesture listener armed in sleep mode");
        }
    }
    return 0;
}`
  },
  {
    filename: "sepolicy/vendor_hal.te",
    category: "SELinux Enforcing Policy",
    description: "Strict security domain rules guaranteeing zero denial logs and CTS profile validation.",
    snippet: `# SELinux Policies for Motorola Manaus Custom Vendor Daemons
type hal_fingerprint_manaus, domain;
hal_server_domain(hal_fingerprint_manaus, hal_fingerprint)

# Allow fingerprint HAL to access sysfs optical nodes
allow hal_fingerprint_manaus sysfs_touchpanel:file rw_file_perms;
allow hal_fingerprint_manaus vendor_focaltech_device:chr_file rw_file_perms;

# Enforce strict domain transitions
neverallow { domain -hal_fingerprint_manaus } vendor_focaltech_device:chr_file { write open };`
  }
];
