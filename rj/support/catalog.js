(function () {
  'use strict';
  // The product registry, taxonomy and eventual resources are independent of page layout.
  // Only approved material will enter resources. An empty collection is intentional in this preview.
  window.RJSupportCatalog = {
    site: { name: 'RJ Tech', title: '使用与支持', stage: 'architecture-preview', version: '0.1', language: 'zh-CN' },
    audiences: [
      { id: 'users', name: '用户支持', en: 'USER SUPPORT', icon: 'user', status: 'active', title: '让每一次使用，都有清楚的说明。', summary: '整车操作、配件使用、维护排障与操作视频。' },
      { id: 'dealers', name: '代理商专区', en: 'DEALER RESOURCES', icon: 'briefcase', status: 'active', title: '从交付到服务，资料集中组织。', summary: '产品证书、安装交付、服务说明与技术培训。' },
      { id: 'developers', name: '开发者资料', en: 'DEVELOPER RESOURCES', icon: 'code', status: 'planned', title: '为集成与开发，预留清楚的入口。', summary: '未来按产品开放接口说明、开发资料与集成指南。' }
    ],
    products: [
      { id: 'steinadler-pro', name: 'Steinadler Pro', code: 'SP', family: 'Steinadler', label: '整车使用与配件', status: 'layout-ready', description: '按道路 / 非道路版本及单 / 双座配置查找资料。', modelOptions: [{id:'l7e',name:'L7e'},{id:'offroad',name:'Offroad'}], seatOptions: [{id:'ss',name:'单座 SS'},{id:'ds',name:'双座 DS'}], sectionIds: {users:['start','operation','accessories','functions','care','media'],dealers:['certification','handover','service','training','shared']}, topicIds: ['first-use','daily-use','charging','storage','seat-footrest','trailer','range-extender','remote','fpv','follow','maintenance','troubleshooting','videos','manuals','certificates','installation','delivery','repair','spares','dealer-training'] },
      { id: 'luchs-a', name: 'Luchs A', code: 'LA', family: 'Luchs', label: '产品支持目录', status: 'reserved', description: '预留同一套用户、代理商与开发者资料结构。', modelOptions: [], seatOptions: [], sectionIds: {users:['start','operation','accessories','care','media'],dealers:['certification','handover','service','training','shared']}, topicIds: ['first-use','daily-use','charging','maintenance','troubleshooting','videos','manuals','certificates','installation','delivery','repair','spares','dealer-training'] },
      { id: 'luchs-b', name: 'Luchs B', code: 'LB', family: 'Luchs', label: '产品支持目录', status: 'reserved', description: '预留同一套用户、代理商与开发者资料结构。', modelOptions: [], seatOptions: [], sectionIds: {users:['start','operation','accessories','care','media'],dealers:['certification','handover','service','training','shared']}, topicIds: ['first-use','daily-use','charging','maintenance','troubleshooting','videos','manuals','certificates','installation','delivery','repair','spares','dealer-training'] }
    ],
    sections: [
      {id:'start',title:'开始使用',description:'首次检查、产品认识与准备',icon:'flag',audiences:['users','dealers']},
      {id:'operation',title:'日常操作',description:'操作、充电与存放',icon:'control',audiences:['users','dealers']},
      {id:'accessories',title:'配件与加装',description:'适配、安装与使用说明',icon:'layers',audiences:['users','dealers']},
      {id:'functions',title:'功能说明',description:'遥控、图传与跟随',icon:'signal',audiences:['users','dealers']},
      {id:'care',title:'维护与排障',description:'日常保养与常见问题',icon:'tool',audiences:['users','dealers']},
      {id:'media',title:'视频与下载',description:'操作视频与对应手册',icon:'play',audiences:['users','dealers']},
      {id:'certification',title:'认证证书',description:'按车型组织的证书汇编',icon:'shield',audiences:['dealers']},
      {id:'handover',title:'安装与交付',description:'加装、检查和交付说明',icon:'box',audiences:['dealers']},
      {id:'service',title:'技术服务',description:'维修级资料与备件目录',icon:'tool',audiences:['dealers']},
      {id:'training',title:'技术培训',description:'服务流程与培训材料',icon:'book',audiences:['dealers']},
      {id:'shared',title:'共用用户资料',description:'引用同版用户说明与教程',icon:'link',audiences:['dealers']},
      {id:'integration',title:'接口与集成',description:'按实际产品启用',icon:'plug',audiences:['developers']},
      {id:'development',title:'开发与示例',description:'按实际产品启用',icon:'code',audiences:['developers']}
    ],
    topics: [
      {id:'first-use',title:'首次使用与检查',sectionId:'start',audiences:['users','dealers'],icon:'flag',kind:'guide',summary:'认识产品、准备与使用前检查。'},
      {id:'daily-use',title:'整车日常操作',sectionId:'operation',audiences:['users','dealers'],icon:'control',kind:'guide',summary:'把操作、模式和停止方式放在一起。'},
      {id:'charging',title:'充电与电池使用',sectionId:'operation',audiences:['users','dealers'],icon:'battery',kind:'guide',summary:'对应配置的充电说明、状态与常见问题。'},
      {id:'storage',title:'停放与长期存放',sectionId:'operation',audiences:['users','dealers'],icon:'box',kind:'guide',summary:'停放、存放与恢复使用说明。'},
      {id:'seat-footrest',title:'座椅与脚踏安装',sectionId:'accessories',audiences:['users','dealers'],icon:'layers',kind:'accessory',summary:'适配范围、图示步骤与安装视频。'},
      {id:'trailer',title:'拖车与拖挂配件',sectionId:'accessories',audiences:['users','dealers'],icon:'link',kind:'accessory',summary:'按组合配置提供连接和使用说明。'},
      {id:'range-extender',title:'增程器使用说明',sectionId:'accessories',audiences:['users','dealers'],icon:'battery',kind:'accessory',summary:'按实际适配车型组织安装与操作资料。'},
      {id:'remote',title:'遥控操作',sectionId:'functions',audiences:['users','dealers'],icon:'control',kind:'function',summary:'配对、模式切换、退出和异常恢复。'},
      {id:'fpv',title:'图传使用',sectionId:'functions',audiences:['users','dealers'],icon:'monitor',kind:'function',summary:'连接、显示与对应版本的使用说明。'},
      {id:'follow',title:'跟随功能',sectionId:'functions',audiences:['users','dealers'],icon:'signal',kind:'function',summary:'资料填写前，先确认实际交付配置和操作依据。'},
      {id:'maintenance',title:'日常维护与保养',sectionId:'care',audiences:['users','dealers'],icon:'tool',kind:'guide',summary:'保养项目、检查方法与相关视频。'},
      {id:'troubleshooting',title:'常见问题与排障',sectionId:'care',audiences:['users','dealers'],icon:'help',kind:'guide',summary:'从现象找到处理步骤与联系入口。'},
      {id:'videos',title:'操作视频索引',sectionId:'media',audiences:['users','dealers'],icon:'play',kind:'video',summary:'按任务、产品和配置组织视频。'},
      {id:'manuals',title:'手册与说明下载',sectionId:'media',audiences:['users','dealers'],icon:'file',kind:'document',summary:'正式手册、补充说明与版本信息。'},
      {id:'certificates',title:'代理商证书汇编',sectionId:'certification',audiences:['dealers'],icon:'shield',kind:'certificate',summary:'将适用的正式证书集中到独立汇编中。'},
      {id:'installation',title:'加装与安装资料',sectionId:'handover',audiences:['dealers'],icon:'layers',kind:'guide',summary:'安装范围、配件适配与技术说明。'},
      {id:'delivery',title:'交付与培训说明',sectionId:'handover',audiences:['dealers'],icon:'box',kind:'guide',summary:'交付前检查和面向客户的使用说明。'},
      {id:'repair',title:'维修与诊断资料',sectionId:'service',audiences:['dealers'],icon:'tool',kind:'service',summary:'面向服务人员的维修级说明。'},
      {id:'spares',title:'备件与替代关系',sectionId:'service',audiences:['dealers'],icon:'grid',kind:'service',summary:'按产品与版本查找备件资料。'},
      {id:'dealer-training',title:'代理商技术培训',sectionId:'training',audiences:['dealers'],icon:'book',kind:'training',summary:'安装、服务与培训视频。'}
    ],
    developerModules: [
      {id:'hardware',title:'硬件与接口',description:'接口、电气连接和安装边界',icon:'plug'},
      {id:'protocols',title:'通信与协议',description:'指令、数据结构和版本兼容',icon:'signal'},
      {id:'sdk',title:'SDK / API',description:'按实际产品提供开发包与说明',icon:'code'},
      {id:'examples',title:'集成示例',description:'安装、运行和最小应用示例',icon:'terminal'},
      {id:'models',title:'模型与工程资料',description:'适用于集成的模型、尺寸和图纸',icon:'layers'},
      {id:'releases',title:'版本与兼容',description:'修订记录、依赖与适配说明',icon:'history'}
    ],
    resourceTypes: [{id:'guide',name:'操作说明'},{id:'accessory',name:'配件说明'},{id:'function',name:'功能说明'},{id:'video',name:'视频'},{id:'document',name:'手册 / PDF'},{id:'certificate',name:'证书'},{id:'service',name:'技术服务'},{id:'training',name:'培训'}],
    resourceSchema: ['id','productId','topicId','audiences','variantIds','type','title','language','revision','publishedAt','status','visibility','content','assets','sourceRefs'],
    resources: []
  };
})();
