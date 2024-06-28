import React from 'react';

export const AppFooter = (props) => {

    return (
        <div className="layout-footer">
            <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/logo_pref.png' : 'assets/layout/images/logo_pref.png'} alt="Logo" height="30" className="mr-2" />
            by
            <span className="font-medium ml-2">Prefeitura de Fortaleza</span>
        </div>
    );
}
