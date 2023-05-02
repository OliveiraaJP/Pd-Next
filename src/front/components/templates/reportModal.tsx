import React, { useState } from "react";
import styles from "@/styles/Modal.module.css";
import { postReport } from "../../requests/reports/postReport";
import ErrorMessage from "../base/errorMessage";

interface ReportModalProps {
  closeModalProps: any;
}

function ReportModal({ closeModalProps }: ReportModalProps) {
  const [employeeId, setEmployeeId] = useState<number>(-Infinity);
  const [spentHours, setSpentHours] = useState<number>(-Infinity);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isFormFilled = employeeId && spentHours && description;

  async function submitReportForm(e: any) {
    e.preventDefault();

    if (!isFormFilled || loading) return;
    setLoading(true);
    const body = { employeeId, spentHours, description };
    try {
      await postReport({ body });
      setLoading(false);
      closeModalProps();
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  }

  return (
    <>
      <div className={styles.modalChildren}>
        {!errorMessage ? <></> : <ErrorMessage> {errorMessage}</ErrorMessage>}
        <form onSubmit={submitReportForm}>
          <input
            type="number"
            name="userId"
            id="userId"
            placeholder="Digite o ID do funcionário"
            value={employeeId}
            onChange={(e) => setEmployeeId(Number(e.target.value))}
            required
          />
          <input
            type="number"
            name="spentHours"
            id="spentHours"
            placeholder="Digite a quantidade de horas"
            value={spentHours}
            onChange={(e) => setSpentHours(Number(e.target.value))}
            required
          />
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Exemplo de texto de descrição de tarefa executada"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit" disabled={!isFormFilled || loading}>
            {loading ? "Carregando..." : "Criar lançamento"}
          </button>
        </form>
      </div>
    </>
  );
}

export default ReportModal;
