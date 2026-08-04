(() => {
  const STORAGE_KEY = "xwTechLang";
  const LANGS = ["zh", "en", "de"];

  const tr = (zh, en, de) => ({ zh, en, de });

  const pages = {
    landing: {
      title: tr("XW Tech · 文档访问", "XW Tech · Document Access", "XW Tech · Dokumentzugang"),
      html: {
        "h1": tr("文档访问", "Document Access", "Dokumentzugang"),
        "main > p": tr(
          "请打开联系人提供给您的专属文档链接。",
          "Please open the direct document link provided by your contact.",
          "Bitte öffnen Sie den direkten Dokumentlink, den Sie von Ihrem Ansprechpartner erhalten haben."
        ),
        ".note": tr(
          "本页面不提供文档目录或其他项目入口。",
          "This page does not provide a document directory or links to other projects.",
          "Diese Seite enthält kein Dokumentverzeichnis und keine Links zu anderen Projekten."
        )
      }
    },

    erc: {
      title: tr("ERC 机器人知识库", "ERC Robot Knowledge Library", "ERC Roboter-Wissensbibliothek"),
      html: {
        "header": tr(
          "ERC · 知识库",
          "ERC · Knowledge Library",
          "ERC · Wissensbibliothek"
        ),
        ".eyebrow": tr("客户资料", "Customer documentation", "Kundendokumentation"),
        "h1": tr("ERC 机器人知识库", "ERC Robot Knowledge Library", "ERC Roboter-Wissensbibliothek"),
        ".lead": tr(
          "按机器人品牌查看操作指南、维修说明和客户资料。",
          "Browse operating guides, service instructions and customer documents by robot brand.",
          "Betriebsanleitungen, Servicehinweise und Kundendokumente nach Robotermarke."
        ),
        ".pudu p": tr(
          "普渡机器人 · 配送与服务机器人资料",
          "Delivery and service robot documentation",
          "Dokumentation für Liefer- und Serviceroboter"
        ),
        ".pudu .status": tr("已有 2 份资料 →", "2 documents available →", "2 Dokumente verfügbar →"),
        ".card:not(.pudu):not(.orion) p": tr(
          "商用清洁机器人资料",
          "Commercial cleaning robot documentation",
          "Dokumentation für gewerbliche Reinigungsroboter"
        ),
        ".card:not(.pudu):not(.orion) .status": tr("资料准备中 →", "Documents in preparation →", "Dokumente in Vorbereitung →"),
        ".orion p": tr(
          "猎户星空 · 智能服务机器人资料",
          "Intelligent service robot documentation",
          "Dokumentation für intelligente Serviceroboter"
        ),
        ".orion .status": tr("资料准备中 →", "Documents in preparation →", "Dokumente in Vorbereitung →"),
        "footer": tr(
          "仅供获得直接访问链接的客户使用。",
          "For customers who have received a direct access link.",
          "Für Kunden, die einen direkten Zugangslink erhalten haben."
        )
      }
    },

    pudu: {
      title: tr("PUDU Robotics · ERC 文档", "PUDU Robotics · ERC Documentation", "PUDU Robotics · ERC-Dokumentation"),
      html: {
        "header": tr(
          "PUDU · ERC",
          "PUDU · ERC",
          "PUDU · ERC"
        ),
        "h1": tr("普渡机器人文档", "PUDU Robotics Documentation", "PUDU-Robotics-Dokumentation"),
        ".lead": tr(
          "客户诊断、维修配置和交付资料按用途集中整理。",
          "Customer diagnostics, service configuration and delivery documents organized by purpose.",
          "Kundendiagnose, Servicekonfiguration und Übergabedokumente nach Verwendungszweck geordnet."
        ),
        "#diagnostics .section-kicker": tr("客户诊断", "Customer Diagnostics", "Kundendiagnose"),
        "#diagnostics h2": tr("客户诊断", "Customer Diagnostics", "Kundendiagnose"),
        "#diagnostics .section-copy": tr(
          "面向现场人员的安全自检流程，用于收集故障信息并完成首轮排查。",
          "Safe self-checks for on-site staff to collect fault information and complete the first diagnostic pass.",
          "Sichere Selbstprüfungen für das Personal vor Ort zur Fehleraufnahme und ersten Eingrenzung."
        ),
        ".diagnostic-guide .tag": tr(
          "CC1 Pro · 客户自检 · 图文",
          "CC1 Pro · Customer Check · Images",
          "CC1 Pro · Kundenprüfung · Bilder"
        ),
        ".diagnostic-guide h3": tr(
          "不吸污水与“清洁过滤器”排查",
          "No Wastewater Pickup and “Clean Filter” Check",
          "Kein Schmutzwasser aufgenommen / „Filter reinigen“"
        ),
        ".diagnostic-guide > div > p": tr(
          "检查滤水盒、过滤海绵、污水箱盖、吸水扒、吸污管和吸力，并整理需要反馈的照片与视频。",
          "Check the filter box, filter sponge, wastewater-tank lid, squeegee, suction hose and suction, then collect the required photos and videos.",
          "Filterbox, Filterschwamm, Tankdeckel, Saugleiste, Saugschlauch und Saugkraft prüfen und die benötigten Fotos und Videos zusammenstellen."
        ),
        "#service .section-kicker": tr("维修与配置", "Service & Configuration", "Service & Konfiguration"),
        "#service h2": tr("维修与配置", "Service & Configuration", "Service & Konfiguration"),
        "#service .section-copy": tr(
          "面向获得授权的维修人员，包含部件更换、参数配置和操作验证。",
          "For authorized service personnel, covering component replacement, parameter configuration and operational verification.",
          "Für autorisiertes Servicepersonal: Bauteiltausch, Parameterkonfiguration und Funktionsprüfung."
        ),
        ".service-guide .tag": tr(
          "BellaBot · 维修配置 · 图文 + 视频",
          "BellaBot · Service Configuration · Images + Video",
          "BellaBot · Servicekonfiguration · Bilder + Video"
        ),
        ".service-guide h3": tr(
          "底盘轮毂电机更换与配置说明",
          "Chassis Hub Motor Replacement and Configuration",
          "Austausch und Konfiguration des Radnabenmotors"
        ),
        ".service-guide > div > p": tr(
          "电机更换视频、motorVersion 字段选择、两个系统配置入口及重启后验证。",
          "Motor replacement video, motorVersion selection, two configuration paths and post-restart verification.",
          "Video zum Motortausch, Auswahl von motorVersion, zwei Konfigurationswege und Prüfung nach dem Neustart."
        ),
        "#documents .section-kicker": tr("客户资料", "Customer Documents", "Kundendokumente"),
        "#documents h2": tr("客户资料", "Customer Documents", "Kundendokumente"),
        "#documents .section-copy": tr(
          "用于集中放置说明书、PDF 和其他客户交付材料。",
          "A central location for manuals, PDF files and other customer delivery materials.",
          "Zentraler Bereich für Handbücher, PDF-Dateien und weitere Übergabeunterlagen."
        ),
        ".empty": tr(
          "说明书、PDF 与其他交付资料将在这里发布。",
          "Manuals, PDF files and other customer documents will be published here.",
          "Handbücher, PDF-Dateien und weitere Kundendokumente werden hier veröffentlicht."
        ),
        "footer": tr(
          "所有内容按“客户诊断 / 维修与配置 / 客户资料”分类。具体页面请使用对应的直接链接分享。",
          "All content is classified as Customer Diagnostics, Service & Configuration, or Customer Documents. Share the relevant direct page link.",
          "Alle Inhalte sind als Kundendiagnose, Service & Konfiguration oder Kundendokumente gegliedert. Teilen Sie jeweils den direkten Seitenlink."
        )
      },
      groups: {
        ".summary span": {
          zh: ["份已发布资料", "个产品型号", "种页面语言"],
          en: ["published documents", "product models", "page languages"],
          de: ["veröffentlichte Dokumente", "Produktmodelle", "Seitensprachen"]
        },
        ".diagnostic-guide .meta span": {
          zh: ["CC1 Pro", "7 个步骤", "中文 / EN / DE", "手机友好"],
          en: ["CC1 Pro", "7 steps", "中文 / EN / DE", "Mobile friendly"],
          de: ["CC1 Pro", "7 Schritte", "中文 / EN / DE", "Mobil optimiert"]
        },
        ".service-guide .meta span": {
          zh: ["BellaBot", "字段 13", "中文 / EN / DE", "视频 4:09"],
          en: ["BellaBot", "Field 13", "中文 / EN / DE", "Video 4:09"],
          de: ["BellaBot", "Feld 13", "中文 / EN / DE", "Video 4:09"]
        }
      }
    },

    cenobots: {
      title: tr("CenoBots · ERC 文档", "CenoBots · ERC Documentation", "CenoBots · ERC-Dokumentation"),
      html: {
        "h1": tr("客户文档", "Customer Documentation", "Kundendokumentation"),
        "main > p": tr(
          "商用清洁机器人操作指南与资料。",
          "Operating guides and documents for commercial cleaning robots.",
          "Bedienungsanleitungen und Dokumente für gewerbliche Reinigungsroboter."
        ),
        ".empty": tr("资料准备中。", "Documents in preparation.", "Dokumente in Vorbereitung.")
      }
    },

    orionstar: {
      title: tr("OrionStar 猎户星空 · ERC 文档", "OrionStar · ERC Documentation", "OrionStar · ERC-Dokumentation"),
      html: {
        "h1": tr("客户文档", "Customer Documentation", "Kundendokumentation"),
        "main > p": tr(
          "智能服务机器人操作指南与资料。",
          "Operating guides and documents for intelligent service robots.",
          "Bedienungsanleitungen und Dokumente für intelligente Serviceroboter."
        ),
        ".empty": tr("资料准备中。", "Documents in preparation.", "Dokumente in Vorbereitung.")
      }
    },

    bellabot: {
      title: tr(
        "BellaBot 底盘轮毂电机更换与配置说明",
        "BellaBot Chassis Hub Motor Replacement and Configuration",
        "BellaBot Radnabenmotor – Austausch und Konfiguration"
      ),
      html: {
        ".brand span:last-child": tr(
          "BellaBot 电机更换说明",
          "BellaBot Motor Guide",
          "BellaBot Motoranleitung"
        ),
        ".top-actions a[href='#video']": tr("拆装视频", "Video", "Video"),
        ".top-actions a[href='#identify']": tr("电机识别", "Identify motor", "Motor erkennen"),
        ".top-actions a[href='#route-one']": tr("入口一", "Path 1", "Weg 1"),
        ".top-actions a[href='#route-two']": tr("入口二", "Path 2", "Weg 2"),
        ".print-button": tr("打印 / 保存 PDF", "Print / Save PDF", "Drucken / PDF speichern"),

        ".hero .eyebrow": tr("BELLA BOT · 维修作业指导", "BELLA BOT · SERVICE GUIDE", "BELLA BOT · SERVICEANLEITUNG"),
        ".hero h1": tr(
          "底盘轮毂电机更换与系统配置说明",
          "Chassis Hub Motor Replacement and System Configuration",
          "Austausch des Radnabenmotors und Systemkonfiguration"
        ),
        ".hero p": tr(
          "更换轮毂电机后，必须根据新电机的备件号，在机器人系统中正确修改 <strong>字段 13：motorVersion</strong>。本文提供两个修改入口及带点击标注的界面截图。",
          "After replacing a hub motor, set <strong>Field 13: motorVersion</strong> according to the spare-part number of the newly installed motor. This guide explains two configuration paths with annotated screenshots.",
          "Nach dem Austausch eines Radnabenmotors muss <strong>Feld 13: motorVersion</strong> anhand der Ersatzteilnummer des neu eingebauten Motors eingestellt werden. Diese Anleitung zeigt zwei Konfigurationswege mit markierten Screenshots."
        ),
        ".restart-alert strong": tr(
          "保存后必须重启机器人",
          "Restart the robot after saving",
          "Roboter nach dem Speichern neu starten"
        ),
        ".restart-alert p": tr(
          "字段修改并保存后不会立即生效。必须重启设备，新的电机配置才会生效。",
          "The saved field change does not take effect immediately. Restart the device to activate the new motor configuration.",
          "Die gespeicherte Feldänderung wird nicht sofort wirksam. Starten Sie das Gerät neu, damit die neue Motorkonfiguration aktiviert wird."
        ),

        "#overview > h2": tr("操作总览", "Procedure Overview", "Ablaufübersicht"),
        "#overview > .lead": tr(
          "先完成机械更换，再按备件号识别电机，最后从任一系统入口修改字段、保存并重启。",
          "Complete the mechanical replacement, identify the motor by spare-part number, then use either system path to change the field, save and restart.",
          "Führen Sie zuerst den mechanischen Austausch durch, identifizieren Sie den Motor anhand der Ersatzteilnummer und ändern Sie anschließend über einen der beiden Systemwege das Feld. Danach speichern und neu starten."
        ),
        "#overview .info-card:first-of-type h3": tr("机械更换", "Mechanical replacement", "Mechanischer Austausch"),
        "#overview .info-card:first-of-type p": tr(
          "轮毂电机的拆卸和安装，请按照普渡学院官方底盘拆装视频操作。",
          "For hub motor removal and installation, follow the official chassis service video from PUDU Academy.",
          "Befolgen Sie für Ausbau und Montage des Radnabenmotors das offizielle Chassis-Servicevideo der PUDU Academy."
        ),
        "#overview .official-link": tr(
          "打开底盘拆装视频 ↗",
          "Open chassis service video ↗",
          "Chassis-Servicevideo öffnen ↗"
        ),
        "#overview .info-card:nth-of-type(2) h3": tr("开机前检查", "Checks before power-on", "Prüfung vor dem Einschalten"),
        "#overview .video-copy h3": tr(
          "BellaBot 底盘电机拆装视频",
          "BellaBot Chassis Motor Replacement Video",
          "BellaBot Video zum Austausch des Chassismotors"
        ),
        "#overview .video-copy p": tr(
          "先观看完整视频，再进行电机拆装；操作过程中可暂停或拖动进度。",
          "Watch the complete video before starting. You can pause or seek during the procedure.",
          "Sehen Sie das vollständige Video vor Arbeitsbeginn an. Während der Arbeit können Sie pausieren oder vorspulen."
        ),
        "#overview .offline-badge": tr("独立视频文件", "Separate video file", "Separate Videodatei"),

        "#identify > h2": tr("先用备件号识别电机", "Identify the Motor by Part Number", "Motor anhand der Teilenummer erkennen"),
        "#identify > .lead": tr(
          "两种电机均为 6.5 寸，不能只看轮毂尺寸。请以新电机的备件标签、包装标签或领用记录为准。",
          "Both motors are 6.5-inch models, so wheel size alone is not sufficient. Use the new motor label, packaging label or issue record.",
          "Beide Motoren sind 6,5-Zoll-Modelle; die Radgröße allein reicht daher nicht aus. Verwenden Sie das Typenschild des neuen Motors, das Verpackungsetikett oder den Ausgabebeleg."
        ),
        "#identify .part-number-heading": tr("备件号", "Part number", "Ersatzteilnummer"),
        "#identify .motor-type-heading": tr("电机类型", "Motor type", "Motortyp"),
        "#identify .config-field-heading": tr("配置字段", "Configuration field", "Konfigurationsfeld"),
        "#identify .config-value-heading": tr("填写值", "Value", "Wert"),
        "#identify .maxwell-name": tr(
          "Maxwell 电机（M 电机）",
          "Maxwell motor (M motor)",
          "Maxwell-Motor (M-Motor)"
        ),
        "#identify .zhongling-name": tr(
          "6.5 寸中菱轮毂电机",
          "6.5-inch Zhongling hub motor",
          "6,5-Zoll-Radnabenmotor von Zhongling"
        ),
        "#identify .field-note": tr(
          "<strong>字段说明：</strong><code>motorVersion</code> 是 Machine Info 中的第 13 个字段，用于配置机器人底盘当前安装的驱动轮毂电机类型。更换电机后，必须按新电机备件号填写对应值。",
          "<strong>Field description:</strong> <code>motorVersion</code> is Field 13 in Machine Info. It specifies the drive hub motor type currently installed on the robot chassis. After replacing a motor, enter the value that corresponds to the new motor's part number.",
          "<strong>Feldbeschreibung:</strong> <code>motorVersion</code> ist Feld 13 in Machine Info. Es legt den Typ des aktuell am Roboterchassis eingebauten Radnaben-Antriebsmotors fest. Nach dem Motortausch muss der zur Ersatzteilnummer des neuen Motors gehörende Wert eingetragen werden."
        ),
        "#identify .selection-note": tr(
          "<strong>选择原则：</strong>以新安装电机的备件号为准；不要参考旧电机型号，也不要直接沿用系统原有字段值。",
          "<strong>Selection rule:</strong> Use the part number of the newly installed motor. Do not use the old motor type or retain the previous field value.",
          "<strong>Auswahlregel:</strong> Maßgeblich ist die Ersatzteilnummer des neu eingebauten Motors. Verwenden Sie weder den alten Motortyp noch den bisherigen Feldwert als Referenz."
        ),

        "#route-one > .route-badge": tr("入口一 · Debug → Hardware", "Path 1 · Debug → Hardware", "Weg 1 · Debug → Hardware"),
        "#route-one > h2": tr("通过 Hardware 修改", "Configure via Hardware", "Über Hardware konfigurieren"),

        "#route-two > .route-badge": tr(
          "入口二 · Debug → RunToMappingTool",
          "Path 2 · Debug → RunToMappingTool",
          "Weg 2 · Debug → RunToMappingTool"
        ),
        "#route-two > h2": tr("通过建图工具修改", "Configure via Mapping Tool", "Über das Mapping-Tool konfigurieren"),

        "#restart > h2": tr("保存、重启与检查", "Save, Restart and Verify", "Speichern, neu starten und prüfen"),
        "#restart > .lead": tr(
          "无论使用哪一个入口，最后都必须完成保存和重启。",
          "Whichever path you use, always save and restart at the end.",
          "Unabhängig vom verwendeten Weg müssen Sie am Ende speichern und neu starten."
        ),
        "#restart > h3:nth-of-type(1)": tr("重启后的确认项目", "Checks after restart", "Prüfungen nach dem Neustart"),
        "#restart > h3:nth-of-type(2)": tr("异常时优先检查", "If problems occur, check first", "Bei Problemen zuerst prüfen"),
        "#restart .internal-note": tr(
          "本说明包含维修配置内容，请仅向获得授权的人员提供。",
          "This guide contains service configuration information. Share it only with authorized personnel.",
          "Diese Anleitung enthält Service-Konfigurationsdaten. Geben Sie sie nur an autorisierte Personen weiter."
        ),
        "body > footer": tr(
          "BellaBot 底盘轮毂电机更换与配置说明 · 核心字段：13 / motorVersion",
          "BellaBot Chassis Hub Motor Replacement and Configuration · Key field: 13 / motorVersion",
          "BellaBot Radnabenmotor – Austausch und Konfiguration · Schlüsselfeld: 13 / motorVersion"
        )
      },
      groups: {
        ".hero-meta span": {
          zh: ["适用：6.5 寸 Maxwell（M）电机", "适用：6.5 寸中菱电机", "两个入口任选其一"],
          en: ["Applies to: 6.5-inch Maxwell (M) motor", "Applies to: 6.5-inch Zhongling motor", "Use either configuration path"],
          de: ["Gilt für: 6,5-Zoll-Maxwell-Motor (M)", "Gilt für: 6,5-Zoll-Zhongling-Motor", "Einen der beiden Wege verwenden"]
        },
        "#overview .flow-item span": {
          zh: ["关闭电源并更换电机", "核对新电机备件号", "选择入口一或入口二", "修改字段 13", "保存并重启设备", "低速测试并确认"],
          en: ["Power off and replace motor", "Check new motor part number", "Choose Path 1 or Path 2", "Change Field 13", "Save and restart device", "Verify at low speed"],
          de: ["Ausschalten und Motor ersetzen", "Teilenummer des neuen Motors prüfen", "Weg 1 oder Weg 2 wählen", "Feld 13 ändern", "Speichern und neu starten", "Bei niedriger Geschwindigkeit prüfen"]
        },
        "#overview .info-card:nth-of-type(2) li": {
          zh: ["左右两侧驱动电机型号一致", "电机线束及接插件安装到位", "紧固件已固定，线束无挤压干涉", "只修改 <code>motorVersion</code>，不要修改其他字段"],
          en: ["Left and right drive motors are the same type", "Motor harnesses and connectors are fully seated", "Fasteners are secure and cables are not pinched", "Change only <code>motorVersion</code>; do not modify other fields"],
          de: ["Linker und rechter Antriebsmotor sind vom gleichen Typ", "Motorkabel und Steckverbinder sind vollständig eingesetzt", "Befestigungen sind fest und Kabel nicht eingeklemmt", "Nur <code>motorVersion</code> ändern; keine anderen Felder bearbeiten"]
        },
        "#overview .video-note span": {
          zh: ["时长：约 4 分 09 秒", "画质：1080p", "格式：MP4 · H.264 / AAC"],
          en: ["Duration: approx. 4:09", "Resolution: 1080p", "Format: MP4 · H.264 / AAC"],
          de: ["Dauer: ca. 4:09", "Auflösung: 1080p", "Format: MP4 · H.264 / AAC"]
        },
        "#route-one .route-line span": {
          zh: ["Debug", "Hardware", "MachinInfo · Open", "字段 13", "SAVE", "重启"],
          en: ["Debug", "Hardware", "MachinInfo · Open", "Field 13", "SAVE", "Restart"],
          de: ["Debug", "Hardware", "MachinInfo · Open", "Feld 13", "SAVE", "Neustart"]
        },
        "#route-one .legend li": {
          zh: ["<i class='click'></i>红色：点击入口", "<i class='value'></i>绿色：填写字段", "<i class='save'></i>蓝色：保存"],
          en: ["<i class='click'></i>Red: click target", "<i class='value'></i>Green: value entry", "<i class='save'></i>Blue: save"],
          de: ["<i class='click'></i>Rot: anklicken", "<i class='value'></i>Grün: Wert eingeben", "<i class='save'></i>Blau: speichern"]
        },
        "#route-one .step-head h3": {
          zh: ["在 Debug 界面点击 Hardware", "在 Hardware 页面打开 MachinInfo", "修改字段 13 并保存"],
          en: ["Select Hardware on the Debug screen", "Open MachinInfo on the Hardware screen", "Change Field 13 and save"],
          de: ["Hardware im Debug-Bildschirm auswählen", "MachinInfo im Hardware-Bildschirm öffnen", "Feld 13 ändern und speichern"]
        },
        "#route-one .step-head p": {
          zh: [
            "在页面左下方找到 <strong>DebugHardwareAndSensor</strong> 区域。",
            "找到左侧的 <strong>MachinInfo</strong> 区域，点击右下角的 <strong>Open</strong>。",
            "找到 <strong>(13) motorVersion</strong>，按备件号填写 <strong>5</strong> 或 <strong>3</strong>，然后点击右上角 <strong>SAVE</strong>。"
          ],
          en: [
            "Find the <strong>DebugHardwareAndSensor</strong> area at the lower left.",
            "Find <strong>MachinInfo</strong> on the left and select <strong>Open</strong> at its lower right.",
            "Find <strong>(13) motorVersion</strong>, enter <strong>5</strong> or <strong>3</strong> according to the part number, then select <strong>SAVE</strong> at the upper right."
          ],
          de: [
            "Suchen Sie unten links den Bereich <strong>DebugHardwareAndSensor</strong>.",
            "Suchen Sie links den Bereich <strong>MachinInfo</strong> und wählen Sie unten rechts <strong>Open</strong>.",
            "Suchen Sie <strong>(13) motorVersion</strong>, tragen Sie je nach Teilenummer <strong>5</strong> oder <strong>3</strong> ein und wählen Sie anschließend oben rechts <strong>SAVE</strong>."
          ]
        },
        "#route-one .hint": {
          zh: ["点击 Hardware", "点击 Open", "填写 motorVersion", "点击 SAVE"],
          en: ["Select Hardware", "Select Open", "Enter motorVersion", "Select SAVE"],
          de: ["Hardware wählen", "Open wählen", "motorVersion eingeben", "SAVE wählen"]
        },
        "#route-one figcaption": {
          zh: ["红框标出了 Hardware 按钮。", "Open 按钮位于 MachinInfo 区域右下角。", "图中数值 5 只是 M 电机示例。中菱电机应填写 3。保存后必须重启机器人。"],
          en: ["The red frame marks the Hardware button.", "The Open button is at the lower right of the MachinInfo area.", "Value 5 is only an example for the M motor. Enter 3 for a Zhongling motor. Restart the robot after saving."],
          de: ["Der rote Rahmen markiert die Schaltfläche Hardware.", "Die Schaltfläche Open befindet sich unten rechts im Bereich MachinInfo.", "Der Wert 5 ist nur ein Beispiel für den M-Motor. Für einen Zhongling-Motor ist 3 einzutragen. Nach dem Speichern den Roboter neu starten."]
        },

        "#route-two .route-line span": {
          zh: ["Debug", "RunToMappingTool", "齿轮", "Ändern Sie MachineInfo", "字段 13", "Speichern", "重启"],
          en: ["Debug", "RunToMappingTool", "Gear icon", "Ändern Sie MachineInfo", "Field 13", "Speichern", "Restart"],
          de: ["Debug", "RunToMappingTool", "Zahnradsymbol", "Ändern Sie MachineInfo", "Feld 13", "Speichern", "Neustart"]
        },
        "#route-two .step-head h3": {
          zh: ["从 Debug 打开建图工具", "点击地图列表页面的齿轮", "打开 Ändern Sie MachineInfo", "修改字段 13 并保存"],
          en: ["Open the Mapping Tool from Debug", "Select the gear icon on the map list", "Open Ändern Sie MachineInfo", "Change Field 13 and save"],
          de: ["Mapping-Tool über Debug öffnen", "Zahnradsymbol in der Kartenliste wählen", "Ändern Sie MachineInfo öffnen", "Feld 13 ändern und speichern"]
        },
        "#route-two .step-head p": {
          zh: [
            "在右侧 <strong>Tools</strong> 区域点击 <strong>RunToMappingTool</strong>。",
            "进入地图列表页面后，点击页面底部的齿轮图标；当前截图中位于左下角。",
            "在设置页面向下找到 <strong>Ändern Sie MachineInfo</strong>，点击该行。",
            "找到 <strong>(13) motorVersion</strong>，按备件号填写 <strong>5</strong> 或 <strong>3</strong>，然后点击右上角 <strong>Speichern</strong>。"
          ],
          en: [
            "Select <strong>RunToMappingTool</strong> in the <strong>Tools</strong> area on the right.",
            "On the map list page, select the gear icon at the bottom; it is at the lower left in this screenshot.",
            "Scroll down in Settings, find <strong>Ändern Sie MachineInfo</strong> and select the row.",
            "Find <strong>(13) motorVersion</strong>, enter <strong>5</strong> or <strong>3</strong> according to the part number, then select <strong>Speichern</strong> at the upper right."
          ],
          de: [
            "Wählen Sie rechts im Bereich <strong>Tools</strong> die Option <strong>RunToMappingTool</strong>.",
            "Wählen Sie in der Kartenliste das Zahnradsymbol am unteren Rand; im Screenshot befindet es sich links unten.",
            "Scrollen Sie in den Einstellungen nach unten, suchen Sie <strong>Ändern Sie MachineInfo</strong> und wählen Sie die Zeile.",
            "Suchen Sie <strong>(13) motorVersion</strong>, tragen Sie je nach Teilenummer <strong>5</strong> oder <strong>3</strong> ein und wählen Sie anschließend oben rechts <strong>Speichern</strong>."
          ]
        },
        "#route-two .hint": {
          zh: ["点击 RunToMappingTool", "点击齿轮", "点击 Ändern Sie MachineInfo", "填写 motorVersion", "点击 Speichern"],
          en: ["Select RunToMappingTool", "Select the gear icon", "Select Ändern Sie MachineInfo", "Enter motorVersion", "Select Speichern"],
          de: ["RunToMappingTool wählen", "Zahnradsymbol wählen", "Ändern Sie MachineInfo wählen", "motorVersion eingeben", "Speichern wählen"]
        },
        "#route-two figcaption": {
          zh: ["RunToMappingTool 位于 Debug 页右侧的 Tools 区域。", "齿轮图标会打开建图工具设置页面。", "红框标出了 Ändern Sie MachineInfo 菜单行。", "图中数值 5 只是 M 电机示例。中菱电机应填写 3。保存后必须重启机器人。"],
          en: ["RunToMappingTool is in the Tools area on the right side of the Debug page.", "The gear icon opens the Mapping Tool settings.", "The red frame marks the Ändern Sie MachineInfo menu row.", "Value 5 is only an example for the M motor. Enter 3 for a Zhongling motor. Restart the robot after saving."],
          de: ["RunToMappingTool befindet sich rechts auf der Debug-Seite im Bereich Tools.", "Das Zahnradsymbol öffnet die Einstellungen des Mapping-Tools.", "Der rote Rahmen markiert die Menüzeile Ändern Sie MachineInfo.", "Der Wert 5 ist nur ein Beispiel für den M-Motor. Für einen Zhongling-Motor ist 3 einzutragen. Nach dem Speichern den Roboter neu starten."]
        },

        "#restart .action-card": {
          zh: [
            "<b>① 保存</b>入口一点击 <strong>SAVE</strong>；入口二点击 <strong>Speichern</strong>。",
            "<b>② 重启机器人</b>完整重启设备后，新的 <code>motorVersion</code> 配置才会生效。"
          ],
          en: [
            "<b>① Save</b>Use <strong>SAVE</strong> in Path 1 or <strong>Speichern</strong> in Path 2.",
            "<b>② Restart the robot</b>The new <code>motorVersion</code> configuration becomes active only after a complete restart."
          ],
          de: [
            "<b>① Speichern</b>Verwenden Sie in Weg 1 <strong>SAVE</strong> oder in Weg 2 <strong>Speichern</strong>.",
            "<b>② Roboter neu starten</b>Die neue <code>motorVersion</code>-Konfiguration wird erst nach einem vollständigen Neustart wirksam."
          ]
        },
        "#restart .check-grid li": {
          zh: ["重新进入 Machine Info，确认字段 13 已正确保存", "确认左右两侧驱动电机型号一致", "在平整、空旷区域进行低速直行测试", "测试后退、左转、右转和停止", "系统无电机或底盘相关故障提示", "机器人无明显跑偏、抖动、异响或驱动无力"],
          en: ["Reopen Machine Info and confirm that Field 13 was saved correctly", "Confirm that left and right drive motors are the same type", "Perform a low-speed straight-line test on a flat, open surface", "Test reverse, left turn, right turn and stop", "No motor- or chassis-related system fault is shown", "No obvious drifting, vibration, abnormal noise or weak drive"],
          de: ["Machine Info erneut öffnen und prüfen, ob Feld 13 korrekt gespeichert wurde", "Prüfen, ob linker und rechter Antriebsmotor vom gleichen Typ sind", "Auf einer ebenen, freien Fläche eine Geradeausfahrt bei niedriger Geschwindigkeit testen", "Rückwärtsfahrt, Links- und Rechtskurve sowie Stopp testen", "Keine motor- oder chassisbezogene Systemstörung vorhanden", "Kein deutliches Abdriften, Ruckeln, ungewöhnliches Geräusch oder schwacher Antrieb"]
        },
        "#restart .trouble b": {
          zh: ["字段是否选错", "配置是否已生效", "硬件是否安装到位"],
          en: ["Is the field value correct?", "Is the configuration active?", "Is the hardware installed correctly?"],
          de: ["Ist der Feldwert korrekt?", "Ist die Konfiguration aktiv?", "Ist die Hardware korrekt installiert?"]
        },
        "#restart .trouble p": {
          zh: ["19999-000848 应为 5；19999-000300 应为 3。", "确认已点击保存，并在保存后完整重启机器人。", "检查左右电机型号、接插件、线束和紧固件。"],
          en: ["19999-000848 must be 5; 19999-000300 must be 3.", "Confirm that you saved and completely restarted the robot afterward.", "Check both motor types, connectors, cable harnesses and fasteners."],
          de: ["Für 19999-000848 muss 5, für 19999-000300 muss 3 eingetragen sein.", "Prüfen Sie, ob gespeichert und der Roboter anschließend vollständig neu gestartet wurde.", "Prüfen Sie beide Motortypen, Steckverbinder, Kabelbäume und Befestigungen."]
        }
      }
    }
  };

  const externalPage = window.xwPageI18n;
  const externalPageName = document.body.dataset.page;
  if (externalPage && externalPageName) pages[externalPageName] = externalPage;

  function applyHtml(config, lang) {
    Object.entries(config.html || {}).forEach(([selector, values]) => {
      const element = document.querySelector(selector);
      if (element && values[lang] != null) element.innerHTML = values[lang];
    });
  }

  function applyGroups(config, lang) {
    Object.entries(config.groups || {}).forEach(([selector, values]) => {
      const elements = Array.from(document.querySelectorAll(selector));
      const translations = values[lang] || [];
      elements.forEach((element, index) => {
        if (translations[index] != null) element.innerHTML = translations[index];
      });
    });
  }

  function applyLanguage(lang) {
    if (!LANGS.includes(lang)) lang = "zh";
    const page = pages[document.body.dataset.page];
    if (!page) return;

    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
    document.title = page.title[lang];
    applyHtml(page, lang);
    applyGroups(page, lang);

    document.querySelectorAll("[data-lang-switch]").forEach((button) => {
      const active = button.dataset.langSwitch === lang;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    localStorage.setItem(STORAGE_KEY, lang);
  }

  document.querySelectorAll("[data-lang-switch]").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.langSwitch));
  });

  const saved = localStorage.getItem(STORAGE_KEY);
  const requestedDefault = document.body.dataset.defaultLang;
  const defaultLang = LANGS.includes(requestedDefault) ? requestedDefault : "zh";
  applyLanguage(LANGS.includes(saved) ? saved : defaultLang);
})();
