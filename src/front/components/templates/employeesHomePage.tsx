import React, { useEffect, useState } from "react";
import LoadingSpinner from "../base/loadingSpinner";
import styles from "@/styles/EmployeesPage.module.css";
import Button from "../base/button";
import Modal from "../base/modal";
import IEmployee from "@/interfaces/models/IEmployee";
import { getAllEmployees } from "@/front/requests/employees/getAllEmployees";
import EmployeeModal from "./employeeModal";
import Image from "next/image";

function EmployeesHomePage() {
  const [users, setUsers] = useState<IEmployee[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [reloadPage, setReloadPage] = useState<boolean>(true);

  useEffect(() => {
    getAllEmployees()
      .then((value) => {
        setUsers(value.data);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
      });
  }, [reloadPage]);

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} modalName="Criar usuário">
          <EmployeeModal
            closeModalProps={() => setShowModal(false)}
            reloadingPage={() => setReloadPage(!reloadPage)}
          />
        </Modal>
      )}

      <h1>Lista de Usuários</h1>
      <div className={styles.list}>
        <div className={styles.listHeader}>
          <p>Nome</p> <p>Horas</p> <p>Squad ID</p>
        </div>
        <div className={styles.overflow}>
          {!loading &&
            users.length !== 0 &&
            users?.map((user, i) => (
              <div key={user.id + user.name} className={styles.listItems}>
                <p>{user.name}</p>
                <p>{user.estimatedHours}</p>
                <p>{user.squadId}</p>
              </div>
            ))}
          {!loading && users.length == 0 && (
            <div className={styles.emptyBox}>
              <div className={styles.emptyEmojiBox}>
              <Image
                src="/images/sad-emoji.jpeg"
                alt="sad emoji"
                width={150}
                height={150}
              />
              </div>
              <p>Nenhum usuário cadastrado. Crie um usuário agora vinculando ele a um squad existente!</p>
            </div>
          )}
          {loading && (
            <div className={styles.loading}>
              <LoadingSpinner />
            </div>
          )}
        </div>
        <div className={styles.button}>
          <Button onClick={() => setShowModal(true)}>Criar usuário</Button>
        </div>
      </div>
    </>
  );
}

export default EmployeesHomePage;
