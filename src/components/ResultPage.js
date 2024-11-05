import React from "react";
import { useHistory } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Chart } from "primereact/chart";
import { BreadCrumb } from "primereact/breadcrumb";


const ResultPage = ({ location }) => {
    const { results } = location.state;
    const history = useHistory();

    const barData = {
        labels: ["Novo GAT", "Novo GE AMC", "Novo GEEF AMC", "Novo GR R Vida", "Novo ITA"],
        datasets: [
            {
                label: "Totais",
                backgroundColor: [
                    "#42A5F5",
                    "#66BB6A", 
                    "#FFA726", 
                    "#26C6DA", 
                    "#7E57C2",
                ],
                data: [results.Totais.total_novo_gat, results.Totais.total_novo_ge_amc, results.Totais.total_novo_geef_amc, results.Totais.total_novo_gr_r_vida, results.Totais.total_novo_ita],
            },
        ],
    };

    const barOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: "#495057",
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#495057",
                },
                grid: {
                    color: "#ebedef",
                },
            },
            y: {
                ticks: {
                    color: "#495057",
                },
                grid: {
                    color: "#ebedef",
                },
            },
        },
    };

    function formatReal(value) {
        return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
    }

    function formatPorcent(value) {
        return new Intl.NumberFormat("pt-BR", { style: "percent", minimumFractionDigits: 2 }).format(value);
    }

    const items = [
        {
            label: "Impacto Salarial",
            command: () => {
                history.push("/salary-impact");
            },
        },
        {
            label: "Resultados",
            command: () => {
                history.push("/salary-impact/results");
            },
        },
    ];

    const home = {
        icon: "pi pi-home",
        command: () => {
            history.push("/");
        },
    };

    return (
        <div>
            <BreadCrumb model={items} home={home} />
            {results && (
                <div>
                    <div className="flex flex-wrap">
                        <div className="col-12 lg:col-6 xl:col-3">
                            <div className="card mb-0 fadein animation-duration-500" style={{backgroundColor: "rgba(31, 150, 156, 0.1)", color: "#ffc107", borderLeft: "4px solid" }}>
                                <div className="flex justify-content-between mb-3">
                                    <div>
                                        <span className="block text-500 font-medium mb-3">TOTAL DE AUMENTO EFETIVO</span>
                                        <div className="text-900 font-medium text-xl">{formatReal(results.Totais.total_impacto)}</div>
                                    </div>
                                    <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                                        <i className="pi pi-chart-bar text-blue-500 text-xl" />
                                    </div>
                                </div>
                                <span className="text-green-500 font-medium">{formatPorcent(results.Totais.impacto_percentual)} </span>
                                <span className="text-500">de variação de aumento efetivo</span>
                            </div>
                        </div>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <div className="card mb-0 fadein animation-duration-500" style={{ color: "#ffc107", borderLeft: "4px solid" }}>
                                <div className="flex justify-content-between mb-3">
                                    <div>
                                        <span className="block text-500 font-medium mb-3">Impacto ITA</span>
                                        <div className="text-900 font-medium text-xl">{formatReal(results.Totais.impacto_ita)}</div>
                                    </div>
                                    <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                                        <i className="pi pi-chart-bar text-blue-500 text-xl" />
                                    </div>
                                </div>
                                <span className="text-green-500 font-medium">{formatPorcent(results.Totais.impacto_percentual_ita)} </span>
                                <span className="text-500">de variação</span>
                            </div>
                        </div>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <div className="card mb-0 fadein animation-duration-500" style={{ color: "#ffc107", borderLeft: "4px solid" }}>
                                <div className="flex justify-content-between mb-3">
                                    <div>
                                        <span className="block text-500 font-medium mb-3">Impacto GAT</span>
                                        <div className="text-900 font-medium text-xl">{formatReal(results.Totais.impacto_gat)}</div>
                                    </div>
                                    <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                                        <i className="pi pi-chart-bar text-blue-500 text-xl" />
                                    </div>
                                </div>
                                <span className="text-green-500 font-medium">{formatPorcent(results.Totais.impacto_percentual_gat)} </span>
                                <span className="text-500">de variação</span>
                            </div>
                        </div>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <div className="card mb-0 fadein animation-duration-500" style={{ color: "#ffc107", borderLeft: "4px solid" }}>
                                <div className="flex justify-content-between mb-3">
                                    <div>
                                        <span className="block text-500 font-medium mb-3">Impacto Geef AMC</span>
                                        <div className="text-900 font-medium text-xl">{formatReal(results.Totais.impacto_geef_amc)}</div>
                                    </div>
                                    <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                                        <i className="pi pi-chart-bar text-blue-500 text-xl" />
                                    </div>
                                </div>
                                <span className="text-green-500 font-medium">{formatPorcent(results.Totais.impacto_percentual_geef_amc)} </span>
                                <span className="text-500">de variação</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap">
                        <div className="col-12 lg:col-6">
                            <div className="card">
                                <h5>Gratificações</h5>
                                <Chart type="bar" options={barOptions} data={barData} />
                            </div>
                        </div>
                        <div className="col-12 lg:col-6">
                            <div className="card">
                                <h5>Gratificações</h5>
                                <Chart type="bar" options={barOptions} data={barData} />
                            </div>
                        </div>
                    </div>

                    <h3>Resultados</h3>
                    <DataTable value={Object.values(results.impact)} scrollable scrollHeight="500px" scrollDirection="both">
            <Column field="nome" header="Nome" style={{ flexGrow: 1, flexBasis: '240px' }} />
            <Column field="salario_final_atual" header="Salário Atual" style={{ flexGrow: 1, flexBasis: '120px' }} />
            <Column field="novo_salario_final" header="Novo Salário" style={{ flexGrow: 1, flexBasis: '120px' }} />
            <Column field="impacto" header="Impacto" style={{ flexGrow: 1, flexBasis: '120px' }} />
            <Column field="novo_ita" header="Novo ITA" style={{ flexGrow: 1, flexBasis: '120px' }}
                body={(rowData) => formatReal(rowData.novo_ita)} // Formatação usando formatReal
            />
            <Column field="novo_gat" header="Novo GAT" style={{ flexGrow: 1, flexBasis: '120px' }} />
            <Column field="novo_geef_amc" header="Novo GEEF AMC" style={{ flexGrow: 1, flexBasis: '120px' }} />
            <Column field="novo_gr_r_vida" header="Novo GR R Vida" style={{ flexGrow: 1, flexBasis: '120px' }} />
            <Column field="novo_ge_amc" header="Novo GE AMC" style={{ flexGrow: 1, flexBasis: '120px' }} />
        </DataTable>
                </div>
            )}
        </div>
    );
};

export default ResultPage;
