import React, { useState } from "react";
import styles from "@/styles/Modal.module.css";
import ErrorMessage from "../base/errorMessage";
import { postSquad } from "@/front/requests/squads/postSquad";

interface SquadModalProps {
  closeModalProps: any;
  reloadingPage: any;
}

function SquadModal({ closeModalProps, reloadingPage }: SquadModalProps) {
  const [squadName, setSquadName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isFormFilled = squadName;

  async function submitModalForm(e: any) {
    e.preventDefault();

    if (!isFormFilled || loading) return;
    setLoading(true);
    const body = { name: squadName };
    try {
      await postSquad({ body });
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
        <form onSubmit={submitModalForm}>
          <div className={styles.box}>
          <label htmlFor="squadName">Nome da squad</label>
          <input
            type="text"
            name="squadName"
            id="squadName"
            placeholder="Digite o nome da squad"
            value={squadName}
            onChange={(e) => setSquadName(e.target.value)}
            required
          />
          </div>
          <button type="submit" disabled={!isFormFilled || loading}>
            {loading ? "Carregando...": "Criar squad"}
          </button>
        </form>
      </div>
    </>
  );
}

export default SquadModal;
