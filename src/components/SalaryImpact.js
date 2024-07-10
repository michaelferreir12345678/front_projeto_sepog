import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';


const SalaryImpact = () => {
    const [incremento, setIncremento] = useState();
    const [novoRefIta, setNovoRefIta] = useState();
    const [novoRefGat, setNovoRefGat] = useState();
    const [novoRefGeefAmc, setNovoRefGeefAmc] = useState();
    const [novoRefGrRVida, setNovoRefGrRVida] = useState();
    const [novoRefGeAmc, setNovoRefGeAmc] = useState();
    const [results, setResults] = useState(null);

    const [emp, setEmp] = useState(null);
    const [orgao, setOrgao] = useState(null);
    const [lotacao, setLotacao] = useState(null);
    const [ambiente, setAmbiente] = useState(null);
    const [tab, setTab] = useState(null);

    const [empOptions, setEmpOptions] = useState([]);
    const [orgaoOptions, setOrgaoOptions] = useState([]);
    const [lotacaoOptions, setLotacaoOptions] = useState([]);
    const [ambienteOptions, setAmbienteOptions] = useState([]);
    const [tabOptions, setTabOptions] = useState([]);

    useEffect(() => {
        fetchDropdownOptions('emp', setEmpOptions);
        fetchDropdownOptions('orgao', setOrgaoOptions);
        fetchDropdownOptions('lotacao', setLotacaoOptions);
        fetchDropdownOptions('ambiente', setAmbienteOptions);
        fetchDropdownOptions('tab', setTabOptions);
    }, []);

    const fetchDropdownOptions = async (field, setter) => {
        try {
            const response = await axios.get(`/employees/filters/${field}`);
            setter(response.data.map(value => ({ label: value, value })));
        } catch (error) {
            console.error(`Error fetching ${field} options:`, error);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/employees/predict_increase', {
                incremento,
                novo_ref_ita: novoRefIta,
                novo_ref_gat: novoRefGat,
                novo_ref_geef_amc: novoRefGeefAmc,
                novo_ref_gr_r_vida: novoRefGrRVida,
                novo_ref_ge_amc: novoRefGeAmc,
                emp,
                orgao,
                lotacao,
                ambiente,
                tab
            });
            setResults(response.data);
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    function formatReal(value) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }

    return (
        <div>
            <h2>Impacto do Aumento Salarial</h2>
            <div className="col-12">
                <div className="card">
                    <h5>Formulário</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="incremento">Incremento</label>
                            <InputNumber placeholder='R$ 0,00' id="incremento" value={incremento} onValueChange={(e) => setIncremento(e.value)} mode="currency" currency="BRL" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="novoRefIta">Novo Ref ITA</label>
                            <InputNumber placeholder='0' id="novoRefIta" value={novoRefIta} onValueChange={(e) => setNovoRefIta(e.value)} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="novoRefGat">Novo Ref GAT</label>
                            <InputNumber placeholder='0' id="novoRefGat" value={novoRefGat} onValueChange={(e) => setNovoRefGat(e.value)} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="novoRefGeefAmc">Novo Ref GEEF AMC</label>
                            <InputNumber placeholder='0' id="novoRefGeefAmc" value={novoRefGeefAmc} onValueChange={(e) => setNovoRefGeefAmc(e.value)} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="novoRefGrRVida">Novo Ref GR R Vida</label>
                            <InputNumber placeholder='0' id="novoRefGrRVida" value={novoRefGrRVida} onValueChange={(e) => setNovoRefGrRVida(e.value)} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="novoRefGeAmc">Novo Ref GE AMC</label>
                            <InputNumber placeholder='0' id="novoRefGeAmc" value={novoRefGeAmc} onValueChange={(e) => setNovoRefGeAmc(e.value)} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="emp">Emp</label>
                            <MultiSelect id="emp" value={emp} options={empOptions} onChange={(e) => setEmp(e.value)} placeholder="Selecione" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="orgao">Orgao</label>
                            <MultiSelect id="orgao" value={orgao} options={orgaoOptions} onChange={(e) => setOrgao(e.value)} placeholder="Selecione" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="lotacao">Lotacao</label>
                            <MultiSelect id="lotacao" value={lotacao} options={lotacaoOptions} onChange={(e) => setLotacao(e.value)} placeholder="Selecione" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="ambiente">Ambiente</label>
                            <MultiSelect id="ambiente" value={ambiente} options={ambienteOptions} onChange={(e) => setAmbiente(e.value)} placeholder="Selecione" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="tab">Tab</label>
                            <MultiSelect id="tab" value={tab} options={tabOptions} onChange={(e) => setTab(e.value)} placeholder="Selecione" />
                        </div>
                        <Button label="Calcular" onClick={handleSubmit} />
                    </div>
                </div>
            </div>
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

export default SalaryImpact;
