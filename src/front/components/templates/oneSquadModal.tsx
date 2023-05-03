import React, { useState } from "react";
import styles from "@/styles/SquadDetailsModal.module.css";
import Button from "../base/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import br from "date-fns/locale/pt-BR";
import { format } from "date-fns";
import { getSquadDetails } from "@/front/requests/squads/getSquadDetails";

interface OneSquadModalProps {
  squadDetails: any;
  closeModalProps: any;
}

interface DetailsSquadRequest {
  totalSquadHours: number;
  averageSquadHoursPerDay: number;
  members: [
    {
      averageWorkHoursPerDay: number;
      estimatedHours: number;
      id: number;
      name: string;
      reports: [
        {
          createdAt: string;
          description: string;
          employeeId: number;
          id: number;
          spentHours: number;
        }
      ];
      squadId: number;
      totalWorkHours: number;
    }
  ];
}

function OneSquadModal({ squadDetails }: OneSquadModalProps) {
  const newDate = new Date();

  const [startDate, setStartDate] = useState<any>(newDate);
  const [endDate, setEndDate] = useState<any>(newDate);
  const [squadData, setSquadDate] = useState<DetailsSquadRequest>();

  async function filterSquadDetails() {
    const startDateReq = format(startDate, "yyyy-MM-dd");
    const endDateReq = format(endDate, "yyyy-MM-dd");
    const squadId = squadDetails.id;
    const request = await getSquadDetails({
      squadId,
      startDate: startDateReq,
      endDate: endDateReq,
    });
    setSquadDate(request.data);
    console.log(request.data);
  }

  return (
    <>
      <div className={styles.dateFilter}>
        <div className={styles.datePicker}>
          <label htmlFor="firstDate">Início</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            locale={br}
            dateFormat="dd/MM/yyyy"
            maxDate={endDate}
          />
        </div>
        <div className={styles.datePicker}>
          <label htmlFor="finalDate">Fim</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            locale={br}
            dateFormat="dd/MM/yyyy"
            minDate={startDate}
            maxDate={newDate}
          />
        </div>
        <div className={styles.buttonBox}>
          <Button small onClick={() => filterSquadDetails()}>
            Filtrar por data
          </Button>
        </div>
      </div>
      <div className={styles.employeesHours}>
        {squadData && (
          <>
            <div>
              <h3 className={styles.h3}>Horas por membro:</h3>
              <div className={styles.tableHeader}>
                <p>Nome</p>
                <p>Descrição</p>
                <p>Horas</p>
                <p>Criado em</p>
              </div>
              <div className={styles.structureTableContent}>
                {squadData["members"].map((member, i) =>
                  member["reports"].map((report, index) => (
                    <div className={styles.tableContent} key={member.name + report.id + report.createdAt}>
                      <p>{member.name}</p>
                      <p>{report.description}</p>
                      <p>{report.spentHours}</p>
                      <p>{format(new Date(report.createdAt), "dd/MM/yyyy")}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div>
              <h3> Horas totais: </h3>
              <p className={`${styles.hours} ${styles.fadein}`}>
                {squadData.totalSquadHours} Horas{" "}
              </p>
            </div>
            <div>
              <h3>Média de horas por dia:</h3>
              <p className={`${styles.hours} ${styles.fadein}`}>
                {squadData.averageSquadHoursPerDay} Horas/Dia
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default OneSquadModal;
