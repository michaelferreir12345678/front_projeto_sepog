import React, { useState, useRef } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { ProgressBar } from 'primereact/progressbar'; // Importa o componente ProgressBar
import BackendService from '../service/BackendService'; // Importa serviço de backend


const FileUploadComponent = () => {
  const [responseData, setResponseData] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const [showProgressBar, setShowProgressBar] = useState(false); // Estado para controlar exibição da ProgressBar
  const fileUploadRef = useRef(null);


  const onFileUpload = async (event) => {
    setShowProgressBar(true);
    const files = event.files;
    const formData = new FormData();

    // Adiciona todos os arquivos ao FormData
    for (let i = 0; i < files.length; i++) {
      formData.append('arquivos', files[i]);
    }


    try {
      const response = await BackendService.processFiles(formData);
      setResponseData(response.data);
    } catch (error) {
      console.error('Erro ao enviar arquivos:', error);
      setResponseData({ 'dados totais': [] }); // Inicializa com um array vazio em caso de erro
    } finally {
      setShowProgressBar(false);
    }
}


    let totalFuncionarios = 0;
    if (responseData && responseData['dados totais']) {
      totalFuncionarios = responseData['dados totais'].length;
    }

    const header = (
      <div className="table-header">
        <h2>Total de Funcionários: {totalFuncionarios}</h2>
        <div className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText type="search" placeholder="Pesquisar..." onChange={(e) => setGlobalFilter(e.target.value)} />
        </div>
      </div>
    );

    const handleCancel = () => {
      window.location.reload(); // Recarrega a página
    };

    const itemTemplate = (file, props) => {
      const index = props.index;
      const totalFiles = props.files.length;

      if (index < 5) {
        return (
          <React.Fragment key={file.name}>
            <span>{file.name}</span>
            {index < 4 && <span>, </span>}
          </React.Fragment>
        );
      } else if (index === 5) {
        return (
          <div key={`more-files-${totalFiles}`} className="p-fileupload-file">
            <div>...e mais {totalFiles - 5} arquivo(s)</div>
          </div>
        );
      }
      return null;
    };

    return (
      <div>
        <h2>Insira abaixo os arquivo para a consulta:</h2>
        <h6>Essa página é somente para realizar consultas dentro do arquivo bancário. Então insira o arquivo bancário de retorno e consulte:</h6>
        <FileUpload
          name="arquivos"
          ref={fileUploadRef}
          onClear={handleCancel}
          customUpload
          uploadHandler={onFileUpload}
          accept=".txt, .ret, .rem"
          maxFileSize={50000000}
          multiple
          itemTemplate={itemTemplate}
          chooseLabel="Escolha os arquivos"
          uploadLabel="Enviar"
          emptyTemplate={<p className="p-m-0">Arraste e solte arquivos aqui para fazer o upload.</p>}
        />
        {showProgressBar && <ProgressBar mode="indeterminate" style={{ height: '6px' }} className="custom-progress-bar" />}

        {responseData && (
          <>
            {/* <Card className="total-card" title="Total de Funcionários">
                        <h2>{totalFuncionarios}</h2>
                    </Card> */}
            <DataTable value={responseData['dados totais']} paginator rows={10}
              header={header} globalFilter={globalFilter}>
              <Column field="CPF" header="CPF" filter filterMatchMode="contains" />
              <Column field="Matricula funcionario" header="Matrícula Funcionário" filter filterMatchMode="contains" />
              <Column field="Nome do Favorecido" header="Nome do Favorecido" filter filterMatchMode="contains" />
              <Column field="Numero da Conta Corrente" header="Número da Conta Corrente" filter filterMatchMode="contains" />
              <Column field="Valor do Pagamento" header="Valor do Pagamento" filter filterMatchMode="equals" />
              <Column field="Codigos das Ocorrencias p/ Retorno" header="Códigos das Ocorrências" filter filterMatchMode="contains" />
            </DataTable>
          </>
        )}
      </div>
    );
  };

  export default FileUploadComponent;
