const electron = require('electron');

const {app,BrowserWindow,Menu,ipcMain} = electron;

let mainWindow;
let addWindow;

app.on('ready',() => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/main.html`)
  mainWindow.on('closed',() => app.quit());

  const mainMenu = Menu.buildFromTemplate(menuTemplate)
   Menu.setApplicationMenu(mainMenu)
})
 function createAddWindow(){
   addWindow = newBrowserWindow({
     width :300,
     height:200,
     title:'Add New Todo'
   })
   addWindow.loadURL(`file://${__dirname}/add.html`);
   addWindow.on('closed',() => addWindow = null);
 }

 ipcMain.on('todo:addvalue',(event,value=>{
   mainWindow.webContents.send('todo:addvalue',value);
   addWindow.close();
 });

 function cleartodos(){
   mainWindow.webContents.send('cleartodos',todos);
   }

const menuTemplate = [
  {
    label : 'File',
    submenu :[
       {label : 'New todo',
         click(){createAddWindow();}
       },
       {label : 'Clear todos',
        click(){cleartodos()}
       }
       {label:   'Quit' ,
        accelerator : process.platform === 'darwin'? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
       }
    ]
  }
]
if(process.platform === 'darwin'){
  menuTemplate.unshift({});
}
if(process.env.NODE_ENV !== 'production'){
  menuTemplate.push({
    label : 'DEVELOPER',
    submenu : [
      {role : 'reload'},
      {
      label:'Toggle Developer Tools',
      accelerator : process.platform === 'darwin'? 'Command+Alt+I': 'Ctrl+Shift+I',
      click(item,focusedWindow)=>{
        focusedWindow.toggleDevTools();
      }
      }
    ]
  })
}
