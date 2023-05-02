import React, { useEffect, useState } from "react";
import { getAllSquads } from "../../requests/squads/getAllSquads";
import ISquad from "@/interfaces/models/ISquad";
import styles from "@/styles/SquadsPage.module.css";
import Button from "../base/button";
import LoadingSpinner from "../base/loadingSpinner";

function SquadsHomePage() {
  const [squads, setSquads] = useState<ISquad[]>([]);

  useEffect(() => {
    getAllSquads()
      .then((value) => {
        console.log(value);
        setSquads(value.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(squads);

  return (
    <>
      <h1>Lista de Squads</h1>

      <div className={styles.list}>
        <div className={styles.listHeader}>
          <p>ID</p> <p>Nome</p>
        </div>
        <div className={styles.overflow}>
          {squads.length !== 0 &&
            squads?.map((squad, i) => (
              <div key={i} className={styles.listItems}>
                <p className={styles.id}>{i}</p>
                <p>{squad.name}</p>
                <Button onClick={() => console.log("click")} small>
                  Visitar squad
                </Button>
              </div>
            ))}
          {squads.length === 0 && (
            <div className={styles.loading}>
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SquadsHomePage;
