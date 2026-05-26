# YOGESH E S
### Aeronautical & Autonomy Systems Engineer

Email: yogeshes376@gmail.com | Phone: +91 78926 34405 | Bengaluru, India  
LinkedIn: [linkedin.com/in/yogesh-e-s](https://linkedin.com/in/yogesh-e-s) | GitHub: [github.com/yogesh031020](https://github.com/yogesh031020) | Portfolio: [yogesh031020.github.io](https://yogesh031020.github.io)

---

## PROFESSIONAL SUMMARY
Aeronautical & UAV Systems Engineer with end-to-end ownership of autonomous drone development from bare-metal ESP32-S3 autopilot PCB design and ArduPilot HAL integration to ROS 2 swarm middleware and BVLOS field operations. Designed, built, and flight-tested custom flight controllers with EKF3 sensor fusion; commanded operations across a 20+ airframe fleet through 120+ sorties under DGCA UAS Rules 2021. Seeking to bring this depth across the full stack from sensor integration to autonomous mission execution at a company building mission-critical UAV systems.

**Key Achievements:** 120+ BVLOS Sorties | 25% Vibration Reduction | 40% Network Overhead Cut | ±1.2 m Position Hold | 33% GCS Setup Time Reduction

---

## SKILLS
* **Flight Software & Autopilot:** ArduPilot (HAL Porting/Integration), PX4, MAVLink v2, SITL / HIL Test Environments, Autopilot Failsafe Design, Flight Log Diagnostics
* **Robotics & Middleware:** ROS 2 (Humble/Jazzy, rclcpp, tf2, nav2), Zenoh DDS, Micro-XRCE-DDS, Behavior Trees, Gazebo Harmonic, RViz2
* **Embedded & Avionics Hardware:** Custom Autopilot PCB Design (ESP32-S3), FreeRTOS, DSHOT/ESC Wiring, Sensor Bring-Up (SPI, I2C, CAN, UART), Companion Computer Integration
* **GNC & Autonomy:** EKF3 Sensor Fusion, Offboard Path Planning (A*), Waypoint Navigation, Swarm Coordination, GPS-Denied IR Triangulation, Geofencing
* **Payload & Sensing:** Payload Camera Integration, LiDAR (familiarity), RTK GNSS (familiarity), TSOP IR Sensor Arrays, Ultrasonic Obstacle Avoidance
* **Software & Tools:** Python, C++, PyTorch, TensorFlow Lite Micro, OpenVSP, OpenFOAM, PrePoMax/CalculiX FEA, QGroundControl, Mission Planner
* **Regulations & Operations:** DGCA UAS Rules 2021, BVLOS Operations, Ground Control Station (GCS) Management, Flight Test Planning, SOPs & Safety Protocols

---

## PROFESSIONAL EXPERIENCE

### UAV Systems Engineer
**Novatech Robo Pvt. Ltd.** | *Bengaluru, India* | `Jun 2024 — Present`
* Commanded BVLOS flight test operations across a 20+ airframe fleet logging 120+ sorties with zero incidents executing pre-flight airworthiness checks, real-time telemetry monitoring, and structured post-flight debrief cycles in compliance with DGCA UAS Rules 2021.
* Authored corporate SOPs for a 5-pilot crew, standardizing pre-flight checklists, emergency response protocols, GCS configuration procedures, and bench-test validation logic; adopted as the baseline operating framework for all new airframe integrations.
* Built a Python telemetry diagnostic pipeline to parse ArduPilot .bin logs for IMU vibration peaks and EKF3 residuals; applied FFT-driven motor-mount isolation across 5 platforms, reducing structural vibration levels by 25% and extending drivetrain service intervals.
* Integrated custom ESP32-S3 autopilots with DSHOT ESC wiring and payload cameras; developed ROS 2 (rclcpp) offboard nodes for autonomous waypoint sequencing and dynamic geofence enforcement, cutting pre-mission GCS setup time from ~45 min to ~30 min per sortie (33% reduction).
* Executed real-time GCS PID loop tuning to eliminate roll/pitch transients and optimize battery draw across multiple airframe configurations; delivered hands-on drone assembly and calibration workshops to 120+ engineers across 6 cohort groups.

### NDT & Inspection Engineer (Intern)
**Trinity NDT Engineers** | *Bengaluru, India* | `Feb 2023 — May 2023`
* Performed Radiographic Testing (RT), UT, and Positive Material Identification (PMI) on 150+ aerospace propulsion components for GTRE (DRDO), ensuring airworthiness compliance and authoring inspection reports to AS/NAS quality standards.

---

## PROJECT EXPERIENCE

### AeroCore-S3 - Bare-Metal Custom Flight Controller - PCB to Flight
* Architected a full custom flight controller from schematic to airborne hardware: designed SPI bus topology for BMI270 IMU and BMP581 barometer at sub-10 MHz, resolving clock jitter and bus contention during firmware bringup.
* Wrote custom HAL interface mappings in ArduPilot for high-speed SPI sensor communication; validated EKF3 sensor fusion through a structured flight test matrix static hover (±1.2 m position hold), GPS-assisted loiter, and full autonomous waypoint execution confirming stable attitude estimation across all envelopes.
* Published complete flight logs, PCB schematics, and flight footage at github.com/yogesh031020/AeroCore-S3.

### Project TRINITY - Decentralized Multi-Agent Swarm Coordination Engine
* Developed a C++ boids algorithm swarm coordination library running inside isolated ROS 2 namespaces, enabling decentralized multi-agent path planning without a central broker or single point of failure.
* Integrated Eclipse Zenoh router for peer to peer telemetry synchronization, cutting active network overhead by 40% versus pure ROS 2 DDS validated by bandwidth and RTT profiling on Raspberry Pi 4 companion computers.
* Visualized real-time swarm state and collision avoidance boundaries in RViz2; full system validated in Gazebo Harmonic SITL before hardware integration.

### Autonomous Warehouse Quadcopter v2 - GPS-Denied Indoor Autonomy - FreeRTOS + IR Triangulation
* Deployed a dual-core FreeRTOS architecture on an ESP32-S3 companion computer: Core 0 handling A* pathfinding and IR triangulation; Core 1 managing MAVLink telemetry and ultrasonic obstacle avoidance achieving <40 ms full control loop latency.
* Implemented a 4-beacon TSOP38238 IR sensor array for dynamic spatial triangulation, achieving ±3cm docking precision for automated payload pickup in GPS-denied warehouse environments.
* Deployed a TensorFlow Lite Micro model onboard for human-obstacle classification, triggering MG90S servo safe-release failsafes on detection.

### Project ICARUS - HALE Airframe Design - CFD / FEA / ML Optimization
* Executed a closed-loop design iteration on a 3.0m High-Altitude Long-Endurance (HALE) UAV: aerodynamic shaping in OpenVSP, structural boundary certification in PrePoMax/CalculiX FEA, and low-speed regime validation via OpenFOAM CFD.
* Trained a PyTorch surrogate model on drag-weight trade surfaces across aspect ratio and spar geometry sweeps, achieving an 11.9% lift efficiency gain over the baseline all design decisions data-driven from CFD and FEA outputs.

---

## EDUCATION

### B.E. in Aeronautical Engineering
**SJC Institute of Technology (VTU)** | *Bengaluru, India* | `2019 — 2023`
* **Final Year Project:** Prototype Design & Analysis of a Valveless Pulsejet Engine - propulsion systems, combustion analysis, structural testing

---

## LANGUAGES
* **English** (Professional)
* **Hindi**
* **Kannada**
* **Tamil**
