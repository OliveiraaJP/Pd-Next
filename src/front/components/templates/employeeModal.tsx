import React, { useState } from "react";
import styles from "@/styles/Modal.module.css";
import ErrorMessage from "../base/errorMessage";
import { postEmployee } from "@/front/requests/employees/postEmployee";

interface EmployeeModalProps {
  closeModalProps: any;
  reloadingPage: any;
}

function EmployeeModal({ closeModalProps, reloadingPage }: EmployeeModalProps) {
  const [name, setName] = useState<string>("");
  const [estimatedHours, setEstimatedHours] = useState<number>(-Infinity);
  const [squadId, setSquadId] = useState<number>(-Infinity);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isFormFilled = name && estimatedHours && squadId;

  async function submitReportForm(e: any) {
    e.preventDefault();

    if (!isFormFilled || loading) return;
    setLoading(true);
    const body = { name, estimatedHours, squadId };
    try {
      await postEmployee({ body });
      setLoading(false);
      closeModalProps();
      reloadingPage();
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
            type="text"
            name="userName"
            id="userName"
            placeholder="Digite o nome do funcionário"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            name="estimatedHours"
            id="estimatedHours"
            placeholder="Digite as horas estimadas de trabalho"
            value={estimatedHours}
            onChange={(e) => setEstimatedHours(Number(e.target.value))}
            required
          />
          <input
            type="number"
            name="squadId"
            id="squadId"
            placeholder="Digite o Id da squad"
            value={squadId}
            onChange={(e) => setSquadId(Number(e.target.value))}
            required
          />
          <button type="submit" disabled={!isFormFilled || loading}>
            {loading ? "Carregando..." : "Criar usuário"}
          </button>
        </form>
      </div>
    </>
  );
}

export default EmployeeModal;
