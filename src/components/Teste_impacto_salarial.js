import React, { useState, useEffect } from "react";
import axios from "axios";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { useHistory } from "react-router-dom"; // Importe useHistory do react-router-dom
// import { formatReal } from './utils'; // Importe a função formatReal aqui

const Teste_impacto_salarial = () => {
    const history = useHistory(); // Instancie useHistory
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
        fetchDropdownOptions("emp", setEmpOptions);
        fetchDropdownOptions("orgao", setOrgaoOptions);
        fetchDropdownOptions("lotacao", setLotacaoOptions);
        fetchDropdownOptions("ambiente", setAmbienteOptions);
        fetchDropdownOptions("tab", setTabOptions);
    }, []);

    const fetchDropdownOptions = async (field, setter) => {
        try {
            const response = await axios.get(`/employees/filters/${field}`);
            setter(response.data.map((value) => ({ label: value, value })));
        } catch (error) {
            console.error(`Error fetching ${field} options:`, error);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post("/employees/predict_increase", {
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
                tab,
            });
            setResults(response.data);
            // Navegar para a página de resultados após o cálculo
            history.push({
                pathname: '/results',
                state: { results: response.data } // Passando os resultados via estado
            });
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

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
        </div>
    );
};

export default Teste_impacto_salarial;
