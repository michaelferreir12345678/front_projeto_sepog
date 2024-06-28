import React from 'react';

const DashboardPowerBi = () => {
  // Define o estilo para o container e o iframe
  const containerStyle = {
    height: '100vh',
    width: 'calc(100vw - 250px)', // Ajusta a largura descontando a largura do painel lateral
    marginLeft: '250px', // Compensa a margem deixada pelo painel lateral
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const iframeStyle = {
    height: '100%',
    width: '100%',
    border: 'none',
  };

  return (
    <div style={containerStyle}>
      <iframe
        title="Dashboard Projetos_laytout_alterado"
        src="https://app.powerbi.com/reportEmbed?reportId=165176f4-e259-4ec9-a216-bab0242b7af6&autoAuth=true&ctid=be9f9bae-16d0-4c87-9a03-b4383267a337"
        style={iframeStyle}
        allowFullScreen={true}
      ></iframe>
    </div>
  );
};

export default DashboardPowerBi;
