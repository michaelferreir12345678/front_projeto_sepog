import React, { useState, useEffect } from "react";
import axios from "axios";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { useHistory } from "react-router-dom";
import { BreadCrumb } from "primereact/breadcrumb";

const SalaryImpact = () => {
    const history = useHistory();
    const [incremento, setIncremento] = useState();
    // const [novoRefIta, setNovoRefIta] = useState();
    const [novoRefGat, setNovoRefGat] = useState(94.4);
    // eslint-disable-next-line no-unused-vars
    const [novoRefGeefAmc, setNovoRefGeefAmc] = useState();
    const [novoRefGrRVida, setNovoRefGrRVida] = useState();
    const [novoRefGeAmc, setNovoRefGeAmc] = useState();
    const [itaMedio, setItaMedio] = useState(0);
    const [itaMedioProf, setItaMedioProf] = useState(8);
    const [itaMedioTec, setItaMedioTec] = useState(9);
    const [itaGraduacao, setItaGraduacao] = useState(10);
    const [itaEspeciali, setitaEspeciali] = useState(15);
    const [itaMestrado, setItaMestrado] = useState(35);
    const [gat_inciso_i, setGat_inciso_i] = useState(70);
    const [gat_inciso_ii_v, setGat_inciso_ii_v] = useState(60);
    const [gat_inciso_iv, setGat_inciso_iv] = useState(30);
    const [gat_inciso_iii_vi_vii, setGat_inciso_iii_vi_vii] = useState(25);
    const [taxa_promocao, setTaxa_promocao] = useState(2);
    const [taxa_progressao, setTaxa_progressao] = useState(2);
    const [num_classes, setNum_classes] = useState(5);
    const [num_referencias, setNum_referencias] = useState(6);
    // eslint-disable-next-line no-unused-vars
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
                novo_ref_ita_medio: itaMedio,
                novo_ref_ita_medio_profissionalizante: itaMedioProf,
                novo_ref_ita_medio_tecnologo: itaMedioTec,
                novo_ref_ita_graduacao: itaGraduacao,
                novo_ref_ita_especializacao: itaEspeciali,
                novo_ref_ita_mestrado: itaMestrado,
                novo_ref_gat: novoRefGat,
                novo_ref_geef_amc: novoRefGeefAmc,
                novo_ref_gr_r_vida: novoRefGrRVida,
                novo_ref_ge_amc: novoRefGeAmc,
                novo_gat_inciso_i: gat_inciso_i,
                novo_gat_inciso_ii_v: gat_inciso_ii_v,
                novo_gat_inciso_iv: gat_inciso_iv,
                novo_gat_inciso_iii_vi_vii: gat_inciso_iii_vi_vii,
                taxa_promocao: taxa_promocao,
                taxa_progressao:taxa_progressao,
                num_classes:num_classes,
                num_referencias:num_referencias,
                emp,
                orgao,
                lotacao,
                ambiente,
                tab,
            });
            setResults(response.data);
            history.push({
                pathname: "/salary-impact/results",
                state: { results: response.data },
            });
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    const items = [
        {
            label: "AMC",
        },
        {
            label: "Impacto Salarial",
            command: () => {
                history.push("/salary-impact");
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
            <h2>Impacto do Aumento Salarial</h2>
            <div className="col-12">
                <div className="card">
                    <h5>Simulação AMC</h5>
                    <h6>Preencha ou deixe em branco os filtros abaixo: </h6>
                    <div className="p-fluid formgrid grid">
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
                    </div>
                </div>
                <div className="card">
                    <h5>Configurações de parâmetros: </h5>
                    <h6>Insira abaixo os valores que serão propostos para a simulação do aumento salarial da categoria: </h6>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="incremento">Taxa de Promoção (%): </label>
                            <InputNumber placeholder="R$ 0,00" id="incremento" value={taxa_promocao} onValueChange={(e) => setTaxa_promocao(e.value)} mode="currency" currency="BRL" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="novoRefIta">Taxa de Progressão (%): </label>
                            <InputNumber placeholder="0" id="novoRefIta" value={taxa_progressao} onValueChange={(e) => setTaxa_progressao(e.value)} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="novoRefGat">Número de Classes: </label>
                            <InputNumber placeholder="0" id="novoRefGat" value={num_classes} onValueChange={(e) => setNum_classes(e.value)} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="novoRefGeefAmc">Número de Referências: </label>
                            <InputNumber placeholder="0" id="novoRefGeefAmc" value={num_referencias} onValueChange={(e) => setNum_referencias(e.value)} />
                        </div>
                    </div>
                </div>
                <div className="card">
                    <h5>Configurações de taxas das gratificações: </h5>
                    <h6>Insira abaixo os valores que serão propostos para a simulação do aumento salarial da categoria: </h6>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="incremento">Incremento</label>
                            <InputNumber placeholder="R$ 0,00" id="incremento" value={incremento} onValueChange={(e) => setIncremento(e.value)} mode="currency" currency="BRL" />
                        </div>
                    </div>
                    <h6>Gratificações ITA</h6>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="novoRefItaMedio">ITA - Médio</label>
                            <InputNumber placeholder="0" id="novoRefItaMedio" value={itaMedio} onValueChange={(e) => setItaMedio(e.value)} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="novoRefItaMedioProf">ITA - Médio Profissionalizante</label>
                            <InputNumber placeholder="0" id="novoRefItaMedioProf" value={itaMedioProf} onValueChange={(e) => setItaMedioProf(e.value)} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="novoRefItaMedioTec">ITA - Médio Técnico</label>
                            <InputNumber placeholder="0" id="novoRefItaMedioProf" value={itaMedioTec} onValueChange={(e) => setItaMedioTec(e.value)} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="novoRefItaGrad">ITA - Graduação</label>
                            <InputNumber placeholder="0" id="novoRefItaGrad" value={itaGraduacao} onValueChange={(e) => setItaGraduacao(e.value)} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="novoRefItaEsp">ITA - Especialização</label>
                            <InputNumber placeholder="0" id="novoRefItaEsp" value={itaEspeciali} onValueChange={(e) => setitaEspeciali(e.value)} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="novoRefItaMes">ITA - Mestrado</label>
                            <InputNumber placeholder="0" id="novoRefItaMes" value={itaMestrado} onValueChange={(e) => setItaMestrado(e.value)} />
                        </div>
                    </div>
                    <h6>Gratificações GEEF AMC</h6>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="novoRefItaMedio">Geef Amc - Inciso I</label>
                            <InputNumber placeholder="0" id="novoRefItaMedio" value={gat_inciso_i} onValueChange={(e) => setGat_inciso_i(e.value)} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="novoRefItaMedioProf">Geef Amc - Inciso II e V</label>
                            <InputNumber placeholder="0" id="novoRefItaMedioProf" value={gat_inciso_ii_v} onValueChange={(e) => setGat_inciso_ii_v(e.value)} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="novoRefItaMedioTec">Geef Amc - Inciso IV</label>
                            <InputNumber placeholder="0" id="novoRefItaMedioProf" value={gat_inciso_iv} onValueChange={(e) => setGat_inciso_iv(e.value)} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="novoRefItaGrad">Geef Amc - Inciso III, VI e VII</label>
                            <InputNumber placeholder="0" id="novoRefItaGrad" value={gat_inciso_iii_vi_vii} onValueChange={(e) => setGat_inciso_iii_vi_vii(e.value)} />
                        </div>
                    </div>
                    <h6>Demais Gratificações</h6>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="novoRefGat">Novo Ref GAT</label>
                            <InputNumber placeholder="0" id="novoRefGat" value={novoRefGat} onValueChange={(e) => setNovoRefGat(e.value)} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="novoRefGrRVida">Novo Ref GR R Vida</label>
                            <InputNumber placeholder="0" id="novoRefGrRVida" value={novoRefGrRVida} onValueChange={(e) => setNovoRefGrRVida(e.value)} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="novoRefGeAmc">Novo Ref GE AMC</label>
                            <InputNumber placeholder="0" id="novoRefGeAmc" value={novoRefGeAmc} onValueChange={(e) => setNovoRefGeAmc(e.value)} />
                        </div>
                    </div>
                    <Button label="Calcular o Impacto" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
};

export default SalaryImpact;
