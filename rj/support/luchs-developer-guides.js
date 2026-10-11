(function () {
  'use strict';
  // Prepared developer reading guides; sources are the existing public ROS archive.
  window.RJSupportCatalog.resources.push(...[
  {
    "id": "luchs-dev-ros2-quick-start",
    "productId": "luchs-a",
    "productIds": [
      "luchs-a",
      "luchs-b"
    ],
    "topicId": "sdk",
    "relatedTopicIds": [
      "examples"
    ],
    "audiences": [
      "developers"
    ],
    "modelIds": [],
    "seatIds": [],
    "type": "developer",
    "title": "ROS 2 installation and simulator quick start",
    "language": "en",
    "sourceLanguage": "en",
    "revision": "0.2",
    "editionLabel": "Developer preview guide",
    "publishedAt": "2026-10-11",
    "status": "published",
    "visibility": "public",
    "scope": "Luchs A and B development-preview software setup. Start with a software simulator; delivered-hardware support requires separate validation.",
    "displayStatus": "Development preview",
    "sourceSoftware": "1.1.0-preview.1",
    "sourceFiles": [
      "README.md",
      "luchs_bringup/launch/luchs_a.launch.py",
      "luchs_bringup/launch/luchs_b.launch.py"
    ],
    "content": [
      {
        "title": "Choose the software environment",
        "blocks": [
          {
            "type": "p",
            "text": "The GitHub development preview contains the shared C++ SDK, ROS 2 driver, messages, launch files and robot descriptions. ROS 1 is in the separate ros1 directory of the same repository. This guide builds only ROS 2."
          },
          {
            "type": "table",
            "headers": [
              "Environment",
              "Target combination"
            ],
            "rows": [
              [
                "ROS 2 Jazzy",
                "Ubuntu 24.04; check the version manual for validation status"
              ],
              [
                "ROS 2 Humble",
                "Ubuntu 22.04; check the version manual for validation status"
              ],
              [
                "ROS 1 Noetic",
                "Separate ros1 workspace; not included in the commands below"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Use Linux with the chosen ROS distribution, Git, rosdep and colcon installed. Initialise rosdep if required. This preview is not a formal vehicle-compatibility release."
          }
        ]
      },
      {
        "title": "Get the fixed preview and build ROS 2 only",
        "blocks": [
          {
            "type": "p",
            "text": "Use fresh paths for ~/luchs_preview and ~/luchs_ws/src/luchs_ros2; choose different names if those paths already contain your work. Clone the frozen preview release branch, then copy only ros2 into the workspace so colcon does not discover ROS 1 packages."
          },
          {
            "type": "code",
            "language": "bash",
            "text": "git clone --branch luchs-v1.1.0-preview.1 --depth 1 \\\n  https://github.com/erfinderwx/rj-platform-developer.git \\\n  ~/luchs_preview\nmkdir -p ~/luchs_ws/src\ncp -a ~/luchs_preview/ros2 ~/luchs_ws/src/luchs_ros2\nsource /opt/ros/jazzy/setup.bash\n# Use /opt/ros/humble/setup.bash on Humble.\ncd ~/luchs_ws\nrosdep install --from-paths src --ignore-src -y\ncolcon build --symlink-install\nsource install/setup.bash"
          },
          {
            "type": "p",
            "text": "A successful build should make luchs_bringup and luchs_driver visible to ROS. Source install/setup.bash in every terminal used below. If a package is missing, check the workspace layout and terminal environment."
          }
        ]
      },
      {
        "title": "Start a software simulator first",
        "blocks": [
          {
            "type": "p",
            "text": "Choose one command. dry_run:=true selects the built-in simulator instead of physical CAN. No chassis is needed. Keep the adapter disconnected for these examples."
          },
          {
            "type": "code",
            "language": "bash",
            "text": "ros2 launch luchs_bringup luchs_a.launch.py build:=4ws dry_run:=true\n# Or use the Luchs B draft-LCI simulator:\nros2 launch luchs_bringup luchs_b.launch.py protocol:=lci dry_run:=true"
          },
          {
            "type": "p",
            "text": "For another A build, replace 4ws with df, fa or da. In a second sourced terminal, inspect the node and reported state:"
          },
          {
            "type": "code",
            "language": "bash",
            "text": "ros2 node list\nros2 topic echo --once /luchs_driver/state\nros2 topic echo --once /diagnostics"
          },
          {
            "type": "note",
            "text": "A simulator run demonstrates software behaviour only. It does not establish LCI, IMU feedback, payload switching or other planned functions on a delivered B chassis. The default launch protocol is not evidence of installed firmware."
          }
        ]
      },
      {
        "title": "Read the development manual before commissioning",
        "blocks": [
          {
            "type": "p",
            "text": "The version development manual in docs/luchs-development-manual.md records the actual validation results, tests still required and conditions for a formal release. Read it at the same frozen preview release ref as the source."
          },
          {
            "type": "table",
            "headers": [
              "Validation area",
              "Required evidence before a formal compatibility claim"
            ],
            "rows": [
              [
                "Linux build and simulator",
                "ROS 2 Humble/Jazzy build, declared dependencies, launch and topic checks"
              ],
              [
                "B protocol and parameters",
                "Manufacturer confirmation of interface, geometry, bitrate/IDs, steering sign, current encoding and heartbeat behaviour"
              ],
              [
                "Delivered hardware",
                "Matching firmware/harness, measured feedback, control selection, stop and recovery verification on the identified unit"
              ]
            ]
          },
          {
            "type": "list",
            "items": [
              "Match the A build or B interface to the delivered unit; do not treat the software defaults as approved chassis parameters.",
              "For B, lci refers to the draft interface. Use legacy_b only after VCU V2.6 compatibility is confirmed for that unit; neither selection updates firmware.",
              "Confirm the adapter, harness and bitrate using the CAN guide and approved unit documentation before connecting.",
              "Complete the approved commissioning and emergency-stop checks before issuing physical motion commands."
            ]
          }
        ]
      }
    ],
    "assets": [
      {
        "kind": "file",
        "format": "PDF",
        "origin": "reference",
        "url": "./files/luchs/guides/Luchs_Developer_ros2_quick_start_EN_v0.2_20261011.pdf"
      }
    ],
    "sourceRefs": [
      {
        "title": "Public Luchs ROS 2 v1.1.0 archive - source files listed above",
        "url": "./files/luchs/shared/luchs_ros2_v1.1.0.zip"
      },
      {
        "title": "Source licence: Apache-2.0; TerraAgent Robotics",
        "url": "./files/luchs/guides/LICENSE.txt"
      },
      {
        "title": "Development preview ROS 2 source - frozen luchs-v1.1.0-preview.1 release snapshot",
        "url": "https://github.com/erfinderwx/rj-platform-developer/tree/luchs-v1.1.0-preview.1/ros2"
      },
      {
        "title": "Version development manual: tests, open confirmations and formal-release gates",
        "url": "https://github.com/erfinderwx/rj-platform-developer/blob/luchs-v1.1.0-preview.1/docs/luchs-development-manual.md"
      }
    ],
    "sourceRepository": {
      "url": "https://github.com/erfinderwx/rj-platform-developer",
      "ref": "luchs-v1.1.0-preview.1",
      "refType": "branch",
      "directory": "ros2"
    }
  },
  {
    "id": "luchs-dev-can-connection",
    "productId": "luchs-a",
    "productIds": [
      "luchs-a",
      "luchs-b"
    ],
    "topicId": "hardware",
    "relatedTopicIds": [
      "examples"
    ],
    "audiences": [
      "developers"
    ],
    "modelIds": [],
    "seatIds": [],
    "type": "developer",
    "title": "CAN connection and SocketCAN setup",
    "language": "en",
    "sourceLanguage": "en",
    "revision": "0.1",
    "editionLabel": "Developer guide",
    "publishedAt": "2026-10-11",
    "status": "published",
    "visibility": "public",
    "scope": "Luchs A connection reference and conditional B interface setup. Confirm the delivered harness before wiring.",
    "displayStatus": "Software reference",
    "sourceSoftware": "1.1.0",
    "sourceFiles": [
      "docs/can_setup.md",
      "luchs_bringup/scripts/setup_can.sh"
    ],
    "content": [
      {
        "title": "What this connection does",
        "blocks": [
          {
            "type": "p",
            "text": "CAN is the wired link between the computer and chassis. SocketCAN makes a supported Linux CAN adapter available as an interface such as can0. CAN carries commands and feedback; ROS sits above that connection."
          },
          {
            "type": "table",
            "headers": [
              "Chassis/interface",
              "Public source reference",
              "Required check"
            ],
            "rows": [
              [
                "Luchs A v1.1",
                "1 Mbit/s; standard 11-bit frames",
                "Delivered connector and firmware"
              ],
              [
                "B draft LCI",
                "Separate customer CAN; 1 Mbit/s",
                "LCI availability and released harness"
              ],
              [
                "B VCU V2.6 / legacy_b",
                "500 kbit/s is a source expectation",
                "Confirm bitrate and ID numbering on this unit"
              ]
            ]
          },
          {
            "type": "note",
            "text": "Do not apply the LCI setup to a VCU bus. The B connector and pinout remain unit-specific in the public source; request the matching harness information before connecting."
          }
        ]
      },
      {
        "title": "A signal expansion connector",
        "blocks": [
          {
            "type": "p",
            "text": "The public A source locates the signal expansion connector under the magnetic cover at the rear of the deck. Check the delivered cable against this reference:"
          },
          {
            "type": "table",
            "headers": [
              "Pin",
              "Wire colour",
              "Signal"
            ],
            "rows": [
              [
                "1",
                "Black",
                "RS-232 RX"
              ],
              [
                "2",
                "Brown",
                "RS-232 TX"
              ],
              [
                "3",
                "Red",
                "GND"
              ],
              [
                "4",
                "Orange",
                "CAN-H"
              ],
              [
                "5",
                "Yellow",
                "CAN-L"
              ],
              [
                "6",
                "Green",
                "RS-485 A"
              ],
              [
                "7",
                "Blue",
                "RS-485 B"
              ],
              [
                "8",
                "Grey",
                "GND"
              ],
              [
                "9",
                "White",
                "GND"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Use CAN-H, CAN-L and the signal ground for the CAN adapter. RS-232 and RS-485 are separate signals on the connector. The public source calls for 120 ohm termination at both ends; check the existing termination before enabling an adapter terminator."
          }
        ]
      },
      {
        "title": "Bring up a confirmed A interface",
        "blocks": [
          {
            "type": "steps",
            "items": [
              "Connect a Linux-supported USB-CAN adapter and inspect its interface name.",
              "With the vehicle secured against unintended movement, configure the confirmed A bus bitrate.",
              "Inspect interface status and listen for feedback before launching the driver."
            ]
          },
          {
            "type": "code",
            "text": "ip -br link\nsudo ip link set can0 down\nsudo ip link set can0 type can bitrate 1000000 restart-ms 100\nsudo ip link set can0 txqueuelen 1000\nsudo ip link set can0 up\nip -details -statistics link show can0\ncandump can0",
            "language": "bash"
          },
          {
            "type": "p",
            "text": "candump is supplied by the Linux can-utils package. The existing software archive also provides luchs_bringup/scripts/setup_can.sh; run it with sudo after reviewing the interface name and confirmed bitrate."
          },
          {
            "type": "p",
            "text": "A feedback references include 0x5B5 through 0x5BC. No traffic: check chassis power, adapter detection, CAN-H/L, ground, termination and bitrate. ERROR-PASSIVE or BUS-OFF indicates a bus problem; resolve it before sending commands."
          }
        ]
      },
      {
        "title": "B connection boundary",
        "blocks": [
          {
            "type": "p",
            "text": "LCI and legacy_b have different message layouts and different bitrate assumptions. Use passive capture and the unit documentation to identify the interface. Do not choose 500 kbit/s, 1 Mbit/s or a frame ID solely because it is a driver default."
          },
          {
            "type": "p",
            "text": "A parameter or harness change must be recorded with the unit and firmware version. This guide supplies no B pin assignment, firmware image or maintenance reset procedure."
          }
        ]
      }
    ],
    "assets": [
      {
        "kind": "file",
        "format": "PDF",
        "origin": "reference",
        "url": "./files/luchs/guides/Luchs_Developer_can_connection_EN_v0.1_20261011.pdf"
      }
    ],
    "sourceRefs": [
      {
        "title": "Public Luchs ROS 2 v1.1.0 archive - source files listed above",
        "url": "./files/luchs/shared/luchs_ros2_v1.1.0.zip"
      },
      {
        "title": "Source licence: Apache-2.0; TerraAgent Robotics",
        "url": "./files/luchs/guides/LICENSE.txt"
      }
    ]
  },
  {
    "id": "luchs-dev-ros-interfaces",
    "productId": "luchs-a",
    "productIds": [
      "luchs-a",
      "luchs-b"
    ],
    "topicId": "sdk",
    "relatedTopicIds": [
      "examples"
    ],
    "audiences": [
      "developers"
    ],
    "modelIds": [],
    "seatIds": [],
    "type": "developer",
    "title": "ROS topics, state and simulator examples",
    "language": "en",
    "sourceLanguage": "en",
    "revision": "0.1",
    "editionLabel": "Developer guide",
    "publishedAt": "2026-10-11",
    "status": "published",
    "visibility": "public",
    "scope": "Shared ROS 2 software interface; B-only services and feedback require the matching supported interface.",
    "displayStatus": "Software reference",
    "sourceSoftware": "1.1.0",
    "sourceFiles": [
      "README.md",
      "luchs_driver/README.md"
    ],
    "content": [
      {
        "title": "From a ROS message to the chassis",
        "blocks": [
          {
            "type": "p",
            "text": "Your application publishes a requested velocity. The driver converts that request to the selected chassis protocol and reports state back to ROS. The build and protocol parameters determine which hardware model and message layout it uses."
          },
          {
            "type": "table",
            "headers": [
              "ROS interface",
              "Purpose",
              "Scope"
            ],
            "rows": [
              [
                "cmd_vel",
                "geometry_msgs/Twist: forward, lateral and yaw-rate request",
                "linear.y is relevant to the A-4WS model"
              ],
              [
                "~/drive_command",
                "Explicit motion model and steering request",
                "Supported model depends on build"
              ],
              [
                "odom and TF",
                "Wheel-based motion estimate and transforms",
                "Not an independent localisation measurement"
              ],
              [
                "~/state and ~/safety",
                "Control state, limits and protection feedback",
                "Fields depend on protocol"
              ],
              [
                "battery_state and /diagnostics",
                "Battery feedback and software diagnostics",
                "Signal scaling must match firmware"
              ],
              [
                "imu/data_raw",
                "LCI raw acceleration and angular-rate feedback",
                "B draft LCI; no orientation output"
              ]
            ]
          },
          {
            "type": "p",
            "text": "The ~ prefix means the node-private namespace. With the default launch node name, ~/state is /luchs_driver/state. A namespace changes the full name; inspect the actual graph instead of assuming a fixed path."
          }
        ]
      },
      {
        "title": "Inspect a running simulator",
        "blocks": [
          {
            "type": "code",
            "text": "ros2 node list\nros2 topic list\nros2 topic echo --once /luchs_driver/state\nros2 topic echo --once /diagnostics\nros2 param dump /luchs_driver",
            "language": "bash"
          },
          {
            "type": "p",
            "text": "Use the quick-start guide to launch dry_run:=true first. State and diagnostics should update. If the node is absent, check the terminal log, workspace environment and build selection."
          }
        ]
      },
      {
        "title": "A software-only velocity example",
        "blocks": [
          {
            "type": "note",
            "text": "Run the next example only while the driver was launched with dry_run:=true and is disconnected from physical CAN. It is a simulator illustration, not a vehicle commissioning procedure."
          },
          {
            "type": "code",
            "text": "ros2 topic pub --rate 10 /cmd_vel geometry_msgs/msg/Twist \\\n  '{linear: {x: 0.1, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 0.0}}'",
            "language": "bash"
          },
          {
            "type": "p",
            "text": "The request is 0.1 m/s forward with zero yaw rate. Inspect /odom and /luchs_driver/state in another terminal. Stop the publisher with Ctrl-C; the source driver command watchdog default is 0.5 s. Do not treat that software timeout as a replacement for a physical emergency stop."
          }
        ]
      },
      {
        "title": "Parameters and B-only services",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Setting",
              "Use"
            ],
            "rows": [
              [
                "build / protocol.type",
                "Select the delivered model and communication interface"
              ],
              [
                "limits.*",
                "Software command limits; do not relabel them as vehicle specifications"
              ],
              [
                "control.cmd_timeout / feedback_timeout",
                "Source defaults are 0.5 s; retain conservative defaults during setup"
              ],
              [
                "odom.publish_tf",
                "Disable when a separate estimator owns odom -> base_footprint"
              ]
            ]
          },
          {
            "type": "p",
            "text": "The source lists reset_odometry and set_motion_model services, plus B estop and park requests. B payload-power and speed-limit services are LCI-dependent. Their presence in the API or simulator does not establish that the delivered chassis supports them."
          },
          {
            "type": "p",
            "text": "Keep A wheel-order/scaling parameters and B legacy interface settings with the confirmed unit configuration. The B interface guide explains the separate draft and VCU scopes."
          }
        ]
      }
    ],
    "assets": [
      {
        "kind": "file",
        "format": "PDF",
        "origin": "reference",
        "url": "./files/luchs/guides/Luchs_Developer_ros_interfaces_EN_v0.1_20261011.pdf"
      }
    ],
    "sourceRefs": [
      {
        "title": "Public Luchs ROS 2 v1.1.0 archive - source files listed above",
        "url": "./files/luchs/shared/luchs_ros2_v1.1.0.zip"
      },
      {
        "title": "Source licence: Apache-2.0; TerraAgent Robotics",
        "url": "./files/luchs/guides/LICENSE.txt"
      }
    ]
  },
  {
    "id": "luchs-dev-sensor-integration",
    "productId": "luchs-a",
    "productIds": [
      "luchs-a",
      "luchs-b"
    ],
    "topicId": "examples",
    "relatedTopicIds": [
      "sdk"
    ],
    "audiences": [
      "developers"
    ],
    "modelIds": [],
    "seatIds": [],
    "type": "developer",
    "title": "Sensor, odometry and navigation integration",
    "language": "en",
    "sourceLanguage": "en",
    "revision": "0.1",
    "editionLabel": "Developer guide",
    "publishedAt": "2026-10-11",
    "status": "published",
    "visibility": "public",
    "scope": "Software integration examples. Measure transforms, footprint and mounting geometry on the delivered configuration.",
    "displayStatus": "Software reference",
    "sourceSoftware": "1.1.0",
    "sourceFiles": [
      "docs/integration.md",
      "README.md",
      "luchs_description/README.md"
    ],
    "content": [
      {
        "title": "Assign each coordinate transform one owner",
        "blocks": [
          {
            "type": "p",
            "text": "The driver provides wheel odometry and, by default, odom -> base_footprint. The robot description connects the chassis links; a sensor needs its own measured transform to the mounting link."
          },
          {
            "type": "table",
            "headers": [
              "Connection",
              "Owner"
            ],
            "rows": [
              [
                "odom -> base_footprint",
                "Driver, or the chosen localisation estimator"
              ],
              [
                "base_footprint -> base_link and chassis links",
                "Robot description / robot_state_publisher"
              ],
              [
                "Chassis mounting link -> sensor link",
                "Your measured payload transform"
              ]
            ]
          },
          {
            "type": "p",
            "text": "If robot_localization or another estimator publishes the odometry transform, disable the driver copy using the launch publish_tf argument. Two publishers for the same transform produce an inconsistent tree."
          },
          {
            "type": "code",
            "text": "ros2 launch luchs_bringup luchs_a.launch.py \\\n  build:=4ws dry_run:=true publish_tf:=false",
            "language": "bash"
          }
        ]
      },
      {
        "title": "Describe a sensor mount",
        "blocks": [
          {
            "type": "p",
            "text": "The A model includes rail_left_link and rail_right_link. The source describes two deck rails 200 mm apart. Use the actual mount and measured lever arm; do not copy an example offset as a mechanical dimension."
          },
          {
            "type": "code",
            "text": "<joint name=\"sensor_mount\" type=\"fixed\">\n  <parent link=\"rail_left_link\"/>\n  <child link=\"sensor_link\"/>\n  <origin xyz=\"0.25 -0.10 0.08\" rpy=\"0 0 0\"/>\n</joint>\n<link name=\"sensor_link\"/>",
            "language": "xml"
          },
          {
            "type": "p",
            "text": "The numbers above are an illustrative source offset that must be replaced with measured values. Check mounting constraints and payload power in the approved hardware documentation before installation. B mounting details and models remain preliminary."
          }
        ]
      },
      {
        "title": "Fuse wheel odometry with external sensors",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Configure your estimator with the actual odometry and sensor topic names.",
              "Use a planar configuration for a ground vehicle and enable only measured channels.",
              "For skid-steer and Ackermann models, do not treat lateral velocity as an independent measurement.",
              "Draft LCI imu/data_raw supplies angular rate and acceleration without orientation; use it only if fitted and verified.",
              "An external GNSS/INS may accept wheel-speed input. Match units and measured lever arms to that sensor configuration."
            ]
          },
          {
            "type": "p",
            "text": "The public integration source contains robot_localization and GNSS/INS examples. They are configuration examples, not calibration results for your sensor or vehicle."
          }
        ]
      },
      {
        "title": "Prepare navigation geometry",
        "blocks": [
          {
            "type": "steps",
            "items": [
              "Measure the delivered robot footprint including the payload and protrusions.",
              "Choose a motion model matching the drivetrain: lateral commands for supported A-4WS, differential for skid-steer, or Ackermann for steering-axle builds.",
              "Set wheelbase, wheel radius and turning constraints from the confirmed unit configuration.",
              "Inspect the transform tree, odometry direction and sensor timing in simulation before a controlled hardware trial."
            ]
          },
          {
            "type": "note",
            "text": "The B public software source contains unresolved geometry and steering-range differences. Its envelope model and defaults are software references, not an approved B engineering model. B VCU odometry uses coarse speed feedback and commanded steering; account for that limitation in localisation."
          }
        ]
      }
    ],
    "assets": [
      {
        "kind": "file",
        "format": "PDF",
        "origin": "reference",
        "url": "./files/luchs/guides/Luchs_Developer_sensor_integration_EN_v0.1_20261011.pdf"
      }
    ],
    "sourceRefs": [
      {
        "title": "Public Luchs ROS 2 v1.1.0 archive - source files listed above",
        "url": "./files/luchs/shared/luchs_ros2_v1.1.0.zip"
      },
      {
        "title": "Source licence: Apache-2.0; TerraAgent Robotics",
        "url": "./files/luchs/guides/LICENSE.txt"
      }
    ]
  },
  {
    "id": "luchs-dev-connection-diagnostics",
    "productId": "luchs-a",
    "productIds": [
      "luchs-a",
      "luchs-b"
    ],
    "topicId": "examples",
    "relatedTopicIds": [
      "sdk"
    ],
    "audiences": [
      "developers"
    ],
    "modelIds": [],
    "seatIds": [],
    "type": "developer",
    "title": "Connection and driver troubleshooting",
    "language": "en",
    "sourceLanguage": "en",
    "revision": "0.1",
    "editionLabel": "Developer guide",
    "publishedAt": "2026-10-11",
    "status": "published",
    "visibility": "public",
    "scope": "Software and communication checks. Hardware repair, brake/steering calibration and missing fault-bit tables are outside this guide.",
    "displayStatus": "Software reference",
    "sourceSoftware": "1.1.0",
    "sourceFiles": [
      "docs/troubleshooting.md",
      "docs/can_setup.md",
      "luchs_driver/README.md"
    ],
    "content": [
      {
        "title": "Separate the layers before changing settings",
        "blocks": [
          {
            "type": "steps",
            "items": [
              "Confirm whether the session uses a simulator or physical CAN.",
              "Check Linux adapter detection and interface state.",
              "Confirm incoming feedback with a passive CAN capture.",
              "Inspect the ROS node, topics and diagnostics.",
              "Check the selected build/interface and only then review unit-specific parameters."
            ]
          },
          {
            "type": "code",
            "text": "ip -br link\nip -details -statistics link show can0\ncandump can0\nros2 node list\nros2 topic echo --once /diagnostics",
            "language": "bash"
          }
        ]
      },
      {
        "title": "Common symptoms",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Symptom",
              "Check next"
            ],
            "rows": [
              [
                "cannot open CAN interface",
                "Adapter present? Correct can0/can1 name? Interface UP?"
              ],
              [
                "No feedback",
                "Power, wiring, termination, confirmed bitrate and selected protocol"
              ],
              [
                "Feedback present, no motion",
                "Approved operating mode, emergency stop, software state and command topic"
              ],
              [
                "Stops after about 0.5 s",
                "Command publisher continuing? Source watchdog timeout? Do not mask the symptom by extending it first"
              ],
              [
                "command_limited",
                "Requested motion exceeds software limits or confirmed steering range"
              ],
              [
                "ERROR-PASSIVE / BUS-OFF",
                "Resolve wiring, termination or bitrate before sending commands"
              ],
              [
                "Unexpected wheel/lamp response on A",
                "Firmware-dependent ID and wheel-order mapping; stop and confirm the mapping"
              ],
              [
                "Implausible battery readings",
                "Raw value versus scaling and approved unit readings"
              ],
              [
                "Yaw drift",
                "Wheel-odometry limitation; inspect sensor fusion and measured transforms"
              ]
            ]
          }
        ]
      },
      {
        "title": "Keep B interfaces separate",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Interface",
              "Interpretation"
            ],
            "rows": [
              [
                "legacy_b / VCU V2.6",
                "Confirm frame ID radix, bitrate and steering sign; odometry feedback is coarse"
              ],
              [
                "Draft LCI",
                "Heartbeat, checksum, live-limit and IMU diagnostics describe the design/simulator until firmware is confirmed"
              ]
            ]
          },
          {
            "type": "note",
            "text": "Do not apply a draft-LCI maintenance reset to a VCU unit or assume a software estop service clears a physical fault. Use the approved operating procedure or contact support for a matching recovery procedure."
          },
          {
            "type": "p",
            "text": "A VCU fault category is not the LCI severity level. This guide supplies no missing motor, EPS, EPB or BMS fault-bit definitions."
          }
        ]
      },
      {
        "title": "Collect a useful support record",
        "blocks": [
          {
            "type": "p",
            "text": "Record the chassis build, interface, firmware identification if available, adapter/bitrate, software v1.1.0, exact symptom and timestamp. Save the driver log and a short passive capture."
          },
          {
            "type": "code",
            "text": "ros2 topic echo --once /diagnostics\nros2 param dump /luchs_driver > luchs_driver_params.yaml\ncandump -l can0\n# Stop the capture with Ctrl-C after about 10 seconds.",
            "language": "bash"
          },
          {
            "type": "p",
            "text": "Review logs for your own project information before sharing them with support. Include raw and scaled values when reporting a decoding problem. This website update did not perform a hardware repair or a real-vehicle validation."
          }
        ]
      }
    ],
    "assets": [
      {
        "kind": "file",
        "format": "PDF",
        "origin": "reference",
        "url": "./files/luchs/guides/Luchs_Developer_connection_diagnostics_EN_v0.1_20261011.pdf"
      }
    ],
    "sourceRefs": [
      {
        "title": "Public Luchs ROS 2 v1.1.0 archive - source files listed above",
        "url": "./files/luchs/shared/luchs_ros2_v1.1.0.zip"
      },
      {
        "title": "Source licence: Apache-2.0; TerraAgent Robotics",
        "url": "./files/luchs/guides/LICENSE.txt"
      }
    ]
  },
  {
    "id": "luchs-dev-a-protocol-reading",
    "productId": "luchs-a",
    "topicId": "protocols",
    "relatedTopicIds": [
      "sdk"
    ],
    "audiences": [
      "developers"
    ],
    "modelIds": [],
    "seatIds": [],
    "type": "developer",
    "title": "Luchs A protocol reading and decoding examples",
    "language": "en",
    "sourceLanguage": "en",
    "revision": "0.1",
    "editionLabel": "Developer guide",
    "publishedAt": "2026-10-11",
    "status": "published",
    "visibility": "public",
    "scope": "Luchs A v1.1 software reference. Wheel commands, signal order and scaling must match the delivered firmware.",
    "displayStatus": "Software reference",
    "sourceSoftware": "1.1.0",
    "sourceFiles": [
      "docs/protocol_luchs_a.md",
      "dbc/luchs_a_can_v1.1.dbc",
      "luchs_driver/README.md"
    ],
    "content": [
      {
        "title": "What a protocol reference tells you",
        "blocks": [
          {
            "type": "p",
            "text": "A protocol reference is the dictionary used to interpret CAN messages. The frame ID identifies the message; byte positions identify the signal; type, byte order, scale and offset turn bytes into physical values. It is not a firmware image."
          },
          {
            "type": "table",
            "headers": [
              "Field",
              "Meaning"
            ],
            "rows": [
              [
                "Frame ID",
                "Which command or feedback message this is"
              ],
              [
                "Signal location",
                "Bytes or bits containing the value"
              ],
              [
                "Signedness and byte order",
                "How the raw integer is read"
              ],
              [
                "Scale and offset",
                "How a raw value becomes m/s, rad/s, angle or another unit"
              ],
              [
                "Direction and period",
                "Who sends the message and how often"
              ]
            ]
          },
          {
            "type": "p",
            "text": "For the A v1.1 reference, the source specifies standard 11-bit CAN frames, DLC 8, 1 Mbit/s and big-endian multi-byte values. A DBC is a machine-readable form of this dictionary."
          }
        ]
      },
      {
        "title": "Find the main messages",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "ID",
              "Direction",
              "What it carries"
            ],
            "rows": [
              [
                "0x5A0",
                "Host to chassis",
                "Requested body velocity, yaw rate, motion model and control mode"
              ],
              [
                "0x5A1",
                "Host to chassis",
                "Gear and axle-angle request"
              ],
              [
                "0x5A2 / 0x5A3",
                "Host to chassis",
                "4WS wheel commands or lamps; assignment depends on firmware"
              ],
              [
                "0x5B5 / 0x5B6",
                "Chassis to host",
                "Motion and gear/axle feedback"
              ],
              [
                "0x5B7 / 0x5B9",
                "Chassis to host",
                "Wheel angles and speeds; verify ordering/scales"
              ],
              [
                "0x5B8",
                "Chassis to host",
                "Protection state, a fault-code byte and ultrasonic readings"
              ],
              [
                "0x5BA / 0x5BB / 0x5BC",
                "Chassis to host",
                "Fault words, battery and lamp feedback"
              ]
            ]
          }
        ]
      },
      {
        "title": "Decode a value without sending a command",
        "blocks": [
          {
            "type": "p",
            "text": "The source defines the forward-velocity field of 0x5A0 as a signed 16-bit value in bytes 0-1, with factor 0.001 m/s and zero offset. This arithmetic example is for reading a capture:"
          },
          {
            "type": "table",
            "headers": [
              "Captured bytes",
              "Raw signed value",
              "Physical value"
            ],
            "rows": [
              [
                "00 64",
                "100",
                "100 x 0.001 = 0.100 m/s"
              ],
              [
                "FF 9C",
                "-100",
                "-100 x 0.001 = -0.100 m/s"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Do not apply that factor to wheel speed, battery or an unrelated frame. Each signal needs its own definition. Use a decoder loaded with the matching DBC and compare raw values with the driver output."
          },
          {
            "type": "code",
            "text": "luchs_cli monitor -i can0 --raw",
            "language": "bash"
          },
          {
            "type": "p",
            "text": "The CLI is part of the source C++ SDK and must be built before use. This monitor command is passive; it is not a drive command."
          }
        ]
      },
      {
        "title": "Keep firmware-dependent settings explicit",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Parameter group",
              "Why confirmation matters"
            ],
            "rows": [
              [
                "wheel_steer_cmd_id",
                "The 0x5A2 / 0x5A3 wheel/lamp assignment can differ"
              ],
              [
                "wheel_steer_cmd_order / wheel_steer_fb_order",
                "A correct angle in the wrong slot reaches the wrong wheel"
              ],
              [
                "wheel_speed_fb_order / wheel_speed_scale",
                "Ordering and units affect odometry"
              ],
              [
                "ultrasonic_scale / battery_*_scale",
                "An assumed scale can produce plausible but incorrect readings"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Store confirmed settings with the unit and firmware revision. Use the source protocol sheet and DBC as references; commissioning is a controlled hardware task, not a requirement to follow an unverified motion example on this page."
          },
          {
            "type": "note",
            "text": "This guide adds explanations and passive decoding examples. It does not alter the existing A protocol files, resolve firmware questions or provide service calibration."
          }
        ]
      }
    ],
    "assets": [
      {
        "kind": "file",
        "format": "PDF",
        "origin": "reference",
        "url": "./files/luchs/guides/Luchs_Developer_a_protocol_reading_EN_v0.1_20261011.pdf"
      }
    ],
    "sourceRefs": [
      {
        "title": "Public Luchs ROS 2 v1.1.0 archive - source files listed above",
        "url": "./files/luchs/shared/luchs_ros2_v1.1.0.zip"
      },
      {
        "title": "Source licence: Apache-2.0; TerraAgent Robotics",
        "url": "./files/luchs/guides/LICENSE.txt"
      }
    ]
  },
  {
    "id": "luchs-dev-b-interface-reading",
    "productId": "luchs-b",
    "topicId": "protocols",
    "relatedTopicIds": [
      "sdk"
    ],
    "audiences": [
      "developers"
    ],
    "modelIds": [],
    "seatIds": [],
    "type": "developer",
    "title": "Luchs B interfaces: VCU reference and draft LCI",
    "language": "en",
    "sourceLanguage": "en",
    "revision": "0.1",
    "editionLabel": "Developer guide",
    "publishedAt": "2026-10-11",
    "status": "published",
    "visibility": "public",
    "scope": "Separate B VCU V2.6 and draft LCI software references. Confirm the delivered interface before connecting.",
    "displayStatus": "Draft interface reference",
    "sourceSoftware": "1.1.0",
    "sourceFiles": [
      "docs/protocol_luchs_b.md",
      "dbc/luchs_b_vcu_v2.6.dbc",
      "dbc/luchs_lci_v1.0_draft_r3.dbc"
    ],
    "content": [
      {
        "title": "Choose by the delivered interface, not the default",
        "blocks": [
          {
            "type": "p",
            "text": "The software package contains two different B codecs. legacy_b targets the VCU upper interface V2.6. lci targets the LCI v1.0 draft design. The default B launch selects lci; a default is not evidence that a chassis has LCI firmware."
          },
          {
            "type": "table",
            "headers": [
              "Property",
              "VCU V2.6 / legacy_b",
              "LCI v1.0 draft"
            ],
            "rows": [
              [
                "Status",
                "Unit-specific VCU reference",
                "Firmware design / simulator reference"
              ],
              [
                "Byte order",
                "Little-endian",
                "Big-endian"
              ],
              [
                "Command level",
                "Accelerator/brake and steering; host speed loop",
                "Body-motion/axle requests; design closes loops in chassis"
              ],
              [
                "Bitrate",
                "500 kbit/s expected, to confirm",
                "Draft specifies 1 Mbit/s on customer CAN"
              ],
              [
                "Feedback",
                "Coarse speed, gear, battery and fault categories",
                "Design includes motion, live limits, IMU and extended state"
              ]
            ]
          },
          {
            "type": "note",
            "text": "LCI heartbeat stops, maintenance recovery, IMU, payload switching and live derating are conditional design features. A simulator demonstration does not confirm them on delivered hardware. This guide publishes no new firmware or reviewed B spreadsheet."
          }
        ]
      },
      {
        "title": "Read the VCU reference with its open assumptions",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Source reference",
              "Meaning",
              "Boundary"
            ],
            "rows": [
              [
                "0x701 UpperCmd",
                "Host accelerator/brake, steering and control request",
                "The supplied sheet writes 701; confirm the numeric radix"
              ],
              [
                "0x703 VCU2Upper",
                "Battery, gear, mode, coarse speed and fault category",
                "Confirm the actual ID on the unit"
              ],
              [
                "Fault category 0 / 1 / 2 / 3",
                "None / motor controller / BMS / several",
                "Not LCI severity and not a detailed fault-bit table"
              ]
            ]
          },
          {
            "type": "p",
            "text": "The public driver source identifies steering sign, current offset, frame numbering and bitrate as items to confirm. Do not convert a software default into a verified vehicle specification."
          },
          {
            "type": "p",
            "text": "VCU odometry uses speed in 1 km/h steps and the commanded steering angle. It is a coarse software estimate; do not treat it as precision localisation feedback."
          }
        ]
      },
      {
        "title": "Understand the LCI draft without deploying it",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Draft ID",
              "Design purpose"
            ],
            "rows": [
              [
                "0x5A0 / 0x5A1",
                "Body-motion and steering requests"
              ],
              [
                "0x5A5",
                "Host heartbeat, alive counter, requests and checksum"
              ],
              [
                "0x5B0 / 0x5BD",
                "Live limits and chassis state"
              ],
              [
                "0x5BE / 0x5BF",
                "Raw IMU rates and version/model identification"
              ]
            ]
          },
          {
            "type": "p",
            "text": "The draft defines a 20 ms heartbeat and 200 ms timeout, with a counter and checksum. These are draft protocol requirements, not measured stopping performance or proof of an installed feature."
          },
          {
            "type": "p",
            "text": "Do not merge a little-endian VCU field into the big-endian LCI decoder. Match the DBC, codec and firmware as a set. LCI fault levels describe severity; VCU categories identify broad fault sources."
          }
        ]
      },
      {
        "title": "A software-only comparison",
        "blocks": [
          {
            "type": "p",
            "text": "Choose one command to explore the packaged simulator. Both keep dry_run:=true:"
          },
          {
            "type": "code",
            "text": "ros2 launch luchs_bringup luchs_b.launch.py \\\n  protocol:=lci dry_run:=true\n# Or inspect the legacy interface simulator:\nros2 launch luchs_bringup luchs_b.launch.py \\\n  protocol:=legacy_b dry_run:=true",
            "language": "bash"
          },
          {
            "type": "p",
            "text": "Record the software configuration and observe the reported state. For physical hardware, first obtain confirmed interface, harness, bitrate, identifier radix and steering-sign information for that unit."
          },
          {
            "type": "note",
            "text": "B geometry, steering range and loaded wheel radius remain unresolved in the public source. This guide offers a way to read that source, not a new approved datasheet, B engineering model or maintenance procedure."
          }
        ]
      }
    ],
    "assets": [
      {
        "kind": "file",
        "format": "PDF",
        "origin": "reference",
        "url": "./files/luchs/guides/Luchs_Developer_b_interface_reading_EN_v0.1_20261011.pdf"
      }
    ],
    "sourceRefs": [
      {
        "title": "Public Luchs ROS 2 v1.1.0 archive - source files listed above",
        "url": "./files/luchs/shared/luchs_ros2_v1.1.0.zip"
      },
      {
        "title": "Source licence: Apache-2.0; TerraAgent Robotics",
        "url": "./files/luchs/guides/LICENSE.txt"
      }
    ]
  }
]);
})();
