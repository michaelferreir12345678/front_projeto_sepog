import React, { useState, useEffect } from "react";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { SelectButton } from "primereact/selectbutton";
import axios from "axios";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const GroupSearch = () => {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null); 
    const [viewMode, setViewMode] = useState("users"); 
    const [nodes, setNodes] = useState([]);

    const viewOptions = [
        { label: "Usuários", value: "users" },
        { label: "Funções", value: "functions" },
    ];

    const fetchGroups = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/search/groups");
            setGroups(response.data);
        } catch (error) {
            console.error("Erro ao buscar grupos: ", error);
        }
    };

    const fetchUsersByGroup = async (groupId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/search/users/group/${groupId}`);
            convertToTreeTableData(response.data, "users");
        } catch (error) {
            console.error("Erro ao buscar usuários do grupo: ", error);
        }
    };

    const fetchFunctionsByGroup = async (groupId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/search/functions/group/${groupId}`);
            convertToTreeTableData(response.data, "functions");
        } catch (error) {
            console.error("Erro ao buscar funções do grupo: ", error);
        }
    };

    const convertToTreeTableData = (data, type) => {
        const groupMap = {};

        if (type === "users") {
            data.forEach((item) => {
                const groupId = item.grupoSegurancaId;
                if (!groupMap[groupId]) {
                    groupMap[groupId] = {
                        key: `grupo_${groupId}`,
                        data: { name: item.grupoSegurancaDescricao },
                        children: [],
                    };
                }
                groupMap[groupId].children.push({
                    key: `usuario_${item.id}`,
                    data: { name: item.nome },
                });
            });
        } else if (type === "functions") {
            data.forEach((item) => {
                const groupId = item.grupoSegurancaId;

                if (!groupMap[groupId]) {
                    groupMap[groupId] = {
                        key: `grupo_${groupId}`,
                        data: { name: `Funções (${0})` }, 
                        children: [],
                    };
                }

                groupMap[groupId].children.push({
                    key: `funcao_${item.funcaoId}`,
                    data: { name: item.funcaoDescricao },
                });

                const functionCount = groupMap[groupId].children.length;
                groupMap[groupId].data.name = `Funções (${functionCount})`; 
            });
        }

        setNodes(Object.values(groupMap));
    };

    const handleGroupChange = (e) => {
        setSelectedGroup(e.value);
        if (e.value) {
            if (viewMode === "users") {
                fetchUsersByGroup(e.value.id);
            } else if (viewMode === "functions") {
                fetchFunctionsByGroup(e.value.id);
            }
        } else {
            setNodes([]);
        }
    };

    const handleViewModeChange = (e) => {
        setViewMode(e.value);
        if (selectedGroup) {
            if (e.value === "users") {
                fetchUsersByGroup(selectedGroup.id);
            } else if (e.value === "functions") {
                fetchFunctionsByGroup(selectedGroup.id);
            }
        }
    };

    const generatePDF = () => {
        const docDefinition = {
            content: [
                { text: "Relatório de Grupos de Segurança", style: "header" },
                { text: "\n\n" },
                {
                    table: {
                        headerRows: 1,
                        widths: ["*", "*"], 
                        body: [
                            [
                                { text: "Grupo de Segurança", bold: true },
                                { text: "Usuários", bold: true },
                            ],
                            ...nodes.map((node) => {
                                return [
                                    node.data.name, 
                                    node.children.map((child) => child.data.name).join("; \n"), 
                                ];
                            }),
                        ],
                    },
                },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: "center",
                },
            },
        };

        // Gera o PDF
        pdfMake.createPdf(docDefinition).download("relatorio_grupos_seguranca.pdf");
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    return (
        <div className="card">
            <h3>Pesquisa de Grupos de Segurança</h3>

            <Dropdown value={selectedGroup} options={groups} onChange={handleGroupChange} placeholder="Selecione um grupo" filter filterPlaceholder="Pesquisar..." optionLabel="descricao" style={{ width: "300px", marginBottom: "20px" }} />

            <SelectButton value={viewMode} onChange={handleViewModeChange} options={viewOptions} />

            <TreeTable value={nodes} tableStyle={{ minWidth: "50rem" }}>
                <Column field="name" header={viewMode === "users" ? "Grupo de Segurança / Usuários" : "Grupo de Segurança / Funções"} expander></Column>
            </TreeTable>

            <button onClick={generatePDF} className="p-button p-component">Gerar Relatório em PDF</button>

        </div>
    );
};

export default GroupSearch;
