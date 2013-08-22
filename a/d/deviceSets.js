var deviceSets = [
    {
        name : 'Everyone',
        devices : [
            { name: 'iPhone 4', w: 320, h:480, type:'phone', rotated: { w:416, h:320} },
            { name: 'Apple iPad', w: 768, h:1024, type:'tablet' },
            { name: '15"', w: 1024, h:768, type:'desktop' },
            { name: 'Macbook 13"', w: 1280, h:800, type:'laptop' },        ]
    },
    {
        name : 'Two Devices',
        devices : [
            { name: 'iPhone 4', w: 320, h:480, type:'phone', rotated: { w:416, h:320} },
            { name: 'iPhone 5', w: 320, h:568, type:'phone', rotated: { w:568, h:320} }
        ]
    },
    {
        name : 'Simple Devices',
        devices : [
            { name: 'Phone', w: 320, h:480, type:'phone', rotated: { w:416, h:320} },
            { name: 'Small Tablet', w: 600, h: 1000, type:'tablet' },
            { name: 'Tablet', w: 760, h: 1024, type:'tablet' },
            { name: '15"', w: 1024, h:768, type:'laptop' },
        ]
    },
    {
        name : 'Common Devices',
        devices : [
            { name: 'iPhone 4', w: 320, h:480, type:'phone', rotated: { w:416, h:320} },
            { name: 'iPhone 5', w: 320, h:568, type:'phone', rotated: { w:568, h:320} },
            { name: 'BlackBerry Curve', w: 480, h:360, type:'phone' },
            { name: 'Nexus 4', w: 382, h:592, type:'phone', rotated: { w:416, h:320} },
            { name: 'Galaxy S', w: 480, h:800, type:'phone', rotated: { w:800, h:480} },
            { name: 'Nexus 7', w: 600, h:960, type:'tablet' },
            { name: 'Nexus 10', w: 752, h:1280, type:'tablet' },
            { name: 'Apple iPad', w: 768, h:1024, type:'tablet' },
            { name: '15"', w: 1024, h:768, type:'desktop' },
            { name: 'Macbook 13"', w: 1280, h:800, type:'laptop' },
            { name: 'Macbook 15"', w: 1440, h:900, type:'laptop' },
            { name: '27" Cinema Display', w: 2560, h:1440, type:'desktop' },
        ]
    },
    {
        name : 'Breakpoints',
        devices : [
            { name: '1', w: 320, h: 480, type:'phone' },
            { name: '2', w: 600, h: 1000, type:'tablet' },
            { name: '3', w: 760, h: 1024 },
            { name: '4', w: 1024, h: 768 },   
        ]
    }
];