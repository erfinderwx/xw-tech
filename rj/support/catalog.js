(function () {
  'use strict';
  // Product taxonomy and customer resources are independent of page layout.
  // Customer resources are loaded from content.js before app.js.
  window.RJSupportCatalog = {
    site: { name: 'RJ Tech', title: 'Product support', stage: 'published', version: '1.0', language: 'en', visibleResourceLanguages: ['en','zh-CN'], downloadLanguages: ['en'], archivedResourceIds: ['manual-offroad','first-use-offroad','daily-use-offroad','charging-offroad-indicators'] },
    audiences: [
      { id: 'users', name: 'User support', en: 'USER SUPPORT', icon: 'user', status: 'active', title: 'Vehicle use and maintenance', summary: 'Vehicle operation, accessories, maintenance and troubleshooting.' },
      { id: 'dealers', name: 'Dealer resources', en: 'DEALER RESOURCES', icon: 'briefcase', status: 'active', title: 'Installation, delivery and service', summary: 'Product certification, installation, delivery and technical service.' },
      { id: 'developers', name: 'Developer resources', en: 'DEVELOPER RESOURCES', icon: 'code', status: 'planned', title: 'Developer resources', summary: 'Interfaces, communication protocols and integration resources. Not yet available.' }
    ],
    products: [
      { id: 'steinadler-pro', name: 'Steinadler Pro', code: 'SP', family: 'Steinadler', label: 'Vehicle use and accessories', status: 'layout-ready', description: 'L7e vehicle operation, accessories, maintenance and technical support.', supportScope: 'L7e', modelOptions: [{id:'l7e',name:'L7e'},{id:'offroad',name:'Offroad'}], seatOptions: [{id:'ss',name:'Single seat (SS)'},{id:'ds',name:'Dual seat (DS)'}], topicStatuses: {follow:'Configuration enquiry',spares:'Parts enquiry',certificates:'Available on request'}, sectionIds: {users:['start','operation','accessories','functions','care','media'],dealers:['certification','handover','service','training','shared']}, topicIds: ['first-use','daily-use','charging','storage','seat-footrest','trailer','range-extender','remote','fpv','follow','maintenance','troubleshooting','videos','manuals','certificates','installation','delivery','repair','spares','dealer-training'] },
      { id: 'luchs-a', name: 'Luchs A', code: 'LA', family: 'Luchs', label: 'Product use and maintenance', status: 'reserved', description: 'Find product operation, accessory and maintenance resources.', modelOptions: [], seatOptions: [], sectionIds: {users:['start','operation','accessories','care','media'],dealers:['certification','handover','service','training','shared']}, topicIds: ['first-use','daily-use','charging','maintenance','troubleshooting','videos','manuals','certificates','installation','delivery','repair','spares','dealer-training'] },
      { id: 'luchs-b', name: 'Luchs B', code: 'LB', family: 'Luchs', label: 'Product use and maintenance', status: 'reserved', description: 'Find product operation, accessory and maintenance resources.', modelOptions: [], seatOptions: [], sectionIds: {users:['start','operation','accessories','care','media'],dealers:['certification','handover','service','training','shared']}, topicIds: ['first-use','daily-use','charging','maintenance','troubleshooting','videos','manuals','certificates','installation','delivery','repair','spares','dealer-training'] }
    ],
    sections: [
      {id:'start',title:'Getting started',description:'Product overview, preparation and first checks',icon:'flag',audiences:['users','dealers']},
      {id:'operation',title:'Everyday operation',description:'Driving, charging and storage',icon:'control',audiences:['users','dealers']},
      {id:'accessories',title:'Accessories and installation',description:'Compatibility, fitting and use',icon:'layers',audiences:['users','dealers']},
      {id:'functions',title:'Vehicle functions',description:'Remote control, FPV and following',icon:'signal',audiences:['users','dealers']},
      {id:'care',title:'Maintenance and troubleshooting',description:'Routine care and common issues',icon:'tool',audiences:['users','dealers']},
      {id:'media',title:'Videos and downloads',description:'Operation videos and supporting manuals',icon:'play',audiences:['users','dealers']},
      {id:'certification',title:'Product certification',description:'Certification information and requests',icon:'shield',audiences:['dealers']},
      {id:'handover',title:'Installation and delivery',description:'Fitting, checks and customer handover',icon:'box',audiences:['dealers']},
      {id:'service',title:'Technical service',description:'Service instructions and spare parts',icon:'tool',audiences:['dealers']},
      {id:'training',title:'Technical training',description:'Service procedures and training resources',icon:'book',audiences:['dealers']},
      {id:'shared',title:'User instructions',description:'Vehicle operation, accessories and maintenance',icon:'link',audiences:['dealers']},
      {id:'integration',title:'Interfaces and integration',description:'Product interfaces, connections and integration',icon:'plug',audiences:['developers']},
      {id:'development',title:'Development and examples',description:'Product interfaces, connections and integration',icon:'code',audiences:['developers']}
    ],
    topics: [
      {id:'first-use',title:'First use and checks',sectionId:'start',audiences:['users','dealers'],icon:'flag',kind:'guide',summary:'Product overview, preparation and checks before use.'},
      {id:'daily-use',title:'Everyday vehicle operation',sectionId:'operation',audiences:['users','dealers'],icon:'control',kind:'guide',summary:'Vehicle operation, mode selection and stopping.'},
      {id:'charging',title:'Charging and battery use',sectionId:'operation',audiences:['users','dealers'],icon:'battery',kind:'guide',summary:'Charging, battery status and common questions.'},
      {id:'storage',title:'Parking and long-term storage',sectionId:'operation',audiences:['users','dealers'],icon:'box',kind:'guide',summary:'Parking, storage and returning the vehicle to use.'},
      {id:'seat-footrest',title:'Seat and footrest installation',sectionId:'accessories',audiences:['users','dealers'],icon:'layers',kind:'accessory',summary:'Configuration scope and installation diagrams for the dual-seat frame and passenger footrest.'},
      {id:'trailer',title:'Trailers and towing accessories',sectionId:'accessories',audiences:['users','dealers'],icon:'link',kind:'accessory',summary:'Connection, checks and use of towing accessories.'},
      {id:'range-extender',title:'Range extender operation',sectionId:'accessories',audiences:['users','dealers'],icon:'battery',kind:'accessory',summary:'Controls and operation for an optional L7e range extender.'},
      {id:'remote',title:'Remote control',sectionId:'functions',audiences:['users','dealers'],icon:'control',kind:'function',summary:'Basic operation, mode selection and stopping with an already paired kit.'},
      {id:'fpv',title:'FPV video system',sectionId:'functions',audiences:['users','dealers'],icon:'monitor',kind:'function',summary:'Connection, display and instructions for the matching FPV kit.'},
      {id:'follow',title:'Following function',sectionId:'functions',audiences:['users','dealers'],icon:'signal',kind:'function',summary:'Contact RJ Tech to confirm vehicle configuration and compatibility for following.'},
      {id:'maintenance',title:'Routine maintenance',sectionId:'care',audiences:['users','dealers'],icon:'tool',kind:'guide',summary:'Maintenance tasks, inspection methods and supporting resources.'},
      {id:'troubleshooting',title:'Common issues and troubleshooting',sectionId:'care',audiences:['users','dealers'],icon:'help',kind:'guide',summary:'Common symptoms, checks and suggested next steps.'},
      {id:'videos',title:'Operation videos',sectionId:'media',audiences:['users','dealers'],icon:'play',kind:'video',summary:'Vehicle operation, accessory installation and maintenance videos.'},
      {id:'manuals',title:'Manuals and downloads',sectionId:'media',audiences:['users','dealers'],icon:'file',kind:'document',summary:'Product manuals, supplementary instructions and revision information.'},
      {id:'certificates',title:'Product certificates',sectionId:'certification',audiences:['dealers'],icon:'shield',kind:'certificate',summary:'Request certification documents for the appropriate vehicle model.'},
      {id:'installation',title:'Installation resources',sectionId:'handover',audiences:['dealers'],icon:'layers',kind:'guide',summary:'Installation scope, accessory compatibility and technical instructions.'},
      {id:'delivery',title:'Delivery and customer training',sectionId:'handover',audiences:['dealers'],icon:'box',kind:'guide',summary:'Pre-delivery checks and customer operating instructions.'},
      {id:'repair',title:'Repair and diagnostics',sectionId:'service',audiences:['dealers'],icon:'tool',kind:'service',summary:'Service instructions for qualified personnel.'},
      {id:'spares',title:'Spare parts and alternatives',sectionId:'service',audiences:['dealers'],icon:'grid',kind:'service',summary:'Contact RJ Tech to identify parts for the product and configuration.'},
      {id:'dealer-training',title:'Dealer technical training',sectionId:'training',audiences:['dealers'],icon:'book',kind:'training',summary:'Installation, service and technical training resources.'}
    ],
    developerModules: [
      {id:'hardware',title:'Hardware and interfaces',description:'Interfaces, electrical connections and installation limits',icon:'plug'},
      {id:'protocols',title:'Communication and protocols',description:'Commands, data structures and version compatibility',icon:'signal'},
      {id:'sdk',title:'SDK / API',description:'Development packages, API documentation and examples',icon:'code'},
      {id:'examples',title:'Integration examples',description:'Installation, setup and minimal application examples',icon:'terminal'},
      {id:'models',title:'Models and engineering files',description:'Models, dimensions and drawings for integration',icon:'layers'},
      {id:'releases',title:'Versions and compatibility',description:'Revision history, dependencies and compatibility',icon:'history'}
    ],
    resourceTypes: [{id:'guide',name:'Operating guide'},{id:'accessory',name:'Accessory guide'},{id:'function',name:'Function guide'},{id:'video',name:'Video'},{id:'document',name:'Manual / file'},{id:'certificate',name:'Certificate'},{id:'service',name:'Technical service'},{id:'training',name:'Training'}],
    resourceSchema: ['id','productId','topicId','audiences','variantIds','type','title','language','revision','publishedAt','status','visibility','content','assets','sourceRefs'],
    resources: []
  };
})();
