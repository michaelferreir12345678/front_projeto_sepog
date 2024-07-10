import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { formatReal } from './utils'; // Importe a função formatReal aqui

const ResultPage = ({ location }) => {
    const { results } = location.state;

    function formatReal(value) {
        return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
    }
    return (
        <div>
            {results && (
                <div>
                    <div className='flex flex-wrap'>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <div className="card mb-0 fadein animation-duration-500" style={{ color: '#ffc107', borderLeft: '4px solid' }}>
                                <div className="flex justify-content-between mb-3">
                                    <div>
                                        <span className="block text-500 font-medium mb-3">Total Impacto</span>
                                        <div className="text-900 font-medium text-xl">{formatReal(results.Totais.total_impacto)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <div className="card mb-0 fadein animation-duration-500" style={{ color: '#ffc107', borderLeft: '4px solid' }}>
                                <div className="flex justify-content-between mb-3">
                                    <div>
                                        <span className="block text-500 font-medium mb-3">Total do Novo Salário</span>
                                        <div className="text-900 font-medium text-xl">{formatReal(results.Totais.total_novo_salario_final)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <div className="card mb-0 fadein animation-duration-500" style={{ color: '#ffc107', borderLeft: '4px solid' }}>
                                <div className="flex justify-content-between mb-3">
                                    <div>
                                        <span className="block text-500 font-medium mb-3">Total Novo ITA:</span>
                                        <div className="text-900 font-medium text-xl">{formatReal(results.Totais.total_novo_ita)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <div className="card mb-0 fadein animation-duration-500" style={{ color: '#ffc107', borderLeft: '4px solid' }}>
                                <div className="flex justify-content-between mb-3">
                                    <div>
                                        <span className="block text-500 font-medium mb-3">Total Novo GAT:</span>
                                        <div className="text-900 font-medium text-xl">{formatReal(results.Totais.total_novo_gat)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <div className="card mb-0 fadein animation-duration-500" style={{ color: '#ffc107', borderLeft: '4px solid' }}>
                                <div className="flex justify-content-between mb-3">
                                    <div>
                                        <span className="block text-500 font-medium mb-3">Total Novo GEEF AMC:</span>
                                        <div className="text-900 font-medium text-xl">{formatReal(results.Totais.total_novo_geef_amc)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <div className="card mb-0 fadein animation-duration-500" style={{ color: '#ffc107', borderLeft: '4px solid' }}>
                                <div className="flex justify-content-between mb-3">
                                    <div>
                                        <span className="block text-500 font-medium mb-3">Total Novo GR R Vida:</span>
                                        <div className="text-900 font-medium text-xl">{formatReal(results.Totais.total_novo_gr_r_vida)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <div className="card mb-0 fadein animation-duration-500" style={{ color: '#ffc107', borderLeft: '4px solid' }}>
                                <div className="flex justify-content-between mb-3">
                                    <div>
                                        <span className="block text-500 font-medium mb-3">Total Novo GE AMC:</span>
                                        <div className="text-900 font-medium text-xl">{formatReal(results.Totais.total_novo_ge_amc)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3>Resultados</h3>
                    <DataTable value={Object.values(results.impact)}>
                        <Column field="nome" header="Nome" />
                        <Column field="salario_final_atual" header="Salário Atual" />
                        <Column field="novo_salario_final" header="Novo Salário" />
                        <Column field="impacto" header="Impacto" />
                    </DataTable>
                </div>
            )}
        </div>
    );
};

export default ResultPage;
