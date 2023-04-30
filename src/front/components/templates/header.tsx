import React, { useState } from "react";
import styles from "@/styles/Header.module.css";
import Image from "next/image";

interface HeaderProps {
    selectedTab: string;
    onSelectTab: (tab: string) => void;
    showReportModal: () => void;
}

function Header({ selectedTab, onSelectTab, showReportModal }: HeaderProps) {
    return (
      <div className={styles.main}>
        <div className={styles.box1}>
          <Image
            src="/images/pd-logo.jpeg"
            alt="pd logo"
            width={75}
            height={75}
          />
          <h1>PD Hours</h1>
          <nav>
            <button 
              className={selectedTab === 'squads' ? styles.select : styles.notselect}
              onClick={() => onSelectTab('squads')}
            >
              Squads
            </button>
            <button 
              className={selectedTab === 'users' ? styles.select : styles.notselect}
              onClick={() => onSelectTab('users')}
            >
              Usuários
            </button>
          </nav>
        </div>
        <div className={styles.box2}>
          <button onClick={showReportModal} className={styles.bhoras}>
            Lançar horas
          </button>
        </div>
      </div>
    );
  }

export default Header;
