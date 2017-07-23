const data = require( './data' );
const { ipcMain } = require( 'electron' );

module.exports = {
    templateInicial: null,

    geraTrayTemplate( win ) {
        let template = [
            { label: 'Cursos' },
            { type: 'separator' }
        ]

        let cursos = data.pegaNomeDosCursos();

        cursos.forEach( ( curso ) => {
            let menuItem = {
                label: curso,
                type: 'radio',
                click: () => {
                    win.send( 'curso-trocado', curso );
                }
            }
            template.push( menuItem );
        } )
        this.templateInicial = template;
        return template;
    },
    adicionaCursoNoTray( curso, win ) {
        this.templateInicial.map( ( item ) => {
            item.checked = false;
        } );

        this.templateInicial.push( {
            label: curso,
            type: 'radio',
            checked: true,
            click: () => {
                win.send( 'curso-trocado', curso );
            }
        } );

        data.salvaDados( curso, '00:00:00' );

        return this.templateInicial;
    },
    geraMenuPrincipalTemplate( app ) {
        let templateMenu = [
            {
                label: 'Visualizar',
                submenu: [
                    {
                        label: 'Recarregar',
                        role: 'reload'
                    },
                    {
                        label: 'Menu Desenvolvedor',
                        role: 'toggledevtools'
                    }
                ]
            },
            {
                label: 'Janela',
                submenu: [
                    {
                        label: 'Minimizar',
                        role: 'minimize'
                    },
                    {
                        label: 'Fechar',
                        role: 'close'
                    }
                ]
            },
            {
                label: 'Sobre',
                submenu: [
                    {
                        label: 'Sobre o Alura Timer',
                        click: () => {
                            ipcMain.emit( 'abrir-janela-sobre' );
                        },
                        accelerator: 'CmdOrCtrl+I'
                    }
                ]
            }
        ];

        if ( process.platform == 'darwin' ) {
            templateMenu.unshift( {
                label: app.getName(),
                submenu: [
                    {
                        label: 'Estou rodando no Mac!'
                    }
                ]
            } )
        }

        return templateMenu;
    }

}