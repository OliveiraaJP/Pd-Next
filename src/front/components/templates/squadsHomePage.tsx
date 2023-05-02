import React, { useEffect, useState } from "react";
import { getAllSquads } from "../../requests/squads/getAllSquads";
import ISquad from "@/interfaces/models/ISquad";
import styles from "@/styles/SquadsPage.module.css";
import Button from "../base/button";
import LoadingSpinner from "../base/loadingSpinner";
import Modal from "../base/modal";
import SquadModal from "./squadModal";

function SquadsHomePage() {
  const [squads, setSquads] = useState<ISquad[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [reloadPage, setReloadPage] = useState<boolean>(true);

  useEffect(() => {
    getAllSquads()
      .then((value) => {
        setSquads(value.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [reloadPage]);

  console.log(squads);

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} modalName="Criar squad">
          <SquadModal
            closeModalProps={() => setShowModal(false)}
            reloadingPage={() => setReloadPage(!reloadPage)}
          />
        </Modal>
      )}

      <h1>Lista de Squads</h1>
      <div className={styles.list}>
        <div className={styles.listHeader}>
          <p>ID</p> <p>Nome</p>
        </div>
        <div className={styles.overflow}>
          {!loading &&
            squads.length !== 0 &&
            squads?.map((squad, i) => (
              <div key={i} className={styles.listItems}>
                <p className={styles.id}>{i}</p>
                <p>{squad.name}</p>
                <Button onClick={() => console.log("click")} small>
                  Visitar squad
                </Button>
              </div>
            ))}
          {loading && (
            <div className={styles.loading}>
              <LoadingSpinner />
            </div>
          )}
        </div>
        <div className={styles.button}>
          <Button onClick={() => setShowModal(true)}>Criar squad</Button>
        </div>
      </div>
    </>
  );
}

export default SquadsHomePage;
